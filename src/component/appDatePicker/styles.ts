import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';
import { fonts } from '../../theme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, moderateScale, verticalScale } = theme;

  return StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.md,
    },

    label: {
      fontSize: tokens.fontSize.sm,
      color: tokens.colors.headingColor,
      fontFamily: fonts.UrbanistMedium,
      marginBottom: tokens.spacing.xs,
    },

    inputBox: {
      height: verticalScale(48),
      borderWidth: 1,
      borderColor: tokens.colors.borderColor || '#E0E0E0',
      borderRadius: tokens.radius.md,
      paddingHorizontal: tokens.spacing.md,
      justifyContent: 'center',
      backgroundColor: tokens.colors.white,
    },

    valueText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.headingColor,
      fontFamily: fonts.UrbanistMedium,
    },

    placeholderText: {
      color: tokens.colors.placeHolderColor || '#999',
    },

    disabled: {
      backgroundColor: '#F5F5F5',
      opacity: 0.6,
    },

    errorBorder: {
      borderColor: 'red',
    },

    errorText: {
      marginTop: 4,
      fontSize: tokens.fontSize.xs,
      color: 'red',
      fontFamily: fonts.UrbanistMedium,
    },

    /* ---------------- IOS MODAL ---------------- */

    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },

    modalContent: {
      backgroundColor: tokens.colors.white,
      borderTopLeftRadius: tokens.radius.lg,
      borderTopRightRadius: tokens.radius.lg,
      paddingBottom: tokens.spacing.lg,
    },

    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },

    cancelText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.secondaryDark,
      fontFamily: fonts.UrbanistMedium,
    },

    confirmText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.primary,
      fontFamily: fonts.UrbanistBold,
    },

    iosPicker: {
      marginTop: 10,
    },
  });
};
