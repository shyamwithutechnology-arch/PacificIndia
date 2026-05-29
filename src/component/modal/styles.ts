import { StyleSheet } from 'react-native';
import { AppTheme } from '../../hooks/useAppTheme';

export const createStyles = (theme: AppTheme) => {
  const { tokens, scale, verticalScale, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '92%',
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.lg,
      padding: moderateScale(16),
      elevation: 5, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
  });
};
