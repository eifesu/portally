import { hasPinSetup, verifyPin } from "./pin";

/**
 * Check if the user has security set up (PIN)
 */
export function hasSecuritySetup(): boolean {
  return hasPinSetup();
}

/**
 * Verify action using PIN.
 * Returns true if PIN is correct, false otherwise.
 */
export async function verifyWithPin(pin: string): Promise<boolean> {
  return verifyPin(pin);
}
