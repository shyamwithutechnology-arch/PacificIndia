import React from 'react';
import {
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  Linking,
  ActivityIndicator,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { AppTheme, useAppTheme } from '../../hooks/useAppTheme';
import { Fonts } from '../../theme';

const HtmlView = ({
  htmlContent,
  isLoading = false,
  baseFontSize = 16,
  padding = 10,
  marginTop,
}) => {
  const { width } = useWindowDimensions();
  const { verticalScale, moderateScale, tokens, scale } = useAppTheme();
  const theme = useAppTheme();
  const styles = createStyles(theme);
  // Calculate content width with padding
  const contentWidth = width - moderateScale(padding) * 2;

  // Responsive font size
  const responsiveFontSize = moderateScale(baseFontSize);

  // Base styles
  const baseStyle = {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(baseFontSize * 1.5),
    color: '#414141',
    fontFamily: Platform.OS === 'ios' ? 'System' : Fonts.ManropeRegular,
  };

  // Simple tag styles
  const tagsStyles = {
    p: {
      ...baseStyle,
      marginBottom: moderateScale(12),
    },
    h1: {
      fontSize: moderateScale(baseFontSize * 2),
      fontWeight: 'bold',
      marginBottom: moderateScale(16),
      color: '#000',
    },
    h2: {
      fontSize: moderateScale(baseFontSize * 1.75),
      fontWeight: '600',
      fontFamily: Fonts.ManropeSemiBold,
      marginBottom: moderateScale(12),
      color: '#111',
    },
    h3: {
      fontSize: moderateScale(baseFontSize * 1.5),
      fontWeight: '600',
      fontFamily: Fonts.ManropeSemiBold,
      marginBottom: moderateScale(10),
      color: '#222',
    },
    strong: {
      fontWeight: 'bold',
      fontFamily: Fonts.ManropeBold,
    },
    em: {
      fontStyle: 'italic',
    },
    a: {
      color: '#007AFF',
      textDecorationLine: 'underline',
    },
    ul: {
      marginBottom: moderateScale(12),
      paddingLeft: moderateScale(20),
    },
    ol: {
      marginBottom: moderateScale(12),
      paddingLeft: moderateScale(20),
    },
    li: {
      marginBottom: moderateScale(6),
    },
  };

  if (isLoading) {
    return <ActivityIndicator size={'large'} color={'green'} />;
  }

  if (!htmlContent || htmlContent.trim() === '') {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#999', fontSize: moderateScale(14) }}>
          No content available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: moderateScale(padding),
        // borderWidth:1,
        marginTop: moderateScale(marginTop),
      }}
      showsVerticalScrollIndicator={true}
    >
      <RenderHtml
        contentWidth={contentWidth}
        source={{ html: htmlContent }}
        tagsStyles={tagsStyles}
        baseStyle={baseStyle}
        defaultTextProps={{ allowFontScaling: false }}
        onLinkPress={(event, href) => {
          Linking.openURL(href).catch((err) =>
            console.warn('Failed to open URL:', err)
          );
        }}
      />
    </ScrollView>
  );
};

export const createStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 200,
    },
  });
};

export default HtmlView;
