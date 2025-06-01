import { type WalletConfigType } from '@shared/types/WalletStructure';
import { encryptJson } from '@packages/asylia-wallets/WalletStorageEncryption';

const LOCAL_STORAGE_WALLETS_LIST_KEY = 'ASYLIA_LOCAL_STORAGE_WALLETS_LIST_KEY';

function getRawFromStorage(): EncryptedWalletListItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_WALLETS_LIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    localStorage.removeItem(LOCAL_STORAGE_WALLETS_LIST_KEY);
    return [];
  }
}

export function setRawToStorage(list: EncryptedWalletListItem[]) {
  localStorage.setItem(LOCAL_STORAGE_WALLETS_LIST_KEY, JSON.stringify(list));
}

export function getEncryptedWalletList(): EncryptedWalletListItem[] {
  return getRawFromStorage();
}

export function getFirstEncryptedWallet(): EncryptedWalletListItem | undefined {
  return getRawFromStorage()[0];
}

export function hasAnyWalletsInLocalStorage(): boolean {
  return getRawFromStorage().length > 0;
}

export function addEncryptedWalletToLocalStorageList(wallet: EncryptedWalletListItem): void {
  const list = getRawFromStorage();
  list.push(wallet);
  setRawToStorage(list);
}

export function removeEncryptedWalletFromLocalStorageList(walletId: string): void {
  const list = getRawFromStorage().filter((w) => w.id !== walletId);
  setRawToStorage(list);
}

export function clearEncryptedWalletList(): void {
  localStorage.removeItem(LOCAL_STORAGE_WALLETS_LIST_KEY);
}

export type DecryptedWalletListItemMetaType = {
  id: string;
  name: string;
  version: number;
  isDecrypted: true;
};
export type DecryptedWalletListItem = DecryptedWalletListItemMetaType & {
  config: WalletConfigType;
};

export type EncryptedWalletConfigType = {
  encrypted: string; // Encrypted config
  salt: string; // Salt used for encryption
  iv: string; // IV used for encryption
};

export type EncryptedWalletListItem = {
  id: string;
  version: number;
  name: string;
  isDecrypted: false;
  config: EncryptedWalletConfigType;
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
    const id = crypto.randomUUID();
    const { name, password, config } = params;
    config['id'] = id;

    const newDecryptedWalletListItem: DecryptedWalletListItem = {
      id,
      name,
      version: 1,
      isDecrypted: true,
      config,
    };

    console.log('newDecryptedWalletListItem', newDecryptedWalletListItem);

    const { encrypted, salt, iv } = await encryptJson(config, password);

    const encryptedWalletListItem: EncryptedWalletListItem = {
      id: newDecryptedWalletListItem.id,
      version: 1,
      name,
      isDecrypted: false,
      config: {
        encrypted,
        salt,
        iv,
      },
    };

    console.log('encryptedWalletListItem', encryptedWalletListItem);

    addEncryptedWalletToLocalStorageList(encryptedWalletListItem);

    return newDecryptedWalletListItem;
  } catch (e) {
    console.error('Error creating new wallet:', e);
    throw e; // Re-throw the error to handle it in the calling context<
  }
};
