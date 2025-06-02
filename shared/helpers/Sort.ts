export function sortArrayByKeyLexicographically<T extends Record<string, any>>(
  data: T[],
  key: keyof T,
): T[] {
  return data.slice().sort((a, b) => String(a[key]).localeCompare(String(b[key])));
}
