import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts, fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, moderateScale, tokens, normalize } = theme;
  return StyleSheet.create({
    logo: {
      height: verticalScale(120),
      width: scale(120),
    },
    logoBox: {
      height: verticalScale(60),
      width: scale(80),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.white,
      alignSelf: 'center',
      padding: moderateScale(40),
      borderRadius: tokens.radius.md,
      paddingHorizontal: scale(43),
      marginVertical: verticalScale(10),
      marginTop: verticalScale(60),
    },
    otpText: {
      fontSize: normalize(28),
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
      alignSelf: 'center',
    },
    decText: {
      fontSize: tokens.fontSize.smPlus,
      color: tokens.colors.lightGray,
      marginTop: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
    },

    ////
    innerContainer: {
      flex: 1,
      borderTopRightRadius: tokens.radius.xxl,
      borderTopLeftRadius: tokens.radius.xxl,
    },

    inputContainer: {
      height: verticalScale(50),
      width: '90%',
      borderWidth: 1,
      marginHorizontal: tokens.spacing.md,
      alignSelf: 'center',
      borderRadius: tokens.radius.md,
      borderColor: tokens.colors.borderColor,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: tokens.spacing.md,
      marginTop: tokens.spacing.xxl,
      marginBottom: tokens.spacing.md,
    },
    input: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
      marginLeft: tokens.spacing.sm,
    },
    mainBoxSupport: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomContainer: {
      marginTop: 'auto',
      paddingBottom: tokens.spacing.lg,
    },

    earPhoneBox: {
      width: scale(60),
      aspectRatio: 1,
      borderRadius: tokens.radius.xl,
      backgroundColor: tokens.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      marginRight: tokens.spacing.md,
    },
    earPhone: {
      height: moderateScale(34),
      aspectRatio: 1,
    },
    helpLineTest: {
      fontSize: tokens.fontSize.mdPlus,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeRegular,
    },
    supportNuber: {
      fontSize: normalize(25),
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeBold,
    },
    versionText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeRegular,
      alignSelf: 'center',
      marginTop: tokens.spacing.md,
    },

    loginText: {
      fontSize: normalize(28),
      fontFamily: Fonts.ManropeSemiBold,
      color: tokens.colors.black,
      alignSelf: 'center',
      marginTop: tokens.spacing.xxl,
    },
    changeText: {
      fontSize: tokens.fontSize.smPlus,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeSemiBold,
      alignSelf: 'center',
      marginTop: tokens.spacing.md,
    },
    optSendText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeRegular,
      alignSelf: 'center',
      marginTop: tokens.spacing.smPlus,
      marginBottom: tokens.spacing.lg,
    },
  });
};
