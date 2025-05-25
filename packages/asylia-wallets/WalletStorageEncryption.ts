import * as argon2 from 'argon2-browser/dist/argon2-bundled.min.js';
import type { EncryptedWalletConfigType } from '@packages/asylia-wallets/WalletStorage';
import type { WalletConfigType } from '@shared/types/WalletStructure';

// Helper: generuj random salt
function randomBytes(length) {
  return window.crypto.getRandomValues(new Uint8Array(length));
}

const ARGON_OPTIONS = {
  type: argon2.ArgonType.Argon2id,
  hashLen: 32,
  time: 3,
  mem: 102400, // 100MB
  parallelism: 1,
  raw: true,
};

export async function encryptJson(json: WalletConfigType, password: string) {
  const salt = randomBytes(32);

  const argonOptions = {
    pass: password,
    salt: salt,
    ...ARGON_OPTIONS,
  };

  const { hash: key } = await argon2.hash(argonOptions);

  const iv = randomBytes(12);

  const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);

  const encoder = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    cryptoKey,
    encoder.encode(JSON.stringify(json)),
  );
  // 6. Ulož do localStorage (hex/base64 odporúčam base64)
  return {
    encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    salt: btoa(String.fromCharCode(...salt)),
    iv: btoa(String.fromCharCode(...iv)),
  };
}

export async function decryptJson(
  { encrypted, salt, iv }: EncryptedWalletConfigType,
  password: string,
): Promise<WalletConfigType> {
  try {
    const encryptedBytes = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));
    const saltBytes = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));
    const ivBytes = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

    const argonOptions = {
      pass: password,
      salt: saltBytes,
      ...ARGON_OPTIONS,
    };
    const { hash: key } = await argon2.hash(argonOptions);

    const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, [
      'decrypt',
    ]);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivBytes,
      },
      cryptoKey,
      encryptedBytes,
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedBuffer));
  } catch (e) {
    console.error('Decryption failed:', e);
    throw new Error('Decryption failed. Please check your password or the encrypted data.');
  }
}
