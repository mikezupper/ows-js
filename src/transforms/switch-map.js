
// import { externalPromise } from "../utils.js";
import { map } from "./map.js";
import { switchAll } from "./switch-all.js";

/**
 * Converts each emitted item to an observable, producing values only
 * from the most recent observable in the sequence.
 *
 * @returns Transform that emits items from the most recent observable
 * created by projecting values from the outer observable.
 */
export function switchMap(f) {
  const { readable, writable } = new TransformStream(
    undefined,
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
  return {
    writable,
    readable: readable.pipeThrough(map(f)).pipeThrough(switchAll())
  };
}
