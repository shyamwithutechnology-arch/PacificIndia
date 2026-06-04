// import { StyleSheet } from 'react-native';
// import { AppTheme } from '../../../hooks/useAppTheme';
// import { Fonts } from '../../../theme';

// export const createStyles = (theme: AppTheme) => {
//   const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     innerContainer: {
//       backgroundColor: '#e9f5fa',
//     },
//     specialityText: {
//       fontSize: tokens.fontSize.lg,
//       color: tokens.colors.black,
//       fontFamily: Fonts.ManropeMedium,
//       alignSelf: 'center',
//       justifyContent: 'center',
//       marginTop: tokens.spacing.sm,
//     },
//     specialityDecText: {
//       fontSize: tokens.fontSize.xxs,
//       color: tokens.colors.gray,
//       fontFamily: Fonts.ManropeMedium,
//       textAlign: 'center',
//     },

//     cart: {
//       backgroundColor: tokens.colors.white,
//       elevation: 10,
//       shadowColor: '#c1c1c1',
//       borderRadius: tokens.radius.md,
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '48%',
//       paddingHorizontal: tokens.spacing.xxs,
//       paddingVertical: tokens.spacing.sm,
//     },
//     titleText: {
//       fontSize: tokens.fontSize.xs,
//       color: tokens.colors.headingColor,
//       fontFamily: Fonts.ManropeBold,
//       textAlign: 'center',
//     },
//     titledDecText: {
//       fontSize: normalize(9),
//       color: tokens.colors.lightGray,
//       fontFamily: Fonts.ManropeMedium,
//       textAlign: 'center',
//       marginTop: tokens.spacing.xxs,
//     },
//     categoryImg: {
//       height: moderateScale(100),
//       width: moderateScale(100),
//     },
//     row: {
//       justifyContent: 'flex-start',
//       gap: scale(10),
//       marginBottom: tokens.spacing.sm,
//     },
//     categoryBox: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       alignSelf: 'center',
//       // backgroundColor: tokens.colors.white,
//       marginBottom: tokens.spacing.sm,
//       height: moderateScale(50),
//       width: moderateScale(50),
//       elevation: 10,
//       shadowColor: '#fff',
//     },
//     listContainer: {
//       paddingBottom: tokens.spacing.xl,
//       paddingTop: tokens.spacing.smPlus,
//     },
//     searchTop: {
//       marginTop: tokens.spacing.md,
//       // marginBottom: tokens.spacing.xs,
//     },
//     madicinImg: {
//       height: moderateScale(270),
//       width: moderateScale(270),
//     },
//     headerItemBox: {
//       paddingHorizontal: tokens.spacing.mdPlus,
//       paddingVertical: tokens.spacing.xs,
//       alignSelf: 'flex-start',
//       borderRadius: scale(5),
//       marginRight: tokens.spacing.md,
//       borderWidth: 1,
//       backgroundColor: '#e3e3e3',
//       borderColor: '#DDDDDD',
//     },
//     headerListContainer: {
//       alignSelf: 'flex-start',
//       paddingTop: tokens.spacing.smPlus,
//     },
//     headerSelectBox: {
//       backgroundColor: tokens.colors.primary,
//     },
//     headerTitleText: {
//       fontSize: tokens.fontSize.sm,
//       color: '#676767',
//       fontFamily: Fonts.ManropeMedium,
//     },
//     headerSelectTitle: {
//       color: tokens.colors.white,
//       fontFamily: Fonts.ManropeMedium,
//     },

//     imgBox: {
//       height: verticalScale(150),
//       width: '100%',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     modalContainer: {
//       borderRadius: tokens.radius.md,
//     },
//     cancelBox: {
//       height: moderateScale(30),
//       width: moderateScale(30),
//       borderRadius: tokens.radius.xxl,
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: 'absolute',
//       top: verticalScale(-35),
//       backgroundColor: tokens.colors.white,
//       right: tokens.spacing.sm,
//     },
//     cancleIcon: {
//       height: moderateScale(14),
//       width: moderateScale(14),
//     },

//     // add const name = new type(arguments);
//     checkIconBox: {
//       position: 'absolute',
//       top: tokens.spacing.xs,
//       right: tokens.spacing.xs,

//       height: moderateScale(24),
//       width: moderateScale(24),

//       borderRadius: tokens.radius.sm,
//       backgroundColor: 'rgba(80,80,80,.9)',

//       alignItems: 'center',
//       justifyContent: 'center',
//     },

//     checkIcon: {
//       height: moderateScale(16),
//       width: moderateScale(16),
//       tintColor: tokens.colors.white,
//     },

//     previewHeader: {
//       position: 'absolute',
//       top: verticalScale(45),
//       right: tokens.spacing.md,
//       zIndex: 10,
//     },

//     previewCountText: {
//       fontSize: tokens.fontSize.lg,
//       color: tokens.colors.white,
//       fontFamily: Fonts.ManropeSemiBold,
//     },

//     previewCloseBox: {
//       position: 'absolute',
//       top: verticalScale(45),
//       left: tokens.spacing.md,

//       height: moderateScale(34),
//       width: moderateScale(34),

//       borderRadius: tokens.radius.xxl,
//       backgroundColor: 'rgba(255,255,255,.15)',

//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 10,
//     },

//     previewCloseIcon: {
//       height: moderateScale(16),
//       width: moderateScale(16),
//       tintColor: tokens.colors.white,
//     },

//     fullImage: {
//       width: '100%',
//       height: verticalScale(280),
//     },

//     selectedBorder: {
//       borderWidth: 1,
//       borderColor: tokens.colors.primary,
//     },

//     modalBlackBg: {
//       flex: 1,
//       backgroundColor: '#000',
//     },

