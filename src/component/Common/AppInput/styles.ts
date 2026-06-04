import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts, fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, scale, moderateScale, verticalScale } = theme;
  return StyleSheet.create({
    inputBox: {
      // paddingVertical: tokens.spacing.xxs,
      // width: '100%',
      // borderWidth: 0.5,
      // borderColor: tokens.colors.primary,
      // alignSelf: 'center',
      // borderRadius: tokens.spacing.smPlus,
      // flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      // paddingHorizontal: tokens.spacing.sm,
      height: verticalScale(40),
      width: '100%',
      borderWidth: 0.5,
      borderColor: tokens.colors.primary,
      borderRadius: tokens.spacing.smPlus,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.sm,
    },
    inputContainer: {
      fontSize: tokens.fontSize.sm,
      fontFamily: Fonts.ManropeRegular,
      color: tokens.colors.black,
      marginLeft: tokens.spacing.sm,
      flex: 1,
    },
    leftIcon: {
      height: moderateScale(1),
      width: moderateScale(1),
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
      // borderWidth: 1,
    },
  });
};
