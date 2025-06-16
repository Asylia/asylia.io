import type { EncryptedWalletConfigType } from '~/stores/wallet/storage/encryption/types';
import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';
import type {
  encryptWalletConfigType,
  decryptWalletConfigType,
} from '~/stores/wallet/storage/encryption/types/EncryptWallet';
import { useArgon2 } from '~/stores/wallet/storage/encryption/algo/Argon2';
import { randomBytes } from './Encryption';
import {
  encryptJson,
  getEncryptCryptoKey,
  getDecryptCryptoKey,
  decryptJson,
} from '~/stores/wallet/storage/encryption/algo/Aes-gcm';

/**
 * Encrypts a wallet configuration object using password-based encryption (Argon2 + AES-GCM).
 *
 * Workflow:
 * 1. Generates a random salt (32 bytes) and IV (12 bytes).
 * 2. Derives a symmetric key from the password and salt using Argon2.
 * 3. Encrypts the wallet configuration object as JSON via AES-GCM.
 * 4. Encodes the salt, IV, and ciphertext as base64 strings for storage.
 *
 * @param walletConfig - The wallet configuration object to encrypt (must not be undefined).
 * @param password - The password from which to derive the encryption key.
 * @returns An encrypted wallet configuration suitable for persistent storage.
 * @throws Error if walletConfig is undefined or if encryption fails at any step.
 */
export const encryptWalletConfig: encryptWalletConfigType = async (walletConfig, password) => {
  if (!walletConfig) {
    throw new Error('encryptWalletConfig: walletConfig is undefined');
  }

  try {
    // 1. Generate cryptographic salt for Argon2 and IV for AES-GCM
    const salt = randomBytes(32); // 256-bit salt for password stretching
    const iv = randomBytes(12); // 96-bit IV for AES-GCM (industry standard)

    // 2. Derive encryption key using Argon2 key derivation
    const argon2 = await useArgon2(password, salt);
    const cryptoKey = await getEncryptCryptoKey(argon2.key);

    // 3. Encrypt walletConfig JSON with AES-GCM
    const encryptedJson = await encryptJson(iv, cryptoKey, walletConfig);

    // 4. Assemble result as base64-encoded fields
    const encryptedWalletConfig: EncryptedWalletConfigType = {
      encrypted: encryptedJson,
      salt: btoa(String.fromCharCode(...salt)),
      iv: btoa(String.fromCharCode(...iv)),
    };

    return encryptedWalletConfig;
  } catch (e) {
    throw new Error('encryptWalletConfig: Error during encryption: ' + e);
  }
};

/**
 * Decrypts an encrypted wallet configuration object using password-based decryption (Argon2 + AES-GCM).
 *
 * Workflow:
 * 1. Decodes the base64-encoded salt, IV, and ciphertext back to Uint8Array.
 * 2. Derives the symmetric key from the provided password and salt via Argon2.
 * 3. Decrypts the AES-GCM ciphertext and parses the resulting JSON.
 *
 * @param encryptedWalletConfig - The encrypted configuration object, as produced by encryptWalletConfig.
 * @param password - The password used to derive the decryption key (must match the encryption password).
 * @returns The decrypted wallet configuration object.
 * @throws Error if decryption fails at any step or password is incorrect.
 */
export const decryptWalletConfig: decryptWalletConfigType = async (encryptedWalletConfig, password) => {
  if (!encryptedWalletConfig) {
    throw new Error('decryptWalletConfig: encryptWalletConfig is undefined');
  }

  try {
    // 1. Decode salt, IV, and ciphertext from base64 to Uint8Array
    const salt = Uint8Array.from(atob(encryptedWalletConfig.salt), (c) => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(encryptedWalletConfig.iv), (c) => c.charCodeAt(0));
    const encryptedBytes = Uint8Array.from(atob(encryptedWalletConfig.encrypted), (c) =>
      c.charCodeAt(0),
    );

    // 2. Derive decryption key using Argon2
    const argon2 = await useArgon2(password, salt);
    const cryptoKey = await getDecryptCryptoKey(argon2.key);

    // 3. Decrypt and parse the JSON configuration
    return (await decryptJson(iv, cryptoKey, encryptedBytes)) as WalletConfigType;
  } catch (e) {
    throw new Error('decryptWalletConfig: Error during decryption: ' + e);
  }
};
