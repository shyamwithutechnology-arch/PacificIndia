import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E7F2F1',
    },

    header: {
      backgroundColor: '#1FAF9A',
      // padding: 20,
      // flexDirection: 'row',
      // alignItems: 'center',
      paddingTop: tokens.spacing.xxl,
      paddingBottom: tokens.spacing.md,
      paddingLeft: tokens.spacing.md,
    },

    avatar: {
      width: scale(60),
      aspectRatio: 1,
      borderRadius: tokens.spacing.xl,
      marginRight: tokens.spacing.smPlus,
      // marginTop: tokens.spacing.md,
    },

    headerInnerBox: {
      marginTop: tokens.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    name: {
      fontSize: tokens.fontSize.lg,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeMedium,
    },

    role: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.lightPrimary,
      fontFamily: Fonts.ManropeRegular,
    },

    closeBtn: {
      position: 'absolute',
      right: 15,
      top: tokens.spacing.xl,
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.xs,
    },

    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 0.5,
      borderColor: '#ddd',
    },

    menuLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    menuText: {
      marginLeft: 12,
      fontSize: 15,
      color: '#333',
    },

    logout: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 20,
    },

    logOutICon: {
      height: moderateScale(23),
      aspectRatio: 1,
    },

    logoutIcon: {
      backgroundColor: '#FF6B6B',
      padding: moderateScale(10),
      borderRadius: tokens.radius.xxl,
      marginRight: tokens.spacing.md,
    },

    logoutText: {
      fontSize: tokens.fontSize.md,
      color: '#272727',
      fontFamily: Fonts.ManropeBold,
    },

    helpCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: tokens.colors.white,
      margin: moderateScale(20),
      padding: moderateScale(15),
      borderRadius: tokens.radius.md,
      elevation: 3,
    },

    helpText: {
      marginLeft: tokens.spacing.smPlus,
      fontSize: tokens.fontSize.xs,
      color: tokens.colors.headingColor,
    },
  });
};
