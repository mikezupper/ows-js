
import { external, EOF } from "./external.js";

/**
 * Creates an observable that emits numbers from `start` to `end`.
 *
 * @param start Number to start emitting from, such as `0`.
 * @param end Number to stop emitting at, inclusive.
 * @returns New observable that emits numbers.
 */
export function range(start, end) {
  const { observable, next } = external();
  const len = Math.abs(end - start);
  const dir = Math.sign(end - start);
  for (let i = 0; i <= len; i++) {
    next(start + i * dir);
  }
  next(EOF);
  return observable;
}
