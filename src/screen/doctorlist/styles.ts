import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize, isTablet } =
    theme;
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
      paddingHorizontal: scale(1),
      paddingVertical: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    cartBox: {
      width: !isTablet ? '49%' : 'auto',
    },
    titleText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeExtraBold,
      // textAlign: 'center',
      marginBottom: tokens.spacing.xs,
      width: scale(118),
    },
    titledDecText: {
      fontSize: normalize(9),
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
      textAlign: 'center',
      marginTop: tokens.spacing.xxs,
    },
    categoryImg: {
      height: moderateScale(60),
      width: moderateScale(60),
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
    columnWrapperStyle: {
      justifyContent: 'space-between',
    },
    searchTop: {
      marginTop: 0,
      width: isTablet ? '83.5%' : '75.5%',
      // marginBottom: tokens.spacing.xs,
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
      width: moderateScale(14),
      height: moderateScale(14),
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
      marginLeft: tokens.spacing.sm,
      width: scale(150),
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
      // borderWidth: 1,
      alignItems: 'center',
    },
    doctorImgRow: {
      justifyContent: 'space-between',
      marginRight: tokens.spacing.md,
      marginTop: tokens.spacing.xs,
    },
    mainCardInner: {
      // marginHorizontal: 0,
      marginHorizontal: tokens.spacing.sm,
      // borderWidth: 1,
    },
    decLength: {
      width: scale(160),
      // borderWidth: 1,
      marginTop: tokens.spacing.xxs,
    },

    addBox: {
      height: verticalScale(33),
      width: scale(80),
      backgroundColor: tokens.colors.primary,
      borderRadius: tokens.radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: tokens.spacing.sm,
      flexDirection: 'row',
      paddingHorizontal: tokens.spacing.sm,
    },
    rowSerach: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: tokens.spacing.smPlus,
    },
    addText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeBold,
    },
    addIcon: {
      height: moderateScale(16),
      width: moderateScale(16),
    },

    //serach
    suggestionContainer: {
      backgroundColor: '#fff',
      borderRadius: moderateScale(10),
      elevation: 5,
      // marginHorizontal: scale(10),
      marginTop: verticalScale(4),
      marginBottom: verticalScale(20),
    },

    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: moderateScale(14),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ddd',
    },
    doctorName: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
      marginLeft: tokens.spacing.sm,
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
