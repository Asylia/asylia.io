export const uni8ArrayToHexString = (byteArray: Uint8Array): string =>
  Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');

export const hexStringToUint8Array = (hexString: string): Uint8Array => {
  if (hexString.length % 2 !== 0) throw new Error('Invalid hex string');
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  return bytes;
};

export const uint8ArrayToBuffer = (array: Uint8Array): Buffer => {
  return Buffer.from(array);
};
