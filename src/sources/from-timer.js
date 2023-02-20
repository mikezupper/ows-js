
import { external } from "./external.js";

/**
 * Creates an observable that will forever emit `null` every `ms` milliseconds.
 *
 * @param ms Milliseconds between each emit.
 * @returns New observable that emits null values.
 */
export function fromTimer(ms) {
  const { next, observable } = external();
  setInterval(next, ms);
  return observable;
}
