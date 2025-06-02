/**
 * Network‑wide constants shared across the multisig utility.
 */
import * as bitcoin from 'bitcoinjs-lib';

/** Bitcoin main‑network parameters (exported for convenience) */
export const NETWORK = bitcoin.networks.bitcoin;

/**
 * Standard BIP‑48 account path for a P2SH‑P2WSH multisig wallet on main‑net.
 *
 *  m / 48' / coin_type' / account' / script_type'
 *               ^          ^            ^
 *             0 = BTC   0 = first   1 = P2SH‑P2WSH
 */
export const MULTISIG_ACCOUNT_PATH = "m/48'/0'/0'/1'";
