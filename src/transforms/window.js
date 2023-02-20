
import { buffer } from "./buffer.js";
import { map } from "./map.js";
import { fromIterable } from "../sources/index.js";

/**
 * Branches out the source observable as nested observables whenever
 * notifier emits.
 *
 * @param notifier Observable that emits when a branch should be created.
 * @returns Transform that emits an observable with a subset of items from
 * the original observable.
 */
export function window(notifier) {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  return {
    writable,
    readable: readable
      .pipeThrough(buffer (notifier))
      .pipeThrough(map(v => fromIterable(v)))
  };
}
