/**
 * High‑level wallet builder that produces the full P2SH‑P2WSH output (script, address & metadata).
 */
import * as bitcoin from 'bitcoinjs-lib';
import { NETWORK } from './constants';
import { deriveSortedChildPubKeys, toBip32Derivation } from './derivation';
import type { WalletExtendedPublicKey } from '@shared/types/SignKeys';
import type { AddressPath, MultisigWalletDescriptor } from './types';

/**
 * Generates a *m‑of‑n* P2SH‑P2WSH multisig address and its associated scripts.
 *
 * @param m             Number of required signatures (e.g. `2` for a 2‑of‑3 wallet)
 * @param cosignerXpubs Array of cosigner account‑level xpub structures
 * @param path          Tuple identifying *receive* / *change* chain and index
 */
export function createP2shP2wshWallet(
  m: number,
  cosignerXpubs: WalletExtendedPublicKey[],
  path: AddressPath,
): MultisigWalletDescriptor {
  const derived = deriveSortedChildPubKeys(cosignerXpubs, path);

  const p2ms = bitcoin.payments.p2ms({
    m,
    pubkeys: derived.buffers.map((b) => Buffer.from(b)),
    network: NETWORK,
  });

  const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: NETWORK });
  const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network: NETWORK });

  return {
    p2ms,
    p2wsh,
    p2sh,
    address: p2sh.address,
    bip32Derivation: toBip32Derivation(derived, path),
    derivedPublicKeys: derived,
  };
}
