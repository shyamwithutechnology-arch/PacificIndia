import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, scale, moderateScale, tokens } = theme;
  return StyleSheet.create({
    container: {
      paddingVertical: tokens.spacing.smPlus,
      borderBottomRightRadius: tokens.spacing.smPlus,
      borderBottomLeftRadius: tokens.spacing.smPlus,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.md,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: tokens.fontSize.lg,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeBold,
      marginLeft: tokens.spacing.md,
    },
    rightIcon: {
      height: moderateScale(15),
      width: moderateScale(15),
    },
    rightIconBox: {
      height: verticalScale(35),
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#000',
      borderRadius: tokens.spacing.xxl,
      backgroundColor: tokens.colors.white,
      elevation: 5,
      shadowColor: tokens.colors.white,
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 16,
      height: verticalScale(15),
      borderRadius: tokens.radius.md,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: tokens.spacing.xxs,
    },

    badgeText: {
      fontSize: tokens.fontSize.xxs,
      fontFamily: Fonts.ManropeBold,
      color: tokens.colors.white,
    },
    customRightIcon: {
      width: moderateScale(18),
      height: moderateScale(18),
    },
    drawerIcon: {
      width: moderateScale(15),
      height: moderateScale(15),
    },
    customRightIconBox: {
      borderColor: tokens.colors.black,
      padding: scale(7),
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.lg,
    },
    notificaiton: {
      marginRight: tokens.spacing.sm,
    },
    notificationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    customStyle: {
      marginHorizontal: tokens.spacing.md,
    },
  });
};
