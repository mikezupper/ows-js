
import { forEach } from "./for-each.js";

/**
 * Alias for {@link forEach}.
 */
export function tap(f) {
  return forEach(f);
}
