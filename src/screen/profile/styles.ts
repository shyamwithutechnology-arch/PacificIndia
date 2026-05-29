import { StyleSheet } from 'react-native';
import { colors, Fonts } from '../../theme';
import { AppTheme } from '../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, verticalScale, scale, moderateScale, insets } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    passIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    inputBoxStyle: {
      borderRadius: scale(6),
      marginBottom: tokens.spacing.smPlus,
    },
    splashLogo: {
      height: moderateScale(86),
      width: moderateScale(86),
      // marginBottom: tokens.spacing.xxs,
      marginTop: tokens.spacing.xs,
    },
    logoBox: {
      height: verticalScale(100),
      width: scale(100),
      borderRadius: scale(200),
      backgroundColor: tokens.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginVertical: tokens.spacing.md,
      elevation: 10,
      shadowColor: '#8b8b8b',
    },
    editProfileBtn: {
      height: moderateScale(25),
      width: moderateScale(25),
      borderRadius: tokens.radius.xxl,
      backgroundColor: tokens.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: verticalScale(10),
      right: scale(3),
    },
    addressText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeSemiBold,
      marginLeft: tokens.spacing.xs,
    },
    addressText1: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
      marginLeft: tokens.spacing.xs,
    },
    nameError: {
      fontSize: moderateScale(11),
      color: tokens.colors.red,
      fontFamily: Fonts.ManropeBold,
      marginLeft: moderateScale(20),
    },
    radioBtn: {
      height: moderateScale(16),
      width: moderateScale(16),
      borderRadius: tokens.radius.xxl,
      borderWidth: 1,
      borderColor: tokens.colors.lightBlack,
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerRadioBtn: {
      height: moderateScale(10),
      width: moderateScale(10),
      backgroundColor: tokens.colors.primary,
      borderRadius: tokens.radius.xxl,
    },
    maritalStatusRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    maritalBoxMain: {
      marginTop: tokens.spacing.xxs,
      marginBottom: tokens.spacing.lg,
    },
    outerBox: {
      borderColor: tokens.colors.primary,
    },

    maritalBox: {
      marginLeft: tokens.spacing.lg,
    },
    stateDropDown: {
      borderWidth: 0.6,
      borderColor: tokens.colors.primary,
      borderRadius: scale(4),
      marginTop: tokens.spacing.xs,
    },
    cityText: {
      marginTop: tokens.spacing.smPlus,
    },
    btnStyle: {
      marginTop: tokens.spacing.md,
    },
    innerContainer: {
      paddingBlock: insets.bottom + tokens.spacing.md,
    },
  });
};
