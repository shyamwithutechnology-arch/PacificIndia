import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    specialityText: {
      fontSize: tokens.fontSize.lg,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: tokens.spacing.sm,
    },
    specialityDecText: {
      fontSize: tokens.fontSize.xxs,
      color: tokens.colors.gray,
      fontFamily: Fonts.ManropeMedium,
      textAlign: 'center',
    },

    cart: {
      backgroundColor: tokens.colors.white,
      elevation: 10,
      shadowColor: '#E8E8E8',
      borderColor: '#DEDEDE',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      paddingHorizontal: tokens.spacing.xxs,
      paddingVertical: tokens.spacing.smPlus,
      marginBottom: tokens.spacing.md,
      flexDirection: 'row',
    },
    titleText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeExtraBold,
      marginBottom: tokens.spacing.xs,
      width: scale(118),
      marginLeft: tokens.spacing.xxs,
    },
    titledDecText: {
      fontSize: normalize(9),
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
      textAlign: 'center',
      marginTop: tokens.spacing.xxs,
    },
    categoryImg: {
      height: moderateScale(100),
      width: moderateScale(100),
      marginLeft: tokens.spacing.sm,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.sm,
    },
    categoryBox: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: tokens.radius.xxl,
      backgroundColor: tokens.colors.white,
      marginBottom: tokens.spacing.sm,
      height: moderateScale(150),
      width: moderateScale(150),
      elevation: 10,
      shadowColor: '#fff',
    },
    listContainer: {
      paddingBottom: tokens.spacing.sm,
      paddingTop: tokens.spacing.smPlus,
    },
    searchTop: {
      marginTop: tokens.spacing.md,
    },

    verificationBox: {
      paddingHorizontal: verticalScale(10),
      paddingVertical: verticalScale(3),
      backgroundColor: tokens.colors.green,
      borderRadius: tokens.radius.md,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginLeft: tokens.spacing.md,
    },
    verificationImg: {
      width: moderateScale(15),
      height: moderateScale(15),
    },
    dateIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
    },
    timeIcon: {
      width: moderateScale(16.5),
      height: moderateScale(16.5),
    },
    verifiedText: {
      fontSize: tokens.fontSize.xxs,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
      marginLeft: tokens.spacing.xs,
    },
    titleDecText: {
      fontSize: normalize(11),
      color: '#505050',
      fontFamily: Fonts.ManropeMedium,
    },
    locationText: {
      color: '#999999',
      marginLeft: tokens.spacing.xs,
      width: scale(190),
    },
    rightArrowBox: {
      height: moderateScale(30),
      width: moderateScale(30),
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightArrowImg: {
      height: moderateScale(18),
      width: moderateScale(18),
    },
    mapRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateText: {
      marginTop: tokens.spacing.sm,
      width: '40%',
    },
    doctorImgRow: {
      justifyContent: 'space-between',
      marginRight: tokens.spacing.md,
      marginTop: tokens.spacing.mdPlus,
    },
    mainCardInner: {
      marginHorizontal: tokens.spacing.sm,
    },
    decLength: {
      width: scale(160),
      marginTop: tokens.spacing.xxs,
    },
  });
};
