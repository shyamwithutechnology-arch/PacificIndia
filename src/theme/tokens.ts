import { colors } from './color';

// Define types for the functions
type ScaleFn = (size: number) => number;

export const createTokens = (scale: ScaleFn, normalize: ScaleFn) => ({
  colors,
  spacing: {
    xxxs: scale(3),
    xxs: scale(2),
    xs: scale(4),
    xsPlus: scale(6),
    sm: scale(8),
    smPlus: scale(12),
    md: scale(16),
    mdPlus: scale(18),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(40),
    xxxl: scale(80),
  },
  fontSize: {
    xxs: normalize(10),
    xs: normalize(12),
    sm: normalize(14),
    smPlus: normalize(15),
    md: normalize(16),
    mdPlus: normalize(18),
    lg: normalize(20),
  },
  radius: {
    sm: scale(6),
    md: scale(10),
    mdPlus: scale(15),
    lg: scale(20),
    xl: scale(30),
    xxl: scale(40),
  },
});

// export const createTokens = (scale: any, normalize: any) => ({
//   spacing: {
//     xs: scale(4),
//     sm: scale(8),
//     md: scale(16),
//     lg: scale(24),
//     xl: scale(32),
//   },

//   fontSize: {
//     xs: normalize(12),
//     sm: normalize(14),
//     smPlus: normalize(15),
//     md: normalize(16),
//     mdPlus: normalize(18), // ✅ added
//     lg: normalize(20),
//     xl: normalize(24),
//   },

//   radius: {
//     sm: scale(6),
//     md: scale(10),
//     lg: scale(16),
//   },
// });
