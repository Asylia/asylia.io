type PasswordHolderStateType = Map<string, string>;

const _state: PasswordHolderStateType = new Map();

const set = (walletId: string, password: string) => {
  _state.set(walletId, password);
};

const get = (walletId: string): string | undefined => {
  return _state.get(walletId);
};

const has = (walletId: string): boolean => {
  return _state.has(walletId);
};

const remove = (walletId: string) => {
  _state.delete(walletId);
};

const clear = (walletId: string) => {
  _state.clear();
};

const PasswordHolder = {
  set,
  get,
  has,
  remove,
  clear,
};

export default PasswordHolder;
