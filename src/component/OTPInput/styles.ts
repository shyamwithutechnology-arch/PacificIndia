import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, tokens, scale } = theme;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.lg,
      marginTop: tokens.spacing.md,
      marginHorizontal: tokens.spacing.xxl,
      // borderWidth: 1,
    },
    input: {
      width: '20%',
      aspectRatio: 1,
      borderRadius: tokens.radius.md,
      borderWidth: 1.5,
      textAlign: 'center',
      fontSize: tokens.fontSize.lg,
      color: tokens.colors.black,
      borderColor: '#BEBEBE', // white border
    },
    active: {
      borderColor: tokens.colors.primary, // cyan border (focused look)
    },
    filled: {
      borderColor: '#BEBEBE', // white border
    },
  });
};
