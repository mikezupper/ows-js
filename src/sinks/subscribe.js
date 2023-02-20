import { discard } from "./discard.js";

/**
 * Alias for {@link discard}.
 */
export function subscribe(f) {
  return discard(f);
}
