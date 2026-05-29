import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../../theme';
import { AppTheme } from '../../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    loginText: {
      fontSize: tokens.fontSize.md,
      color: colors.black,
      marginBottom: tokens.spacing.sm,
      marginTop: tokens.spacing.sm,
      alignSelf: 'center',
      fontFamily: Fonts.ManropeBold,
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
      marginBottom: tokens.spacing.lg,
    },
    passinput: {
      marginBottom: verticalScale(13),
    },
    callIcon: {
      height: moderateScale(17),
      width: moderateScale(17),
    },
    passIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    loginBtn: {
      marginTop: verticalScale(20),
    },
    versionText: {
      fontSize: tokens.fontSize.sm,
      color: colors.InputText,
      fontFamily: Fonts.ManropeMedium,
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: verticalScale(20),
    },
  });
};
