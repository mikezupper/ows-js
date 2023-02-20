
import { fromIterable } from "./from-iterable.js";

/**
 * Creates an observable from a generator that takes no arguments.
 *
 * @typeparam T Type of items to be emitted by the observable.
 * @param f Generator function to create an observable from.
 * @returns New observable that emits values from the generator.
 */
export function fromGenerator(f) {
  return fromIterable(f());
}
