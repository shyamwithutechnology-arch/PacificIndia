import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    doctorName: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      marginTop: tokens.spacing.smPlus,
      fontFamily: Fonts.ManropeMedium,
    },

    inputBoxStyle: {
      borderRadius: tokens.radius.sm,
      marginTop: tokens.spacing.xsPlus,
    },
  });
};
// export const styles = StyleSheet.create({
//   drawerIcon: {
//     height: moderateScale(20),
//     width: moderateScale(20),
//   },
//   categoryBox: {},
// });
