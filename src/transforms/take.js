/**
 * Returns a `Transform` that emits the first `n` items from the original
 * observable.
 *
 * @param n Maximum number of items to emit.
 * @returns Transform that emits some items from the original observable.
 */
export function take(n) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (n > 0) {
          controller.enqueue(chunk);
        }
        if (--n <= 0) {
          controller.terminate();
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
