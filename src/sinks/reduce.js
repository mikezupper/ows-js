
import { scan } from "../transforms/scan.js";
import { extractLast } from "./extract-last.js";

/**
 * Accumulates value, starting with `v0` and applying `f` to each emitted item.
 * If no items are emitted the promise is rejected.
 *
 * @param o Observable to reduce.
 * @param f Reduce function called with the accumulated value so far and the
 * current item. Should return a new accumulated value.
 * @param v0 Initial accumulator value.
 * @returns Promise that resolves with the accumulated value.
 */
export async function reduce(
  o,
  f,
  v0
){
  return extractLast(o.pipeThrough(scan(f, v0)));
}
