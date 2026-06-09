import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../theme';
import { AppTheme } from '../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, verticalScale, scale, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    notificationBox: {
      backgroundColor: tokens.colors.white,
      padding: tokens.spacing.sm,
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: '#dcdcdc',
      marginVertical: tokens.spacing.xsPlus,
    },
    notificationText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeSemiBold,
    },
    notificationiDec: {
      fontSize: tokens.fontSize.xxs,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
      marginVertical: verticalScale(2),
    },
    baseLine: {
      height: verticalScale(1.4),
      width: '100%',
      backgroundColor: '#e4e4e4',
      marginVertical: tokens.spacing.xs,
    },
    containerContentStyle: {
      // marginVertical: tokens.spacing.lg,
      paddingVertical: tokens.spacing.smPlus,
    },
  });
};
