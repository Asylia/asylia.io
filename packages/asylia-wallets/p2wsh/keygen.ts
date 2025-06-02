/**
 * All logic related to *creating* a new multisig account (seed → account node).
 *
 * 👉  Purely *generative* – no child‑key derivation lives here.
 */
import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';
import * as bip39 from 'bip39';

import { uni8ArrayToHexString } from '@shared/helpers/Unit8Array';
import { MULTISIG_ACCOUNT_PATH } from './constants';
import type { GeneratedMultisigAccount } from './types';

const bip32 = BIP32Factory(ecc);

/**
 * Generates a *brand‑new* mnemonic and returns the derived multisig account.
 */
export async function generateMultisigAccount(): Promise<GeneratedMultisigAccount> {
  const mnemonic = bip39.generateMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bip32.fromSeed(seed);

  const accountNode = root.derivePath(MULTISIG_ACCOUNT_PATH);

  return {
    mnemonic,
    xpub: accountNode.neutered().toBase58(),
    xpriv: accountNode.toBase58(),
    xfp: uni8ArrayToHexString(accountNode.fingerprint),
  };
}
