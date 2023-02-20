
import { external } from "./external.js";

/**
 * Creates an observable from an `EventTarget`.
 * Each event is turned into an item for the observable.
 *
 * @param el Event target to create an observable from.
 * @param name Name of the event to listen to, such as `'click'`.
 * @returns New observable that emits values from the event target.
 */
export function fromEvent(
  el,
  name,
  options
) {
  const { next, observable } = external();
  el.addEventListener(name, next, options);
  return observable;
}
