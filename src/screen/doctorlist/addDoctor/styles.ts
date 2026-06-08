import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, verticalScale, scale, moderateScale, insets, normalize } =
    theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.white,
    },
    passIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    inputBoxStyle: {
      borderRadius: scale(6),
      marginTop: tokens.spacing.xs,
    },
    bottomSpace: {
      marginBottom: tokens.spacing.sm,
    },
    splashLogo: {
      height: moderateScale(86),
      width: moderateScale(86),
      // marginBottom: tokens.spacing.xxs,
      marginTop: tokens.spacing.xs,
    },
    imageUpload: {
      alignSelf: 'center',
    },
    logoBox: {
      height: verticalScale(100),
      width: scale(100),
      borderRadius: scale(200),
      backgroundColor: tokens.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: tokens.spacing.md,
      elevation: 10,
      shadowColor: '#1b1a1a',
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
      fontFamily: Fonts.ManropeMedium,
      marginLeft: tokens.spacing.xs,
    },
    singleSelected: {
      fontFamily: Fonts.ManropeBold,
    },
    addressText1: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeExtraBold,
      marginBottom: tokens.spacing.xxs,
      // marginLeft: tokens.spacing.xs,
    },
    nameError: {
      fontSize: moderateScale(11),
      color: tokens.colors.red,
      fontFamily: Fonts.ManropeBold,
      marginBottom: tokens.spacing.smPlus,

      // marginLeft: moderateScale(20),
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
    marrizedStyle: {
      marginLeft: tokens.spacing.lg,
    },
    maritalBoxMain: {
      marginTop: tokens.spacing.xs,
      marginBottom: tokens.spacing.smPlus,
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
      borderRadius: scale(6),
      marginTop: tokens.spacing.xs,
    },
    cityDropDown: {
      borderWidth: 0.6,
      marginBottom: tokens.spacing.sm,
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
    selectDate: {
      fontSize: normalize(13),
      color: tokens.colors.InputText,
      fontFamily: Fonts.ManropeRegular,
    },
    dateSelectBox: {
      paddingVertical: tokens.spacing.sm,
      borderWidth: 0.5,
      borderRadius: tokens.radius.sm,
      paddingHorizontal: tokens.spacing.sm,
      borderColor: tokens.colors.primary,
      marginBottom: tokens.spacing.smPlus,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: tokens.spacing.xs,
    },
    stateText: {
      marginTop: tokens.spacing.smPlus,
    },
    dateIcon: {
      height: moderateScale(23),
      width: moderateScale(23),
    },
  });
};
