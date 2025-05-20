import { computed, ref } from 'vue';
import { WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS } from '@shared/components/wallet/setup/quorum/Types';
import { SCENARIO_ACTIVE_INACTIVE, type ScenarioActiveInactiveType } from './types';

export const SCROLLED_FROM = Object.freeze({
  INTRO: {
    KEY: 'INTRO',
    ID: 'wp-visual',
  },
  POINT_4_4: {
    KEY: 'POINT_4_4',
    ID: 'wp-4',
  },
});

export const autoScrolledToMultisig = ref(false);
export const autoScrolledToMultisigFrom = ref('');

/**
 * Generates all binary combinations of length `n` and splits them
 * into `positive` (valid quorum) and `negative` (invalid quorum) sets,
 * based on whether they satisfy a `m-of-n` threshold.
 *
 * Each combination is represented as an array of 0s and 1s,
 * where 1 means a signature is present and 0 means it's absent.
 *
 * The result is sorted by priority:
 * - For positive quorums: prefer those with more signatures, especially in backups
 * - For negative quorums: highlight those failing in the main keys
 *
 * @param m - Minimum number of 1s (signatures) required for a valid quorum
 * @param n - Total number of signers (main + backup)
 * @returns Object containing sorted `positive` and `negative` combinations
 */
function generateQuorumCombinations(
  m: number,
  n: number,
): {
  positive: number[][];
  negative: number[][];
} {
  const totalCombinations = 2 ** n;
  const positive: number[][] = [];
  const negative: number[][] = [];

  for (let i = 0; i < totalCombinations; i++) {
    const combo: number[] = i.toString(2).padStart(n, '0').split('').map(Number);

    const onesCount = combo.reduce((sum, bit) => sum + bit, 0);

    if (onesCount >= m) {
      positive.push(combo);
    } else {
      negative.push(combo);
    }
  }

  const countMainOnes = (combo: number[]): number => combo.slice(0, m).reduce((s, x) => s + x, 0);

  const countBackupOnes = (combo: number[]): number => combo.slice(m).reduce((s, x) => s + x, 0);

  // Sort positive quorums: prefer more total signatures, then more in backup
  const sortPositive = (a: number[], b: number[]): number => {
    const sumA = a.reduce((s, x) => s + x, 0);
    const sumB = b.reduce((s, x) => s + x, 0);

    const backupA = countBackupOnes(a);
    const backupB = countBackupOnes(b);

    if (sumB !== sumA) return sumB - sumA;
    return backupB - backupA;
  };

  // Sort negative quorums: prefer fewer total, especially if main is missing
  const sortNegative = (a: number[], b: number[]): number => {
    const sumA = a.reduce((s, x) => s + x, 0);
    const sumB = b.reduce((s, x) => s + x, 0);

    const mainA = countMainOnes(a);
    const mainB = countMainOnes(b);

    if (sumB !== sumA) return sumB - sumA;
    return mainB - mainA;
  };

  positive.sort(sortPositive);
  negative.sort(sortNegative);

  return { positive, negative };
}

export const generateTableRows = (
  m: number,
  n: number,
  activeInactive: ScenarioActiveInactiveType,
) => {
  const data = [];

  const { positive, negative } = generateQuorumCombinations(m, n);

  const length =
    activeInactive === SCENARIO_ACTIVE_INACTIVE.ACTIVE ? positive.length : negative.length;

  for (let i = 0; i < length; i++) {
    data.push({
      quorum: {
        m,
        n,
      },
      keys: activeInactive === SCENARIO_ACTIVE_INACTIVE.ACTIVE ? positive[i] : negative[i],
    });
  }

  return data;
};

type walletRowHelpers = {
  keyVariant: string;
  activeInactive: ScenarioActiveInactiveType;
};

export const walletRowHelpers = ({ keyVariant, activeInactive }: walletRowHelpers) => {
  const is2of3 = computed(() => keyVariant === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['2of3']);
  const is3of5 = computed(() => keyVariant === WALLET_QUORUM_PRE_SET_SCHEMA_OPTIONS['3of5']);
  const isActive = computed(() => activeInactive === SCENARIO_ACTIVE_INACTIVE.ACTIVE);

  return {
    is2of3,
    is3of5,
    isActive,
  };
};
