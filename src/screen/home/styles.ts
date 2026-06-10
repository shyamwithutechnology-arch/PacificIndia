import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const {
    verticalScale,
    scale,
    tokens,
    moderateScale,
    normalize,
    isTablet,
    insets,
  } = theme;
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
      marginBottom: tokens.spacing.smPlus,
    },

    cart: {
      backgroundColor: '#E5F7FF',
      elevation: 10,
      shadowColor: '#E8E8E8',
      borderColor: '#AFE7FF',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: isTablet ? '23%' : '48%',
      paddingHorizontal: tokens.spacing.xxs,
      paddingVertical: tokens.spacing.sm,
      marginTop: isTablet ? tokens.spacing.md : tokens.spacing.xs,
    },
    titleText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeBold,
      textAlign: 'center',
    },
    titledDecText: {
      fontSize: normalize(9),
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
      textAlign: 'center',
      marginTop: tokens.spacing.xxs,
    },
    categoryImg: {
      height: moderateScale(35),
      width: moderateScale(35),
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
      height: moderateScale(50),
      width: moderateScale(50),
      elevation: 10,
      shadowColor: '#fff',
    },
    listContainer: {
      paddingBottom: insets.bottom + tokens.spacing.xxl,
      paddingTop: tokens.spacing.sm,
      flexGrow: 1,
    },
    pacificText: {
      fontSize: tokens.fontSize.smPlus,
      fontFamily: Fonts.ManropeSemiBold,
      color: tokens.colors.black,
      marginTop: tokens.spacing.mdPlus,
      borderBottomWidth: 1,
      alignSelf: 'flex-start',
      borderBottomColor: '#8c8c8c',
      marginBottom: tokens.spacing.sm,
    },
    pacificDecText: {
      fontSize: tokens.fontSize.xs,
      fontFamily: Fonts.ManropeMedium,
      color: tokens.colors.lightGray,
      textAlign: 'justify',
      lineHeight: moderateScale(21),
    },
    secondParagrapText: {
      marginTop: tokens.spacing.smPlus,
      marginBottom: tokens.spacing.xxl,
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
