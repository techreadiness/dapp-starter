"use client";

import { create } from 'zustand';

type walletAccountState = {
  account: string | null;
  setAccount: (account: string| null) => void;
};

export const useWalletAccountStore = create<walletAccountState>((set) => ({
  account: sessionStorage.getItem('ACCOUNT'),
  setAccount: (account) => set({ account }),
}));