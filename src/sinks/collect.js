
/**
 * Collects all values from the observable into an array.
 *
 * @param o Observable to collect from.
 * @returns Promise that resolves with an array.
 */
export async function collect(o) {
  let buffer = [];
  const reader = o.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      return buffer;
    }
    buffer.push(value);
  }
}
