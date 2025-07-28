export function formatTokenAmount(weiAmount: number, decimals: number): string {
  // Convert to token units by dividing by 10^decimals
  const tokenAmount = weiAmount / Math.pow(10, decimals);

  const formattedAmount = tokenAmount.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return formattedAmount;
}
