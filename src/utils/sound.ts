/**
 * Web Audio API synthesizer for grill sizzle and ingredient snap sounds.
 * Generates audio purely client-side without relying on external media files.
 */

let audioCtx: AudioContext | null = null;
let sizzleSource: AudioBufferSourceNode | null = null;
let sizzleGain: GainNode | null = null;
let isSizzling = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playIngredientSnap(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch {
    // Graceful fallback if audio is blocked by user policy
  }
}

export function toggleGrillSizzle(on?: boolean): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    const shouldStart = on !== undefined ? on : !isSizzling;

    if (!shouldStart) {
      if (sizzleSource) {
        try {
          sizzleSource.stop();
          sizzleSource.disconnect();
        } catch {
          // already stopped
        }
        sizzleSource = null;
      }
      isSizzling = false;
      return false;
    }

    // Stop existing if any
    if (sizzleSource) {
      try {
        sizzleSource.stop();
        sizzleSource.disconnect();
      } catch {
        // ignore
      }
    }

    // Generate 3 seconds of looped filtered noise (grill sizzle)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink/Brownish noise filter approximation
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 2.5; // boost
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter for hot griddle sizzle texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    // Gain node for gentle background volume
    sizzleGain = ctx.createGain();
    sizzleGain.gain.setValueAtTime(0.08, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(sizzleGain);
    sizzleGain.connect(ctx.destination);

    whiteNoise.start();
    sizzleSource = whiteNoise;
    isSizzling = true;
    return true;
  } catch {
    return false;
  }
}

export function isGrillSizzlingActive(): boolean {
  return isSizzling;
}
