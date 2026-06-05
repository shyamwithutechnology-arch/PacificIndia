import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    card: {
      backgroundColor: tokens.colors.white,
      elevation: 10,
      shadowColor: '#E8E8E8',
      borderColor: '#DEDEDE',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.smPlus,
      marginBottom: tokens.spacing.mdPlus,
      marginTop: tokens.spacing.mdPlus,
    },
    headerCardInner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.md,
    },
    titleText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeExtraBold,
      marginBottom: tokens.spacing.xs,
      width: scale(150),
    },
    titleDecText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeMedium,
      marginTop: tokens.spacing.xxs,
    },
    idText: {
      color: '#676565',
      fontSize: normalize(10),
      fontFamily: Fonts.ManropeBold,
    },
    docImg: {
      height: moderateScale(55),
      width: moderateScale(55),
      marginRight: tokens.spacing.smPlus,
    },
    editText: {
      fontSize: tokens.fontSize.xs,
      fontFamily: Fonts.ManropeMedium,
      color: tokens.colors.primary,
    },
    editBtn: {
      backgroundColor: 'rgba(0, 147, 211, 0.08)',
      borderRadius: tokens.radius.sm,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0, 147, 211, 0.19)',
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mailRow: {
      marginTop: tokens.spacing.smPlus,
    },
    mailText: {
      fontSize: tokens.fontSize.xs,
      width: scale(160),
      // borderWidth: 1,
      marginLeft: tokens.spacing.sm,
    },
    baseLine: {
      height: verticalScale(1),
      backgroundColor: '#EBEBEB',
      width: '100%',
    },
    emailcon: {
      height: moderateScale(16),
      width: moderateScale(16),
    },
    callIcon: {
      height: moderateScale(13),
      width: moderateScale(13),
    },
    emilBox: {
      height: moderateScale(25),
      width: moderateScale(25),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 147, 211, 0.19)',
      borderRadius: tokens.spacing.lg,
    },
    personalInfoInner: {
      alignContent: 'center',
      backgroundColor: tokens.colors.lightPrimary,
      padding: tokens.spacing.sm,
      paddingLeft: tokens.spacing.md,
      borderTopRightRadius: tokens.radius.sm,
      borderTopLeftRadius: tokens.radius.sm,
    },
    personalInfoText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeSemiBold,
    },
    locationCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.sm,
    },
    locationBnt: {
      marginBottom: 0,
      marginTop: tokens.spacing.md,
    },
    locationText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.lightBlack,
      fontFamily: Fonts.ManropeMedium,
      marginLeft: tokens.spacing.sm,
    },
    womenText: {
      color: tokens.colors.black,
      marginLeft: 0,
    },
    personalInformation: {
      borderRadius: tokens.radius.md,
      elevation: 10,
      shadowColor: '#aeaeae',
      backgroundColor: tokens.colors.white,
      marginTop: tokens.spacing.md,
    },
    innerPerformationBox: {
      padding: tokens.spacing.smPlus,
      paddingVertical: tokens.spacing.sm,
    },
    bottomSpace: {
      marginBottom: tokens.spacing.sm,
    },
    doctorMedicineBtn: {
      width: '48%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.primary,
      paddingVertical: tokens.spacing.sm,
      borderRadius: tokens.radius.sm,
    },
    doctorText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
    },
    medecinBox: {
      backgroundColor: '#0074D3',
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
