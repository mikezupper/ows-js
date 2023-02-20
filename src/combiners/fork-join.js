
import { zip } from "./zip.js";
import { last } from "../transforms/last.js";

/**
 * When all observables complete, emit the last emitted value from each.
 *
 * @param os Observables to combine.
 * @returns Observable that emits a tuple of the last item emitted by each observable.
 */
export function forkJoin(...os) {
  return zip(...os.map(o => o.pipeThrough(last())));
}
