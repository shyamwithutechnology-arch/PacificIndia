import { useCallback, useMemo } from 'react';
import { useWindowDimensions, PixelRatio } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const guidelineBaseWidth = 375;
  const guidelineBaseHeight = 812;

  // const shortDimension = Math.min(width, height);
  // const longDimension = Math.max(width, height);
  const shortDimension = useMemo(
    () => Math.min(width, height),
    [width, height]
  );

  const isLandscape = width > height;

  const longDimension = useMemo(() => Math.max(width, height), [width, height]);

  // const isTablet = shortDimension >= 768;
  const isTablet = longDimension >= 1024;

  const maxScale = isTablet ? 1.4 : 1.25;

  // We use useCallback so these function references stay stable
  const scale = useCallback(
    (size: number) =>
      Math.min((shortDimension / guidelineBaseWidth) * size, size * maxScale),
    [shortDimension, maxScale]
  );

  const verticalScale = useCallback(
    (size: number) =>
      Math.min((longDimension / guidelineBaseHeight) * size, size * maxScale),
    [longDimension, maxScale]
  );

  const moderateScale = useCallback(
    (size: number, factor = 0.5) => size + (scale(size) - size) * factor,
    [scale]
  );

  const normalize = useCallback(
    (size: number) => {
      const scaleFactor = 0.5;
      const scaled = size + (scale(size) - size) * scaleFactor;
      return Math.round(PixelRatio.roundToNearestPixel(scaled));
    },
    [scale]
  );

  return {
    scale,
    verticalScale,
    moderateScale,
    normalize,
    insets,
    isTablet,
    isLandscape,
  };
};

// import { Dimensions, PixelRatio } from 'react-native';
// const { width, height } = Dimensions.get('window');

// const BASE_WIDTH = 375;
// const BASE_HEIGHT = 812;

// const widthScale = width / BASE_WIDTH;
// const heightScale = height / BASE_HEIGHT;

// export const scale = (size: number) =>
//   PixelRatio.roundToNearestPixel(size * widthScale);

// export const verticalScale = (size: number) =>
//   PixelRatio.roundToNearestPixel(size * heightScale);

// export const moderateScale = (size: number, factor = 0.5) =>
//   size + (scale(size) - size) * factor;

// export const fontScale = (size: number) => moderateScale(size, 0.3);

// export const isTablet = width >= 768;

// export const spacing = {
//   xs: scale(4),
//   sm: scale(8),
//   md: scale(16),
//   lg: scale(24),
//   xl: scale(32),
// } as const;

// export const radius = {
//   sm: moderateScale(6),
//   md: moderateScale(10),
//   lg: moderateScale(16),
//   xl: moderateScale(24),
// } as const;

// export const typography = {
//   heading1: {
//     fontSize: fontScale(28),
//     lineHeight: fontScale(36),
//   },

//   heading2: {
//     fontSize: fontScale(22),
//     lineHeight: fontScale(30),
//   },

//   bodyMedium: {
//     fontSize: fontScale(14),
//     lineHeight: fontScale(20),
//   },

//   bodySmall: {
//     fontSize: fontScale(12),
//     lineHeight: fontScale(16),
//   },
// } as const;
