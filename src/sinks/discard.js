/**
 * Sink for observables that discards all values.
 * Useful to leave at the end of a chain.
 *
 * @param f Function to call for each value before it’s discarded.
 */
export function discard(f) {
  return new WritableStream(
    {
      write(chunk) {
        f(chunk);
      }
    },
    { highWaterMark: 1 }
  );
}
