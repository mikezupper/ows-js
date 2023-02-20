
import { external, EOF } from "../sources/external.js";
import { extractLast } from "../sinks/index.js";

/**
 * Returns a `Transform` that emits the last item in an observable.
 *
 * @typeparam T Type of items emitted by the observable.
 * @returns Transform that emits the last item emitted by the
 * observable.
 */
export function last() {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  const { observable, next } = external();
  (async function () {
    const first = await extractLast(readable);
    next(first);
    next(EOF);
  })();
  return { writable, readable: observable };
}
