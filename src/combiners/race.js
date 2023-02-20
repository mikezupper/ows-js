import { amb } from "./amb.js";

/**
 * Alias for {@link amb}.
 */
export function race(...os) {
  return amb(...os);
}
