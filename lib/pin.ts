const PIN_KEY = "portally_pin_hash";

/**
 * Fallback hash function for browsers that don't support crypto.subtle
 * Note: This is less secure than SHA-256 but provides basic protection
 */
function simpleSha256Fallback(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Add salt to make it harder to reverse
  const salted = hash.toString(16) + str.length.toString(16);
  return salted.padStart(64, "0");
}

/**
 * Simple hash function for PIN storage.
 * Uses Web Crypto API when available, falls back to simple hash on older browsers.
 */
async function hashPin(pin: string): Promise<string> {
  // Check if Web Crypto API is available
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.subtle &&
    typeof window.crypto.subtle.digest === "function"
  ) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(pin);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (error) {
      // Fallback if crypto.subtle.digest fails
      return simpleSha256Fallback(pin);
    }
  }

  // Fallback for browsers without crypto.subtle
  return simpleSha256Fallback(pin);
}

/**
 * Store a PIN securely in localStorage
 */
export async function savePin(pin: string): Promise<void> {
  const hash = await hashPin(pin);
  localStorage.setItem(PIN_KEY, hash);
}

/**
 * Verify a PIN against the stored hash
 */
export async function verifyPin(pin: string): Promise<boolean> {
  const stored = localStorage.getItem(PIN_KEY);
  if (!stored) return false;

  const hash = await hashPin(pin);
  return hash === stored;
}

/**
 * Check if a PIN has been set up
 */
export function hasPinSetup(): boolean {
  return !!localStorage.getItem(PIN_KEY);
}

/**
 * Clear the stored PIN (e.g., for logout)
 */
export function clearPin(): void {
  localStorage.removeItem(PIN_KEY);
}
