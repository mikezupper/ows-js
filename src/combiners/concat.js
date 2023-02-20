
/**
 * Creates an output Observable which sequentially emits all values from
 * given Observable and then moves on to the next.
 *
 * @param os Observables to concatenate.
 * @returns Observable that emits items from all observables.
 */
export function concat(...os) {
  const { writable, readable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  (async function () {
    for (const o of os) {
      await o.pipeTo(writable, { preventClose: true });
    }
    writable.getWriter().close();
  })();
  return readable;
}
