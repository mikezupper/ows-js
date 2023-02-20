
import { fromPromise } from "./from-promise.js";

/**
 * Creates an observable from an asynchronous function. The observable
 * emits exactly one value when once the function returns.
 *
 * @param f Async function that will be awaited.
 * @returns New observable that emits the value the async function returns.
 */
export function fromAsyncFunction(f) {
  return fromPromise(f());
}
