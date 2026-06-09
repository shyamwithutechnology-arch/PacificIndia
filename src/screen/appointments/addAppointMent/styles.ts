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
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.black,
      marginTop: tokens.spacing.smPlus,
      fontFamily: Fonts.ManropeBold,
    },

    inputBoxStyle: {
      borderRadius: tokens.radius.sm,
      marginTop: tokens.spacing.xsPlus,
      // marginBottom: tokens.spacing.sm,
    },
    addressText1: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
      marginBottom: tokens.spacing.xxs,
      // marginLeft: tokens.spacing.xs,
    },

    stateText: {
      marginTop: tokens.spacing.smPlus,
    },

    stateDropDown: {
      borderWidth: 0.6,
      borderColor: tokens.colors.primary,
      borderRadius: scale(4),
      marginTop: tokens.spacing.xs,
      height: verticalScale(37),
    },
    cityDropDown: {
      borderWidth: 0.6,
    },
    cityText: {
      marginTop: tokens.spacing.smPlus,
    },
    submitBtn: {
      marginTop: tokens.spacing.lg,
      marginBottom: tokens.spacing.md,
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
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: tokens.spacing.xs,
    },
    dateIcon: {
      height: moderateScale(23),
      width: moderateScale(23),
    },

    // error style
    nameError: {
      fontSize: moderateScale(11),
      color: tokens.colors.red,
      fontFamily: Fonts.ManropeBold,
    },

    cityPlaceholderText: {
      color: tokens.colors.InputText,
      fontSize: normalize(13),
    },

    formRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    halfField: {
      width: '48%',
    },
  });
};
