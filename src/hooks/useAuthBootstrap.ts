// // useAuthBootstrap.ts
// import { useEffect, useState } from 'react';
// import { storage } from '../storage/storage';
// import { AuthData } from '../redux/slices/authSlice';
// import { STORAGE_KEYS } from '../storage/keys';

// export type AppState = 'loading' | 'auth' | 'app';

// export const useAuthBootstrap = () => {
//   const [state, setState] = useState<AppState>('loading');

//   useEffect(() => {
//     const init = async () => {
//       try {
//         await new Promise((res) => setTimeout(res, 800));

//         const auth = storage.get<AuthData>(STORAGE_KEYS.AUTH);

//         if (auth?.isLogin && auth?.token) {
//           setState('app');
//         } else {
//           setState('auth');
//         }
//       } catch {
//         setState('auth');
//       }
//     };

//     init();
//   }, []);

//   return state;
// };
// useAuthBootstrap.ts
import { useEffect, useState } from 'react';
import { storage } from '../storage/storage';
import { AuthData } from '../redux/slices/authSlice';
import { STORAGE_KEYS } from '../storage/keys';

export type AppState = 'loading' | 'auth' | 'app';

export const useAuthBootstrap = () => {
  const [state, setState] = useState<AppState>('loading');

  useEffect(() => {
    const init = async () => {
      try {
        await new Promise((res) => setTimeout(res, 800));

        const auth = storage.get<AuthData>(STORAGE_KEYS.AUTH);

        if (auth?.isLogin && auth?.token) {
          setState('app');
        } else {
          setState('auth');
        }
      } catch {
        setState('auth');
      }
    };

    init();
  }, []);

  return state;
};
