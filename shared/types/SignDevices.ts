/*
 * Sign DEVICES
 */

export const SIGN_DEVICES_LIST = Object.freeze({
  TREZOR: 'TREZOR',
  LEDGER: 'LEDGER',
  MOBILE_APP: 'MOBILE_APP',
});

export type SignDevicesListType = keyof typeof SIGN_DEVICES_LIST;
