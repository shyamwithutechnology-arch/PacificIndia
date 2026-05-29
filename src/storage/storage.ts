import { createMMKV } from 'react-native-mmkv';

export const reduxMMKV = createMMKV({
  id: 'redux-persist-storage',
});

// 🔥 Async wrapper to make MMKV compatible with redux-persist in New Architecture
export const reduxStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      reduxMMKV.set(key, value);
      resolve();
    });
  },

  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const value = reduxMMKV.getString(key);
      resolve(value ?? null);
    });
  },

  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      reduxMMKV.remove(key);
      resolve();
    });
  },
};

/* ===============================
   App Local Storage (Manual use)
================================== */
export const appMMKV = createMMKV({
  id: 'app-local-storage',
});

export const storageKeys = {
  fcm_token: 'fcm_token',
};

export const localStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      appMMKV.set(key, value);
      resolve();
    });
  },

  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const value = appMMKV.getString(key);
      resolve(value ?? null);
    });
  },

  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      appMMKV.remove(key);
      resolve();
    });
  },

  // Add clearAll method
  clearAll: (): Promise<void> => {
    return new Promise((resolve) => {
      // Get all keys first
      const keys = appMMKV.getAllKeys();
      // Remove each key
      keys.forEach((key) => {
        appMMKV.remove(key);
      });
      resolve();
    });
  },
};

// export const reduxStorage = {
//   setItem: (key: string, value: string) => {
//     reduxMMKV.set(key, value);
//     return Promise.resolve();
//   },

//   getItem: (key: string) => {
//     return Promise.resolve(reduxMMKV.getString(key) ?? null);
//   },

//   removeItem: (key: string) => {
//     reduxMMKV.delete(key);
//     return Promise.resolve();
//   },
// };
