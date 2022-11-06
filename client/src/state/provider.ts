import { atom } from "recoil";

export const providerState = atom<any>({
  key: 'provider',
  default: undefined,
  dangerouslyAllowMutability: true
});

export const connectedState = atom<boolean>({
  key: 'connected',
  default: false,
});

export const fetchingState = atom<boolean>({
  key: 'fetching',
  default: false,
});

export const addressState = atom<string>({
  key: 'address',
  default: "",
});

export const libraryState = atom<any>({
  key: 'library',
  default: null,
  dangerouslyAllowMutability: true
});

export const chainIdState = atom<number>({
  key: 'chainId',
  default: 1,
});