// todo move to random
export function randomBytes(length: number): Uint8Array {
  return window.crypto.getRandomValues(new Uint8Array(length));
}
