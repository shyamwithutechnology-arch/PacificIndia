import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../theme';
import { AppTheme } from '../../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    loginText: {
      fontSize: tokens.fontSize.mdPlus,
      color: colors.primary,
      marginTop: tokens.spacing.lg,
      alignSelf: 'center',
      fontFamily: Fonts.ManropeBold,
      marginBottom: tokens.spacing.sm,
    },
    loginToContinueText: {
      marginTop: 0,
      marginBottom: tokens.spacing.lg,
      fontSize: tokens.fontSize.sm,
      color: colors.black,
    },
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    logo: {
      height: '100%',
      width: '100%',
    },
    logoBox: {
      height: moderateScale(100),
      width: moderateScale(100),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: tokens.spacing.xxxl,
      // marginBottom: tokens.spacing.lg,
    },
    passinput: {
      marginTop: verticalScale(13),
    },
    callIcon: {
      height: moderateScale(17),
      width: moderateScale(17),
      tintColor: tokens.colors.primary,
    },
    passIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
      tintColor: tokens.colors.primary,
    },
    loginBtn: {
      marginTop: verticalScale(20),
    },
    versionText: {
      fontSize: tokens.fontSize.sm,
      color: colors.InputText,
      fontFamily: Fonts.ManropeMedium,
      alignSelf: 'center',
      bottom: 0,
      left: 0,
      right: 0,
      marginBottom: 'auto',
      // marginBottom: verticalScale(20),
    },

    //error
    errorText: {
      color: 'red',
      fontSize: tokens.fontSize.xs,
      marginTop: tokens.spacing.xxs,
      // marginLeft: tokens.spacing.lg,
    },
  });
};
