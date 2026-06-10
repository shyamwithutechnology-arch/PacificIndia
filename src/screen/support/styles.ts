import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize, insets } =
    theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      backgroundColor: '#e9f5fa',
      paddingBottom: insets.bottom + tokens.spacing.sm,
    },
    logoImg: {
      height: moderateScale(60),
      width: moderateScale(60),
      alignSelf: 'center',
      marginRight: tokens.spacing.smPlus,
    },
    customerCareBox: {
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.md,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 10,
      shadowColor: '#989898',
      marginTop: tokens.spacing.mdPlus,
    },
    headerBox: {
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.md,
      padding: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      elevation: 10,
      shadowColor: '#676767',
      marginTop: tokens.spacing.md,
    },
    nameIcon: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    nameText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
      marginLeft: tokens.spacing.smPlus,
      width: '90%',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: tokens.spacing.smPlus,
    },
    baseLine: {
      height: verticalScale(0.8),
      width: '100%',
      backgroundColor: '#d9d9d9',
      marginVertical: tokens.spacing.sm,
    },
    haveAnyText: {
      fontSize: tokens.fontSize.smPlus,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeBold,
      alignSelf: 'center',
      marginVertical: tokens.spacing.md,
    },
    submitBtn: {
      marginTop: tokens.spacing.lg,
      marginBottom: tokens.spacing.sm,
    },
    callIcon: {
      height: moderateScale(35),
      width: moderateScale(35),
    },
    customerText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeMedium,
    },
    pacificText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
    },
    logoHederRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    dropDownContainer: {
      borderWidth: 0.5,
      borderRadius: tokens.radius.sm,
      borderColor: tokens.colors.primary,
      marginBottom: tokens.spacing.smPlus,
    },
    inputBoxStyle: {
      marginTop: tokens.spacing.mdPlus,
    },

    commentBox: {
      // height: verticalScale(60),
      textAlignVertical: 'top',
      borderWidth: 0,
    },
    appInputBox: {
      borderWidth: 1,
      height: verticalScale(90),
      borderRadius: tokens.radius.md,
      borderColor: '#D9D9D9',
      paddingHorizontal: tokens.spacing.sm,
    },
    addressText1: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
      marginBottom: tokens.spacing.xxs,
      // marginLeft: tokens.spacing.xs,
    },
  });
};
// export const styles = StyleSheet.create({
//   drawerIcon: {
//     height: moderateScale(20),
//     width: moderateScale(20),
//   },
//   categoryBox: {},
// });
