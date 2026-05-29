import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, moderateScale, scale, verticalScale } = theme;
  return StyleSheet.create({
    // serch
    seachTextBox: {
      flex: 1,
      minWidth: 0, // important
      paddingHorizontal: tokens.spacing.sm,
      // paddingRight: tokens.spacing.xs,
      borderWidth: 0.5,
      // paddingVertical: tokens.spacing.xxs,
      borderRadius: tokens.spacing.lg,
      borderColor: tokens.colors.lightGray,
      elevation: 50,
      shadowColor: '#0a0b0b',
      shadowRadius: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#F8F6F6',
    },
    textInput: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
      flex: 1,
      marginRight: tokens.spacing.xs,
      marginLeft: tokens.spacing.sm,
    },
    seachBox: {
      alignSelf: 'center',
      height: moderateScale(28),
      width: moderateScale(28),
      // marginLeft:tokens.spacing.sm
      backgroundColor: tokens.colors.black,
      borderRadius: tokens.radius.xxl,
      alignItems: 'center',
      justifyContent: 'center',
    },

    filterIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    filterIconBox: {
      height: moderateScale(40),
      width: moderateScale(40),
      borderRadius: tokens.radius.xxl,
      alignItems: 'center',
      justifyContent: 'center',
      padding: tokens.spacing.sm,
      backgroundColor: tokens.colors.black,
      marginLeft: tokens.spacing.sm,
      flexShrink: 0, // important
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginHorizontal: tokens.spacing.md,
      marginTop: tokens.spacing.md,
      marginBottom: tokens.spacing.xs,
      // borderWidth: 1,
    },
  });
};