//     fullPreviewImage: {
//       width: '100%',
//       height: '100%',
//       resizeMode: 'stretch',
//     },
//     selectedBox: {
//       backgroundColor: tokens.colors.green,
//     },

//     itemNumberText: {
//       fontSize: tokens.fontSize.md,
//       textAlign: 'center',
//       marginTop: tokens.spacing.xxs,
//     },
//   });
// };
// // export const styles = StyleSheet.create({
// //   drawerIcon: {
// //     height: moderateScale(20),
// //     width: moderateScale(20),
// //   },
// //   categoryBox: {},
// // });

import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
  const { width, height } = Dimensions.get('window');

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      backgroundColor: '#e9f5fa',
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
      elevation: 5,
      shadowColor: '#c1c1c1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderRadius: tokens.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scale(1),
      paddingTop: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
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
      borderRadius: tokens.radius.md,
    },
    row: {
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.xxs,
      // marginBottom: tokens.spacing.xxs,
    },
    categoryBox: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: tokens.spacing.sm,
      height: moderateScale(50),
      width: moderateScale(50),
      elevation: 10,
      shadowColor: '#fff',
    },
    listContainer: {
      paddingBottom: tokens.spacing.xl,
      paddingTop: tokens.spacing.smPlus,
      flexGrow: 1,
    },
    searchTop: {
      marginTop: tokens.spacing.md,
    },
    madicinImg: {
      height: moderateScale(270),
      width: moderateScale(270),
    },
    headerItemBox: {
      minHeight: verticalScale(30),
      paddingHorizontal: tokens.spacing.mdPlus,
      borderRadius: scale(5),
      marginRight: tokens.spacing.md,
      borderWidth: 1,
      borderColor: tokens.colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: tokens.spacing.md,
    },
    headerListContainer: {
      alignSelf: 'flex-start',
      paddingTop: tokens.spacing.smPlus,
    },
    headerSelectBox: {
      backgroundColor: tokens.colors.primary,
      borderColor: tokens.colors.primary,
    },
    headerTitleText: {
      fontSize: tokens.fontSize.sm,
      lineHeight: moderateScale(24),
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

    checkIconBox: {
      position: 'absolute',
      top: tokens.spacing.xs,
      left: tokens.spacing.sm,
      height: moderateScale(24),
      width: moderateScale(24),
      borderRadius: tokens.radius.sm,
      backgroundColor: 'rgba(80,80,80,.9)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkBoxBg: {
      height: tokens.spacing.xl,
      width: scale(90),
      backgroundColor: '#3ab4e9',
      position: 'absolute',
      left: 0,
      top: 0,
      borderBottomRightRadius: tokens.radius.mdPlus,
      borderTopLeftRadius: tokens.radius.md,
    },
    checkIcon: {
      height: moderateScale(16),
      width: moderateScale(16),
      tintColor: tokens.colors.white,
    },
    itemBox: {
      backgroundColor: '#f1f1f1',
      width: '100%',
      borderBottomLeftRadius: tokens.radius.md,
      borderBottomRightRadius: tokens.radius.md,
      elevation: 10,
      shadowColor: '#909090',
    },

    // Full-screen modal styles
    modalFullScreen: {
      flex: 1,
      backgroundColor: '#000000',
    },

    imageContainer: {
      flex: 1,
      backgroundColor: '#000000',
    },

    fullScreenImageWrapper: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    },

    fullScreenImage: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    // Header styles for both orientations
    previewHeader: {
      position: 'absolute',
      top: 45,
      right: 20,
      zIndex: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },

    landscapePreviewHeader: {
      top: 20,
      right: 20,
    },

    previewCountText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeSemiBold,
    },

    previewCloseBox: {
      position: 'absolute',
      top: 45,
      left: 20,
      height: moderateScale(40),
      width: moderateScale(40),
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
    },

    landscapePreviewCloseBox: {
      top: 20,
      left: 20,
    },

    previewCloseIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
      tintColor: tokens.colors.white,
    },

    fullImage: {
      width: '100%',
      height: verticalScale(280),
    },

    selectedBorder: {
      borderWidth: 3,
      borderColor: tokens.colors.primary,
    },

    modalBlackBg: {
      flex: 1,
      backgroundColor: '#000',
    },

    fullPreviewContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    },

    fullPreviewImage: {
      width: '100%',
      height: '100%',
    },

    selectedBox: {
      backgroundColor: tokens.colors.green,
    },

    selectedCheck: {
      borderTopLeftRadius: tokens.radius.sm,
    },

    itemNumberText: {
      fontSize: tokens.fontSize.sm,
      textAlign: 'center',
      marginTop: tokens.spacing.xxs,
      marginBottom: tokens.spacing.xxs,
      color: '#424141',
      fontFamily: Fonts.ManropeSemiBold,
    },

    // Footer styles
    previewFooter: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
      paddingHorizontal: tokens.spacing.md,
    },

    landscapePreviewFooter: {
      bottom: 20,
    },

    previewFooterText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.radius.md,
      overflow: 'hidden',
    },

    ////
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      marginHorizontal: tokens.spacing.md,
      marginTop: tokens.spacing.sm,
      marginBottom: tokens.spacing.xs,
      borderRadius: tokens.radius.md,
    },

    summaryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    summaryText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.gray,
      fontFamily: Fonts.ManropeMedium,
    },

    selectedSummaryText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeSemiBold,
      marginLeft: tokens.spacing.xs,
    },

    clearButton: {
      backgroundColor: tokens.colors.primary,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.radius.sm,
    },

    clearButtonText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
    },

    previewModeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: tokens.spacing.xs,
    },

    previewModeText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
      opacity: 0.9,
    },

    selectedCountText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeSemiBold,
      marginLeft: tokens.spacing.xxs,
    },
  });
};
