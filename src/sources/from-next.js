
import { external } from "./external.js";

/**
 * Creates an observable from a function that gets passed the
 * observable's `next()` function.
 *
 * See also {@link external}.
 *
 * @param f Function that will be executed with the
 * observable's `next()` function.
 * @returns New observable.
 */
export function fromNext(f) {
  const { observable, next } = external();
  f(next);
  return observable;
}
