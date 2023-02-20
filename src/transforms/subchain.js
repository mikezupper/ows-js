/**
 * Returns a `Transform` that applies `f` to the observable.
 *
 * @example
 * `subchain()` can be used to create logical groups in a longer chain
 * or to make parts of a chain reusable.
 *
 * ```javascript
 * ows
 *   .fromEvent(button, "click")
 *   .pipeThrough(
 *     ows.subchain(o =>
 *       o
 *         .pipeThrough(ows.map(() => fetch("/stockData")))
 *         .pipeThrough(ows.map(r => r.json()))
 *         .pipeThrough(ows.filter(data => data.tags.contains(importTag)))
 *     )
 *   )
 *   .pipeTo(
 *     ows.discard(data => {
 *       // ...
 *     })
 *   );
 * ```
 *
 * @param f Function that will be applied to the observable.
 * @returns Transform that applies `f` to the observable.
 */
export function subchain(f) {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  return {
    writable,
    readable: f(readable)
  };
}
