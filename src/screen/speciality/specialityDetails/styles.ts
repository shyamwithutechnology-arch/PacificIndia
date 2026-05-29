import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

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
      backgroundColor: '#D9D9D9',
      elevation: 10,
      shadowColor: '#fff',
      borderColor: '#AFE7FF',
      borderRadius: tokens.radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      width: '32%',
      paddingHorizontal: tokens.spacing.xxs,
      paddingVertical: tokens.spacing.sm,
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
      height: moderateScale(70),
      width: moderateScale(70),
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.sm,
    },
    categoryBox: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      // backgroundColor: tokens.colors.white,
      marginBottom: tokens.spacing.sm,
      height: moderateScale(50),
      width: moderateScale(50),
      elevation: 10,
      shadowColor: '#fff',
    },
    listContainer: {
      paddingBottom: tokens.spacing.xl,
      paddingTop: tokens.spacing.smPlus,
    },
    searchTop: {
      marginTop: tokens.spacing.md,
      // marginBottom: tokens.spacing.xs,
    },
    madicinImg: {
      height: moderateScale(270),
      width: moderateScale(270),
    },
    headerItemBox: {
      paddingHorizontal: tokens.spacing.mdPlus,
      paddingVertical: tokens.spacing.xs,
      alignSelf: 'flex-start',
      borderRadius: scale(5),
      marginRight: tokens.spacing.md,
      borderWidth: 1,
      backgroundColor: '#e3e3e3',
      borderColor: '#DDDDDD',
    },
    headerListContainer: {
      alignSelf: 'flex-start',
      paddingTop: tokens.spacing.smPlus,
    },
    headerSelectBox: {
      backgroundColor: tokens.colors.primary,
    },
    headerTitleText: {
      fontSize: tokens.fontSize.sm,
      color: '#676767',
      fontFamily: Fonts.ManropeMedium,
    },
    headerSelectTitle: {
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
    },

    imgBox: {
      height: verticalScale(150),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContainer: {
      borderRadius: tokens.radius.md,
    },
    cancelBox: {
      height: moderateScale(30),
      width: moderateScale(30),
      borderRadius: tokens.radius.xxl,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: verticalScale(-35),
      backgroundColor: tokens.colors.white,
      right: tokens.spacing.sm,
    },
    cancleIcon: {
      height: moderateScale(14),
      width: moderateScale(14),
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
