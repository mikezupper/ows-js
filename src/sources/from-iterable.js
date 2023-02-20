
import { external, EOF } from "./external.js";

/**
 * Creates an observable from a synchronous iterable.
 *
 * @param it Iterable to create an observable from.
 * @returns New observable that emits values from the iterable.
 */
export function fromIterable(it) {
  const { next, observable } = external();
  for (const v of it) {
    next(v);
  }
  next(EOF);
  return observable;
}
