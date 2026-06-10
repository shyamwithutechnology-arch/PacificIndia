import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts, fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, scale, moderateScale, verticalScale, normalize } = theme;
  return StyleSheet.create({
    // inputBox: {
    //   // paddingVertical: tokens.spacing.xxs,
    //   // width: '100%',
    //   // borderWidth: 0.5,
    //   // borderColor: tokens.colors.primary,
    //   // alignSelf: 'center',
    //   // borderRadius: tokens.spacing.smPlus,
    //   // flexDirection: 'row',
    //   // alignItems: 'center',
    //   // justifyContent: 'space-between',
    //   // paddingHorizontal: tokens.spacing.sm,
    //   // height: verticalScale(40),
    //   paddingVertical: verticalScale(0),
    //   width: '100%',
    //   borderWidth: 0.5,
    //   borderColor: tokens.colors.primary,
    //   borderRadius: tokens.spacing.smPlus,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   paddingHorizontal: tokens.spacing.sm,
    // },
    inputBox: {
      height: verticalScale(38),
      borderWidth: 0.5,
      borderColor: tokens.colors.primary,
      borderRadius: tokens.spacing.xsPlus,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.sm,
    },

    // inputContainer: {
    //   fontSize: normalize(13),
    //   fontFamily: Fonts.ManropeRegular,
    //   color: tokens.colors.black,
    //   marginLeft: tokens.spacing.sm,
    //   flex: 1,
    // },

    inputContainer: {
      flex: 1,
      fontSize: normalize(13),
      fontFamily: Fonts.ManropeRegular,
      color: tokens.colors.black,

      paddingVertical: 0,
      marginVertical: 0,
      includeFontPadding: false, // Android
      textAlignVertical: 'center', // Android
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
