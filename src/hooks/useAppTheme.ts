import { useMemo } from 'react';
import { useResponsive } from '../utils/responsiveSize';
import { createTokens } from '../theme/tokens';

// Define a type for your tokens to use across the app
export type AppTokens = ReturnType<typeof createTokens>;

export const useAppTheme = () => {
  const responsive = useResponsive();

  // We memoize the tokens so the object reference stays the same
  // unless the scale or normalize functions change.
  const tokens = useMemo<AppTokens>(() => {
    return createTokens(responsive.scale, responsive.normalize);
  }, [responsive.scale, responsive.normalize]);

  return {
    ...responsive,
    tokens,
  };
};

export type AppTheme = ReturnType<typeof useAppTheme>;

// import { useResponsive } from '../theme/responsiveSize';
// import { createTokens } from '../theme/tokens';

// export const useAppTheme = () => {
//   const responsive = useResponsive();
//   const tokens = createTokens(responsive.scale, responsive.normalize);

//   return {
//     ...responsive,
//     tokens,
//   };
// };
