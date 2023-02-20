/**
 * Returns a `Transform` that emits the items specified as arguments
 * after te source observable ends.
 *
 * @param vs Values to emit after the source observable ends.
 * @returns Transform that emits the items of `vs` after the
 * source observables ends.
 */
export function endWith(...vs) {
  return new TransformStream(
    {
      flush(controller) {
        for (const v of vs) {
          controller.enqueue(v);
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
