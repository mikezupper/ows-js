
import { external, EOF } from "../sources/external.js";
import { extractFirst, discard } from "../sinks/index.js";

/**
 * Returns a `Transform` that emits the first item in an observable.
 * The source observable will be drained after.
 *
 * @returns Transform that emits the first item emitted by the
 * observable.
 */
export function first() {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  const { observable, next } = external();
  (async function () {
    const first = await extractFirst(readable);
    next(first);
    next(EOF);
    readable.pipeTo(discard());
  })();
  return { writable, readable: observable };
}
