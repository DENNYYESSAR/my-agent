/**
 * Counts the number of words in a given string.
 * Words are defined as sequences of non-whitespace characters.
 *
 * @param text The input string.
 * @returns The number of words in the string. Returns 0 for null, undefined, or empty strings.
 */
export function countWords(text: string | null | undefined): number {
  if (text === null || text === undefined || text.trim() === '') {
    return 0;
  }
  // Split by one or more whitespace characters and filter out empty strings
  const words = text.trim().split(/\s+/);
  return words.length;
}
