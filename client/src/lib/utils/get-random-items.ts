export function getRandomItems<T>(array: T[], count: number): T[] {
  const n = array.length;
  const m = Math.max(0, Math.min(count, n));
  const result = array.slice();
  for (let i = 0; i < m; i++) {
    const j = i + Math.floor(Math.random() * (n - i));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, m);
}
