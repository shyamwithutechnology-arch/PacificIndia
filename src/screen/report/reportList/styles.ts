import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

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
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
      borderLeftWidth: 3.5,
      borderLeftColor: tokens.colors.primary,
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
      alignItems: 'center',
      // justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: tokens.spacing.xs,
    },
    innerRowBox: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
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

    hqNameLabel: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
    },

    hqNameValue: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,

      marginLeft: tokens.spacing.xs,
    },
    doctorName: {
      // borderWidth: 1,
    },
    spandIconBox: {
      marginRight: tokens.spacing.sm,
    },
    contentBox: {
      // borderTopWidth: 1,
      borderColor: '#9cb7c2',
      marginTop: tokens.spacing.sm,
      // paddingTop: tokens.spacing.sm,
    },
    baseLine: {
      backgroundColor: '#9cb7c2',
      height: 1,
      width: '100%',
      marginTop: tokens.spacing.xs,
      marginBottom: tokens.spacing.xsPlus,
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
