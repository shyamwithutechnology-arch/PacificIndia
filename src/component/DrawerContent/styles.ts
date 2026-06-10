import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, tokens, moderateScale, normalize, insets } =
    theme;
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
      right: scale(18),
      top: tokens.spacing.xxl,
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.xxl,
      height: moderateScale(25),
      width: moderateScale(25),
      alignItems: 'center',
      justifyContent: 'center',
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
      backgroundColor: '#D5302A',
      padding: moderateScale(10),
      borderRadius: tokens.radius.xxl,
      marginRight: tokens.spacing.md,
    },

    logoutText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
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

    //
    mainBoxSupport: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: tokens.spacing.lg,
      backgroundColor: 'rgba(0, 147, 211, 0.12)',
      paddingLeft: tokens.spacing.md,
      paddingBottom: insets.bottom + tokens.spacing.xs,
      paddingTop: tokens.spacing.xxs,
      bottom: 0,
      right: 0,
      left: 0,
    },
    earPhoneBox: {
      width: scale(60),
      aspectRatio: 1,
      borderRadius: tokens.radius.xl,
      backgroundColor: tokens.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      marginRight: tokens.spacing.md,
    },
    earPhone: {
      width: scale(40),
      aspectRatio: 1,
    },
    helpLineTest: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.lightBlack,
      fontFamily: Fonts.ManropeMedium,
    },
    supportNuber: {
      fontSize: normalize(20),
      color: tokens.colors.headingColor,
      fontFamily: Fonts.ManropeBold,
    },
    verticalLine: {
      height: verticalScale(30),
      width: scale(1),
      backgroundColor: 'rgba(12, 64, 111, 0.24)',
      marginHorizontal: tokens.spacing.sm,
    },
    drawerIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
    },
  });
};
