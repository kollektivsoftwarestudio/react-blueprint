import { STORAGE_PREFIX } from "@/config";

const storageKey = `${STORAGE_PREFIX}token`;

export const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(storageKey) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(storageKey, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(storageKey);
  },
};
