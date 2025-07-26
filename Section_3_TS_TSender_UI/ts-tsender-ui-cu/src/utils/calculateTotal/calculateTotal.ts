export function calculateTotal(amounts: string): number {
  // Split by commas or newlines and remove any empty entries
  const amountArr = amounts.split(/[,|\n]+/).filter((amt) => amt.trim() !== "");

  // Convert to numbers and sum
  return amountArr.reduce((sum, str) => {
    const num = parseFloat(str.trim());
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
}
