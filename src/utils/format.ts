/**
 * Formats a numeric price into West African FCFA with non-breaking spaces.
 * Example: formatFCFA(5500) => "5 500 FCFA"
 */
export function formatFCFA(amount: number): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted}\u00a0FCFA`;
}
