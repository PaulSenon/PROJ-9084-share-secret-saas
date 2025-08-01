/**
 * Crypto utilities for AES-GCM 256-bit encryption/decryption
 */

export interface EncryptionResult {
  ciphertext: string;
  key: string;
}

/**
 * Generate a new 256-bit AES-GCM key
 */
export async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // extractable
    ["encrypt", "decrypt"],
  );
}

/**
 * Export a CryptoKey to a base64url string
 */
export async function exportKey(key: CryptoKey): Promise<string> {
  const keyBuffer = await crypto.subtle.exportKey("raw", key);
  return arrayBufferToBase64Url(keyBuffer);
}

/**
 * Import a base64url string back to a CryptoKey
 */
export async function importKey(keyString: string): Promise<CryptoKey> {
  const keyBuffer = base64UrlToArrayBuffer(keyString);
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );
}

/**
 * Encrypt text with AES-GCM
 */
export async function encryptText(
  text: string,
  key: CryptoKey,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Generate a random IV (12 bytes for GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data,
  );

  // Prepend IV to ciphertext for storage
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return arrayBufferToBase64Url(combined.buffer);
}

/**
 * Decrypt text with AES-GCM
 */
export async function decryptText(
  encryptedData: string,
  key: CryptoKey,
): Promise<string> {
  const combined = base64UrlToArrayBuffer(encryptedData);

  // Extract IV (first 12 bytes) and ciphertext
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext,
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Generate key and encrypt text in one step
 */
export async function generateKeyAndEncrypt(
  text: string,
): Promise<EncryptionResult> {
  const key = await generateKey();
  const keyString = await exportKey(key);
  const ciphertext = await encryptText(text, key);

  return {
    ciphertext,
    key: keyString,
  };
}

/**
 * Import key and decrypt text in one step
 */
export async function importKeyAndDecrypt(
  ciphertext: string,
  keyString: string,
): Promise<string> {
  const key = await importKey(keyString);
  return await decryptText(ciphertext, key);
}

// Utility functions for base64url encoding
function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  // Add padding if needed
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
