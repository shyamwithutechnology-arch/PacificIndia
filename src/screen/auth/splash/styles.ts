import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';

const { width, height } = Dimensions.get('window');
export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.black,
    },
    splashBgStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    splashLogo: {
      height: verticalScale(200),
      width: scale(200),
    },
  });
};
