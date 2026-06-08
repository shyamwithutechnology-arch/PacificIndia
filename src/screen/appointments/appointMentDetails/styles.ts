import { StyleSheet } from 'react-native';
import { AppTheme } from '../../../hooks/useAppTheme';
import { Fonts } from '../../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, moderateScale, normalize } = theme;

  return StyleSheet.create({
    card: {
      backgroundColor: tokens.colors.white,
      borderRadius: moderateScale(12),
      padding: tokens.spacing.md,
      marginBottom: tokens.spacing.md,
      elevation: 2,
      borderWidth: 0.5,
      borderColor: '#e3e3e3',
      // shadowColor: '#707070',
    },

    sectionTitle: {
      fontSize: moderateScale(15),
      fontWeight: '700',
      color: tokens.colors.primary,
      marginBottom: tokens.spacing.xs,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: tokens.spacing.xxs,
      borderBottomWidth: 0.5,
      borderBottomColor: '#E5E5E5',
    },

    label: {
      flex: 1,
      color: '#666',
      fontFamily: Fonts.ManropeSemiBold,
      fontSize: tokens.fontSize.sm,
    },

    value: {
      textAlign: 'right',
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeBold,
      fontSize: tokens.fontSize.sm,
    },

    commentText: {
      color: '#666',
      lineHeight: 22,
      fontFamily: Fonts.ManropeMedium,
      fontSize: normalize(13),
    },
    innerContainer: {
      paddingTop: tokens.spacing.sm,
      backgroundColor: '#f6f9fb',
      // borderWidth: 1,
    },
  });
};
