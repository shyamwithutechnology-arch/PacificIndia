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
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeMedium,
      justifyContent: 'center',
      marginBottom: tokens.spacing.xs,
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
    searchTop: {
      width: '100%',
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
      width: moderateScale(14.2),
      height: moderateScale(14.2),
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
      color: '#555555',
      marginLeft: tokens.spacing.xs,
      width: scale(190),
      fontFamily: Fonts.ManropeSemiBold,
    },
    rightArrowBox: {
      height: moderateScale(30),
      width: moderateScale(30),
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addressText1: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeSemiBold,
      // marginLeft: tokens.spacing.xs,
      marginBottom: tokens.spacing.xs,
    },
    dateText: {
      marginTop: tokens.spacing.md,
      marginBottom: 0,
      // marginBottom: tokens.spacing.xs,
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
    // addBox: {
    //   height: verticalScale(30),
    //   width: scale(70),
    //   backgroundColor: tokens.colors.primary,
    //   borderRadius: tokens.radius.xxl,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginLeft: tokens.spacing.sm,
    //   alignSelf: 'flex-end',
    // },
    addNewText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeSemiBold,
      marginRight: tokens.spacing.smPlus,
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
      // borderWidth: 1,
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

    //check box
    checkBoxContainer: {
      position: 'absolute',
      right: scale(20),
      top: verticalScale(40),
      alignItems: 'center',
      justifyContent: 'center',
      // padding: moderateScale(3),
      height: verticalScale(22),
      aspectRatio: 1,
      borderRadius: scale(4),
      // backgroundColor: '#b4b4b4',
      borderWidth: 1,
    },

    checkBox: {
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkBoxSelected: {
      backgroundColor: theme.tokens.colors.primary,
      borderColor: theme.tokens.colors.primary,
    },

    checkMark: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    checkIcon: {
      height: moderateScale(16),
      width: moderateScale(16),
    },
    selectedCheck: {
      backgroundColor: tokens.colors.green,
      borderWidth: 0,
    },
    submitBtn: {
      width: '60%',
      marginTop: tokens.spacing.lg,
      // marginBottom: tokens.spacing.md,
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

    dateInputBox: {
      height: verticalScale(45),
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: scale(8),
      paddingHorizontal: scale(12),
      justifyContent: 'center',
      // marginTop: tokens.spacing.sm
      backgroundColor: '#FFF',
    },

    datePlaceholder: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.InputText,
      fontFamily: Fonts.ManropeMedium,
    },
    nameError: {
      fontSize: moderateScale(11),
      color: tokens.colors.red,
      fontFamily: Fonts.ManropeBold,
    },
    contentStyle: {
      maxHeight: '90%',
    },
    cardBoxForLep: {
      width: '48.5%',
    },
    cardBoxForMob: {
      width: '100%',
    },
    cardBoxForMobTwo: {
      width: '49%',
    },
  });
};
