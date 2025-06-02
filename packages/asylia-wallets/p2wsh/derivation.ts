/**
 * All logic related to *deriving* child public keys and mapping them into PSBT structures.
 *
 * 👉  Purely *transformative* – no key *generation* or wallet building here.
 */
import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';

import { uint8ArrayToBuffer, uni8ArrayToHexString } from '@shared/helpers/Unit8Array';
import { sortArrayByKeyLexicographically } from '@shared/helpers/Sort';
import { NETWORK, MULTISIG_ACCOUNT_PATH } from './constants';
import type {
  AddressPath,
  SortedDerivedPublicKeys,
  DerivedPublicKey,
  BIP32Derivation,
} from './types';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';

const bip32Deriver = BIP32Factory(ecc);

/**
 * Derives a *single* child public key from an account‑level xpub.
 */
export function deriveChildPublicKey(
  accountXpub: string,
  path: AddressPath,
): { publicKeyUnit8Array: Uint8Array; publicKeyHex: string } {
  if (typeof accountXpub !== "string") {
    throw new TypeError('xpub must be a base58 string');
  }

  const accountNode = bip32Deriver.fromBase58(accountXpub, NETWORK);
  const childNode = accountNode.derivePath(`${path[0]}/${path[1]}`);

  return {
    publicKeyUnit8Array: childNode.publicKey,
    publicKeyHex: uni8ArrayToHexString(childNode.publicKey),
  };
}

/**
 * Derives child pub‑keys for *every* cosigner, then returns them deterministically sorted.
 */
export function deriveSortedChildPubKeys(
  cosignerXpubs: WalletExtendedPublicKey[],
  path: AddressPath,
): SortedDerivedPublicKeys {
  const derived: DerivedPublicKey[] = cosignerXpubs.map((cosigner) => {
    const child = deriveChildPublicKey(cosigner.xpub, path);
    return {
      ...cosigner,
      derivedPubKeyHex: child.publicKeyHex,
      derivedPubKeyBuffer: uint8ArrayToBuffer(child.publicKeyUnit8Array),
      derivedPubKeyUnit8Array: child.publicKeyUnit8Array,
    };
  });

  const sorted = sortArrayByKeyLexicographically(derived, 'derivedPubKeyHex');

  return {
    keys: sorted,
    buffers: sorted.map((k) => k.derivedPubKeyBuffer),
    hexes: sorted.map((k) => k.derivedPubKeyHex),
  };
}

/**
 * Converts a list of sorted derived keys into the PSBT‑compatible `BIP32Derivation` format.
 */
export function toBip32Derivation(
  derived: SortedDerivedPublicKeys,
  path: AddressPath,
): BIP32Derivation[] {
  return derived.keys.map((k) => ({
    masterFingerprint: Buffer.from(k.xfp, 'hex'),
    path: `${MULTISIG_ACCOUNT_PATH}/${path[0]}/${path[1]}`,
    pubkey: Buffer.from(k.derivedPubKeyHex, 'hex'),
  }));
}
