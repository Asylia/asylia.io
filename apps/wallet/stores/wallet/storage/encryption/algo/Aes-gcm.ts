import type { JsonValue } from '~/types/Generic';

/**
 Imports a raw symmetric key for AES-GCM encryption.
 @param key - The raw key material as a Uint8Array (256 bits recommended).
 @returns A Promise that resolves to a CryptoKey usable for encryption.
 */
export const getEncryptCryptoKey = async (key: Uint8Array): Promise<CryptoKey> => {
  return await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);
};

/**
 Imports a raw symmetric key for AES-GCM decryption.
 @param key - The raw key material as a Uint8Array (must match the encryption key).
 @returns A Promise that resolves to a CryptoKey usable for decryption.
 */
export const getDecryptCryptoKey = async (key: Uint8Array): Promise<CryptoKey> => {
  return await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);
};

/**
 Encrypts a JSON-serializable object using AES-GCM and returns a base64-encoded ciphertext.
 @param iv - Initialization vector (IV), must be 12 bytes (96 bits) for AES-GCM.
 @param cryptoKey - A CryptoKey object for encryption (from getEncryptCryptoKey).
 @param json - The JSON-serializable object to encrypt.
 @returns A Promise that resolves to a base64-encoded ciphertext string.
 @throws If encryption fails for any reason.
 */
export const encryptJson = async (
  iv: Uint8Array,
  cryptoKey: CryptoKey,
  json: JsonValue,
): Promise<string> => {
  const encoder = new TextEncoder();
  try {
    const plaintext = encoder.encode(JSON.stringify(json));
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      plaintext,
    );
    // Convert ArrayBuffer to base64 string (traditional JS style)
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (e) {
    console.error('Encryption failed:', e);
    throw new Error('Encryption failed');
  }
};

/**
 Decrypts an AES-GCM-encrypted ciphertext and parses it as JSON.
 @param iv - Initialization vector (IV) used during encryption, must be identical.
 @param cryptoKey - A CryptoKey object for decryption (from getDecryptCryptoKey).
 @param encryptedBytes - The ciphertext as a Uint8Array (decoded from base64).
 @returns A Promise that resolves to the decrypted JSON object.
 @throws If decryption or JSON parsing fails.
 */
export const decryptJson = async (
  iv: Uint8Array,
  cryptoKey: CryptoKey,
  encryptedBytes: Uint8Array,
): Promise<JsonValue> => {
  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encryptedBytes,
    );
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedBuffer));
  } catch (e) {
    console.error('Decryption failed:', e);
    throw new Error('Decryption failed');
  }
};
