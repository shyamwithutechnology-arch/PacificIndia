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

    card: {
      backgroundColor: '#fff',
      borderRadius: tokens.radius.md,
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
      elevation: 3,
      shadowColor: '#9c9a9a',
      shadowOpacity: 0.08,
      shadowRadius: 5,
      marginHorizontal: tokens.spacing.md,
    },

    reportText: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeRegular,
    },

    label: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeRegular,
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
    commentInput: {
      height: verticalScale(100),
      textAlignVertical: 'top',
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.black,
      paddingHorizontal: tokens.spacing.sm,
    },
    remarkInput: {
      marginTop: tokens.spacing.xs,
      marginBottom: tokens.spacing.md,
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
      marginBottom: tokens.spacing.smPlus,
    },
    placeholderTextStyle: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.lightGray,
      fontFamily: Fonts.ManropeMedium,
    },
    submitReportBtn: {
      width: '60%',
    },
    heanderBox: {
      backgroundColor: '#0093D3',
      height: verticalScale(100),
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
