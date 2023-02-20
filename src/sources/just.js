
import { external, EOF } from "./external.js";

/**
 * Creates an observable that emits a set of values.
 *
 * @param vs Values to emit.
 * @returns New observable that emits the given values before ending.
 */
export function just(...vs) {
  const { next, observable } = external();
  for (const v of vs) {
    next(v);
  }
  next(EOF);
  return observable;
}
