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
      paddingBottom: insets.bottom + tokens.spacing.xxl,
      paddingTop: tokens.spacing.md,
      marginHorizontal: tokens.spacing.md,
    },
    headerContainer: {
      paddingTop: tokens.spacing.sm,
      paddingBottom: verticalScale(60),
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: tokens.radius.md,
      padding: tokens.spacing.md,
      elevation: 3,
      shadowColor: '#9c9a9a',
      shadowOpacity: 0.08,
      shadowRadius: 5,
      marginHorizontal: tokens.spacing.md,
      flex: 1,
      marginTop: -verticalScale(25),
      marginBottom: verticalScale(10),
    },

    reportText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeRegular,
    },

    label: {
      fontSize: normalize(13.5),
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeSemiBold,
    },
    value: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeSemiBold,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    commentBox: {
      borderWidth: 0.5,
      borderColor: tokens.colors.primary,
      borderRadius: tokens.radius.md,
      marginTop: tokens.spacing.xs,
      marginBottom: tokens.spacing.xs,
    },
    remarkInputBox: {
      height: verticalScale(60),
    },
    required: {
      color: 'red',
    },
    commentInput: {
      height: verticalScale(100),
      textAlignVertical: 'top',
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      paddingHorizontal: tokens.spacing.sm,
      lineHeight: moderateScale(20),
    },
    remarkInput: {
      marginTop: tokens.spacing.xs,
      marginBottom: tokens.spacing.md,
    },
    nameBox: {
      width: '60%',
      backgroundColor: '#E5F6FF',
      borderWidth: 1,
      borderColor: '#D9D9D9',
    },
    inputBgColor: {
      backgroundColor: '#E5F6FF',
      borderWidth: 1,
      borderColor: '#D9D9D9',
    },
    mcrRow: {
      marginTop: tokens.spacing.md,
    },
    dropDown: {
      borderWidth: 0.5,
      borderColor: tokens.colors.primary,
      borderRadius: tokens.radius.sm,
      marginTop: tokens.spacing.xsPlus,
    },
    hqDropDown: {
      marginBottom: verticalScale(14),
    },
    hqDoctorDropDown: {
      marginBottom: verticalScale(14),
      height: verticalScale(46),
    },
    placeholderTextStyle: {
      fontSize: tokens.fontSize.xs,
      color: theme.tokens.colors.InputText,
      fontFamily: Fonts.ManropeMedium,
    },
    submitReportBtn: {
      width: '80%',
      marginTop: tokens.spacing.mdPlus,
      marginBottom: tokens.spacing.sm,
    },
    heanderBox: {
      backgroundColor: '#0093D3',
      height: verticalScale(100),
    },
    Contentcontainer: {
      flexGrow: 1,
      paddingBottom: 0, // or a small value like 10
    },
    commentText: {
      marginTop: tokens.spacing.smPlus,
    },
    selectDate: {
      fontSize: normalize(13),
      color: tokens.colors.InputText,
      fontFamily: Fonts.ManropeRegular,
    },
    dateSelectBox: {
      paddingVertical: tokens.spacing.sm,
      borderWidth: 0.5,
      borderRadius: tokens.radius.sm,
      paddingHorizontal: tokens.spacing.sm,
      borderColor: tokens.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: tokens.spacing.xs,
    },
    dateIcon: {
      height: moderateScale(23),
      width: moderateScale(23),
    },
    textStyle: {
      fontSize: tokens.fontSize.smPlus,
    },

    // for tab
    formRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfField: {
      width: '48%',
      // borderWidth: 1,
    },
    nameField: {
      width: '60%',
      // borderWidth: 1,
    },
    empCodeField: {
      width: '36%',
      // borderWidth: 1,
    },
    //error
    errorText: {
      color: 'red',
      fontSize: tokens.fontSize.xs,
      marginTop: tokens.spacing.xxs,
      marginBottom: verticalScale(14),
      // marginLeft: tokens.spacing.lg,
    },
    hqRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
