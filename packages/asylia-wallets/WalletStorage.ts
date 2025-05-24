import { onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { WALLET_CLIENT_TYPES, type WalletConfigType } from '@shared/types/WalletStructure';
import { encryptJson, decryptJson } from '@packages/asylia-wallets/WalletStorageEncryption';

const LOCAL_STORAGE_WALLETS_LIST_KEY = 'ASYLIA_LOCAL_STORAGE_WALLETS_LIST_KEY';

const _localStorageWalletList = useStorage<EncryptedWalletListItem[]>(
  LOCAL_STORAGE_WALLETS_LIST_KEY,
  [],
);

export const localStorageWalletList = computed<EncryptedWalletListItem[]>(
  () => _localStorageWalletList.value,
);

export const hasAnyWalletsInLocalStorage = () => {
  return localStorageWalletList.value.length > 0;
};

const addEncryptedWalletToLocalStorageList = (wallet: EncryptedWalletListItem) => {
  localStorageWalletList.value.push(wallet);
};

export const getEncryptedWalletList = (): EncryptedWalletListItem[] => {
  return localStorageWalletList.value;
};

export const getFirstEncryptedWallet = (): EncryptedWalletListItem | undefined => {
  return localStorageWalletList.value[0];
};

export type DecryptedWalletListItem = {
  id: string;
  name: string;
  version: number;
  config: {
    isDecrypted: true;
    config: WalletConfigType;
  };
};

export type EncryptedWalletListItem = {
  id: string;
  version: number;
  name: string;
  config: {
    isDecrypted: false;
    encrypted: string; // Encrypted config
    salt: string; // Salt used for encryption
    iv: string; // IV used for encryption
  };
};

export type WalletListItem = DecryptedWalletListItem | EncryptedWalletListItem;

type CreateNewWalletType = {
  name: string;
  password: string;
  config: WalletConfigType;
};

export const createNewWallet = async (
  params: CreateNewWalletType,
): Promise<DecryptedWalletListItem> => {
  try {
    const { name, password, config } = params;

    const newDecryptedWalletListItem: DecryptedWalletListItem = {
      id: crypto.randomUUID(),
      name,
      version: 1,
      config: {
        isDecrypted: true,
        config,
      },
    };

    console.log('newDecryptedWalletListItem', newDecryptedWalletListItem);

    const { encrypted, salt, iv } = await encryptJson(config, password);

    const encryptedWalletListItem: EncryptedWalletListItem = {
      id: newDecryptedWalletListItem.id,
      version: 1,
      name,
      config: {
        isDecrypted: false,
        encrypted,
        salt,
        iv,
      },
    };

    console.log('encryptedWalletListItem', encryptedWalletListItem);

    addEncryptedWalletToLocalStorageList(encryptedWalletListItem);

    // console.log(
    //   'decrypted tset',
    //   await decryptJson(
    //     {
    //       encrypted: encryptedWalletListItem.config.encrypted,
    //       salt: encryptedWalletListItem.config.salt,
    //       iv: encryptedWalletListItem.config.iv,
    //     },
    //     password,
    //   ),
    // );

    return newDecryptedWalletListItem;
  } catch (e) {
    console.error('Error creating new wallet:', e);
    throw e; // Re-throw the error to handle it in the calling context<
  }
};
