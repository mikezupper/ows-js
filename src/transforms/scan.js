/**
 * Reduces the original observable with `f`, emitting every intermediate result
 * not including the initial value.
 *
 * @param f Reduce function called with the accumulated value so far and the
 * current item. Should return a new accumulated value.
 * @param v0 Initial value.
 * @returns Transform that emits accumulated values produced by `f`.
 */
export function scan(f, v0) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        v0 = f(v0, chunk);
        controller.enqueue(v0);
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
