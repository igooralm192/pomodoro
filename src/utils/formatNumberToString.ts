export default function formatNumberToString(num: number): string {
  const numStr = String(num)

  return numStr.padStart(2, '0')
}
