import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { tokens } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.white,
    },
    flex: {
      flex: 1,
    },
  });
};
