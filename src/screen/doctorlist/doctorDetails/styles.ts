import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    card: {
      backgroundColor: tokens.colors.white,
      elevation: 10,
      shadowColor: '#E8E8E8',
      borderColor: '#DEDEDE',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.smPlus,
      marginBottom: tokens.spacing.mdPlus,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeExtraBold,
      marginBottom: tokens.spacing.xs,
      width: scale(150),
    },
    titleDecText: {
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.primary,
      fontFamily: Fonts.ManropeMedium,
      marginTop: tokens.spacing.xxs,
    },
    idText: {
      color: '#999999',
      fontSize: normalize(8),
    },
    docImg: {
      height: moderateScale(55),
      width: moderateScale(55),
      marginRight: tokens.spacing.smPlus,
    },
    editText: {
      fontSize: tokens.fontSize.xs,
      fontFamily: Fonts.ManropeMedium,
      color: tokens.colors.primary,
    },
    editBtn: {
      backgroundColor: 'rgba(0, 147, 211, 0.08)',
      borderRadius: tokens.radius.sm,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0, 147, 211, 0.19)',
    },
    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    baseLine: {
      height: verticalScale(1),
      backgroundColor: tokens.colors.gray,
      width: '100%',
    },
    emailcon: {
      height: moderateScale(24),
      width: moderateScale(24),
    },
    emilBox: {
      height: moderateScale(40),
      width: moderateScale(40),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 147, 211, 0.19)',
      borderRadius: tokens.spacing.lg,
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
