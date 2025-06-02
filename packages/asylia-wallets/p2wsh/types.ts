/**
 * Global type definitions shared between helpers.
 */
import * as bitcoin from 'bitcoinjs-lib';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';

/** Derivation tuple for a *receive* address (internal = 0) */
export type ReceivePath = [0, number];
/** Derivation tuple for a *change* address (internal = 1) */
export type ChangePath = [1, number];
/** Union of allowed address derivation paths */
export type AddressPath = ReceivePath | ChangePath;

/**
 * A cosigner's derived child public key together with metadata.
 * (ℹ️  Extends the structure returned by your existing `WalletExtendedPublicKey`.)
 */
export type DerivedPublicKey = WalletExtendedPublicKey & {
  /** Hex‑encoded compressed child pub‑key */
  derivedPubKeyHex: string;
  /** Buffer‑encoded compressed child pub‑key */
  derivedPubKeyBuffer: Buffer;
  /** Uint8Array‑encoded compressed child pub‑key */
  derivedPubKeyUnit8Array: Uint8Array;
};

/** Aggregated and deterministically *sorted* derived public keys */
export interface SortedDerivedPublicKeys {
  /** Sorted list of cosigner keys */
  keys: DerivedPublicKey[];
  /** Convenience buffer list – in the same order as `keys` */
  buffers: Buffer[];
  /** Convenience hex list – in the same order as `keys` */
  hexes: string[];
}

/** A single PSBT `BIP32Derivation` entry */
export interface BIP32Derivation {
  masterFingerprint: Buffer;
  path: string;
  pubkey: Buffer;
}

/** Complete description of a freshly built multisig output */
export interface MultisigWalletDescriptor {
  /** `OP_CHECKMULTISIG` redeem script */
  p2ms: bitcoin.payments.Payment;
  /** Wrapped seg‑wit script */
  p2wsh: bitcoin.payments.Payment;
  /** Legacy P2SH wrapper */
  p2sh: bitcoin.payments.Payment;
  /** Top‑level deposit address (base58) */
  address: string | undefined;
  /** Array ready to be attached to PSBT inputs */
  bip32Derivation: BIP32Derivation[];
  /** Deterministically sorted child keys */
  derivedPublicKeys: SortedDerivedPublicKeys;
}

/** Fields returned when generating a brand‑new multisig account */
export interface GeneratedMultisigAccount {
  /** Fresh 24‑word mnemonic */
  mnemonic: string;
  /** Account‑level extended public key */
  xpub: string;
  /** Account‑level extended private key */
  xpriv: string;
  /** 4‑byte master fingerprint */
  xfp: string;
}
