export function generateRandomNumber(max: number, selectedOptions?: number[]): number {
  const randomNumber: number = Math.floor(Math.random() * max);

  if (selectedOptions && Array.isArray(selectedOptions)) {
    return selectedOptions.includes(randomNumber) ? generateRandomNumber(max, selectedOptions) : randomNumber;
  }

  return randomNumber;
}
