import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { AppTheme, useAppTheme } from '../../src/hooks/useAppTheme';
import { Fonts } from '../../src/theme';

const NoDataFound = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.noDataText}>No Data Found</Text>
    </View>
  );
};

export default NoDataFound;

const createStyles = (theme: AppTheme) => {
  const { tokens, scale, moderateScale } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    noDataText: {
      fontSize: tokens.fontSize.md,
      color: tokens.colors.black,
      fontFamily: Fonts.ManropeMedium,
    },
  });
};
