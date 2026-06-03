import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { Fonts, fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { moderateScale, scale, tokens } = theme;
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },

    modalContainer: {
      backgroundColor: '#FFFFFF',
      padding: moderateScale(20),
      borderTopLeftRadius: tokens.radius.lg,
      borderTopRightRadius: tokens.radius.lg,
    },

    modalTitle: {
      fontSize: tokens.fontSize.md,
      fontFamily: Fonts.ManropeBold,
      color: '#111111',
      marginBottom: tokens.spacing.lg,
      textAlign: 'center',
    },

    button: {
      backgroundColor: tokens.colors.primary,
      paddingVertical: tokens.spacing.smPlus,
      borderRadius: scale(14),
      marginBottom: tokens.spacing.smPlus,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.white,
      fontFamily: Fonts.ManropeSemiBold,
    },
  });
};
