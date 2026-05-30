import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      backgroundColor: '#e9f5fa',
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
      shadowColor: '#c1c1c1',
      borderRadius: tokens.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
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
      height: moderateScale(100),
      width: moderateScale(100),
    },
    row: {
      justifyContent: 'flex-start',
      gap: scale(10),
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

    // add const name = new type(arguments);
    checkIconBox: {
      position: 'absolute',
      top: tokens.spacing.xs,
      right: tokens.spacing.xs,

      height: moderateScale(28),
      width: moderateScale(28),

      borderRadius: tokens.radius.xxl,
      backgroundColor: 'rgba(80,80,80,.9)',

      alignItems: 'center',
      justifyContent: 'center',
    },

    checkIcon: {
      height: moderateScale(16),
      width: moderateScale(16),
      tintColor: tokens.colors.white,
    },

    previewHeader: {
      position: 'absolute',
      top: verticalScale(45),
      right: tokens.spacing.md,
      zIndex: 10,
    },

    previewCountText: {
      fontSize: tokens.fontSize.lg,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeSemiBold,
    },

    previewCloseBox: {
      position: 'absolute',
      top: verticalScale(45),
      left: tokens.spacing.md,

      height: moderateScale(34),
      width: moderateScale(34),

      borderRadius: tokens.radius.xxl,
      backgroundColor: 'rgba(255,255,255,.15)',

      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },

    previewCloseIcon: {
      height: moderateScale(16),
      width: moderateScale(16),
      tintColor: tokens.colors.white,
    },

    fullImage: {
      width: '100%',
      height: verticalScale(280),
    },

    selectedBorder: {
      borderWidth: 1,
      borderColor: tokens.colors.primary,
    },

    modalBlackBg: {
      flex: 1,
      backgroundColor: '#000',
    },

    fullPreviewImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
    },
    selectedBox: {
      backgroundColor: tokens.colors.green,
    },

    itemNumberText: {
      fontSize: tokens.fontSize.md,
      textAlign: 'center',
      marginTop: tokens.spacing.xxs,
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
