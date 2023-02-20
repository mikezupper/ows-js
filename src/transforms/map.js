/**
 * Returns a `Transform` with the results of applying the given function
 * to each emitted item of the original observable.
 *
 * @param f Function called with each emitted item. If it returns a promise,
 * the result is awaited then emitted.
 * @returns Transform that emits items produced by `f`.
 */
export function map(f) {
  return new TransformStream(
    {
      async transform(chunk, controller) {
        controller.enqueue(await f(chunk));
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
