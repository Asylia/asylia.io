import * as argon2 from 'argon2-browser/dist/argon2-bundled.min.js';

/**
 * Base Argon2 options for password-based key derivation.
 *
 * - type: Argon2id (recommended for general use; hybrid of Argon2i and Argon2d)
 * - hashLen: 32 bytes (256 bits; standard for symmetric keys)
 * - time: 3 iterations (number of computation passes; increases CPU cost)
 * - mem: 102 400 KB (100 MB; increases memory hardness, thwarts GPU/ASIC attacks)
 * - parallelism: 1 (single-threaded; adjust for multi-core scenarios if desired)
 * - raw: true (output is raw Uint8Array instead of hex string)
 */
const BASE_ARGON_OPTIONS: argon2.ArgonHashOptions = {
  type: argon2.ArgonType.Argon2id,
  hashLen: 32,
  time: 4,
  mem: 102_400, // 100MB
  parallelism: 1,
  raw: true,
};

/**
 * Derives a cryptographically secure symmetric key from a password and salt using Argon2id KDF.
 *
 * Argon2id is considered the most secure variant for most applications, offering strong resistance
 * to both GPU and side-channel attacks. The parameters here are intentionally memory- and CPU-hard
 * to slow down brute-force attempts and increase attacker cost.
 *
 * @param password - The user-supplied password (any UTF-8 string).
 * @param salt - A unique cryptographically secure random salt (Uint8Array; at least 16 bytes recommended, 32 preferred).
 * @returns A promise resolving to an object with a derived key (Uint8Array of 32 bytes).
 *
 * @throws Error if Argon2 hashing fails or invalid parameters are supplied.
 *
 * @example
 *   const { key } = await useArgon2('my-password', randomSalt);
 *   // key is Uint8Array, usable as a symmetric key for AES-GCM, etc.
 */
export const useArgon2 = async (
  password: string,
  salt: Uint8Array,
): Promise<{ key: Uint8Array }> => {
  // Assemble options: merge password and salt with secure defaults
  const argonOptions: argon2.ArgonHashOptions = {
    pass: password,
    salt: salt,
    ...BASE_ARGON_OPTIONS,
  };

  // Run Argon2 hashing (returns a raw 32-byte key as Uint8Array)
  const { hash: key } = await argon2.hash(argonOptions);
  return { key };
};
