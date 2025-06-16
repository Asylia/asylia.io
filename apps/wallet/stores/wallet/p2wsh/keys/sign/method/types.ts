import { SIGN_METHODS_LIST, EMPTY_SIGN_METHOD } from './Sign';

export type SignMethodsListType = keyof typeof SIGN_METHODS_LIST;
export type EmptySignMethodType = typeof EMPTY_SIGN_METHOD;
