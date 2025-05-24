import * as argon2 from 'argon2-browser/dist/argon2-bundled.min.js';

// Helper: generuj random salt
function randomBytes(length) {
  return window.crypto.getRandomValues(new Uint8Array(length));
}

// Šifrovanie JSON
export async function encryptJson(json, password) {
  console.log('encryptJson', json, password);
  // 1. Generuj salt
  const salt = randomBytes(32);

  // 2. Derivuj kľúč cez Argon2id
  const argonOptions = {
    pass: password,
    salt: salt,
    type: argon2.ArgonType.Argon2id,
    hashLen: 32,
    time: 3, // rounds
    mem: 102400, // 100MB
    parallelism: 1,
    raw: true, // chceme výsledok ako Uint8Array, nie hex
  };
  const { hash: key } = await argon2.hash(argonOptions);

  // 3. Generuj IV pre AES-GCM
  const iv = randomBytes(12);

  // 4. Importuj kľúč pre AES-GCM
  const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);

  // 5. Zašifruj JSON
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

// Dešifrovanie JSON
export async function decryptJson({ encrypted, salt, iv }, password) {
  // 1. Dekóduj base64 späť na Uint8Array
  const encryptedBytes = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));
  const saltBytes = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));
  const ivBytes = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));

  // 2. Znovu derivuj kľúč
  const argonOptions = {
    pass: password,
    salt: saltBytes,
    type: argon2.ArgonType.Argon2id,
    hashLen: 32,
    time: 3, // rounds
    mem: 102400, // 100MB
    parallelism: 1,
    raw: true,
  };
  const { hash: key } = await argon2.hash(argonOptions);

  // 3. Importuj kľúč pre AES-GCM
  const cryptoKey = await window.crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);

  // 4. Decrypt
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivBytes,
    },
    cryptoKey,
    encryptedBytes,
  );

  // 5. Parse JSON
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedBuffer));
}
