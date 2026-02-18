const CRED_KEY = "portally_webauthn_cred";

function bufToBase64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base64ToBuf(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export function isWebAuthnAvailable(): boolean {
  return typeof window !== "undefined" && !!window.PublicKeyCredential;
}

async function register(): Promise<string> {
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const userId = crypto.getRandomValues(new Uint8Array(16));

  const credential = (await navigator.credentials.create({
    publicKey: {
      challenge,
      rp: { name: "Portally", id: window.location.hostname },
      user: { id: userId, name: "portally-user", displayName: "Portally" },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },   // ES256
        { type: "public-key", alg: -257 },  // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "required",
      },
      timeout: 60000,
    },
  })) as PublicKeyCredential;

  const credId = bufToBase64(credential.rawId);
  localStorage.setItem(CRED_KEY, credId);
  return credId;
}

/**
 * Prompts the device's platform authenticator (Face ID, Touch ID, fingerprint,
 * Windows Hello) to confirm a user action. Registers a passkey on first use.
 *
 * Returns true on success, false if the user cancels or an error occurs.
 * Returns true unconditionally if WebAuthn is unavailable (graceful fallback).
 */
export async function confirmWithBiometrics(): Promise<boolean> {
  if (!isWebAuthnAvailable()) return true;

  try {
    const stored = localStorage.getItem(CRED_KEY);
    const credId = stored ?? (await register());

    const challenge = crypto.getRandomValues(new Uint8Array(32));
    await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname,
        allowCredentials: [{ type: "public-key", id: base64ToBuf(credId) }],
        userVerification: "required",
        timeout: 60000,
      },
    });

    return true;
  } catch {
    return false;
  }
}
