import type { WalletConfigType } from '~/stores/wallet/p2wsh/config/types';

/**
 * Type definition for a resulting encrypted wallet configuration object.
 */
export type EncryptedWalletConfigType = {
  encrypted: string; // Encrypted config
  salt: string; // Salt used for encryption
  iv: string; // IV used for encryption
};

/**
 * Type definition for a function that encrypts a wallet configuration object using a password.
 * @param walletConfig - Plain wallet configuration to encrypt.
 * @param password - User-provided password to derive the encryption key.
 * @returns A promise resolving to an encrypted wallet configuration object.
 */
export type encryptWalletConfigType = (
  walletConfig: WalletConfigType,
  password: string,
) => Promise<EncryptedWalletConfigType>;

/**
 * Type definition for a function that decrypts an encrypted wallet configuration object using a password.
 * @param encryptedWalletConfig - The encrypted wallet configuration as returned by encryptWalletConfig.
 * @param password - The password to derive the decryption key.
 * @returns A promise resolving to the original wallet configuration object.
 */
export type decryptWalletConfigType = (
  encryptedWalletConfig: EncryptedWalletConfigType,
  password: string,
) => Promise<WalletConfigType>;
