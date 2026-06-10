// import React from 'react';
// import { ScreenLayout } from '../../component/ScreenContainer/ScreenLayout';
// import AppHeader from '../../component/AppHeader/AppHeader';
// import HtmlView from '../../component/htmlview/HtmlView';

// const PrivacyPolicyScreen = ({ navigation }) => {
//   const content = `We value the trust you place in caresathome.com. That’s why we insist upon the highest standards for customer information privacy and transactions.
// We at CaresAtHome Health Management Private Limited (hereinafter mentioned as “CaresAtHome”) are committed to protect our customers’ personal information and/or sensitive personal data and strive to maintain the privacy of your personal information.

// For your information, “Personal information” is any information that can be used by itself to uniquely identify, contact, or locate a person, or can be used with information available from other sources to uniquely identify an individual. For the purpose of this policy, sensitive personal data or information, such as medical history have been considered as a part of personal information.
// CaresAtHome does collect your personal information for a variety of regulatory and business purposes. These include, but are not limited to:
// Verify your identity
// Complete transactions effectively and bill for products and services availed
// Respond to your request for service or assistance
// Perform market analysis, market research, business and operational analysis
// Provide, maintain and improve our products and services
// Anticipate and resolve issues and concerns with our products and services
// Promote and market our products and services which we consider may be of interest to you and may benefit you; and
// Ensure adherence to legal and regulatory requirements for prevention and detection of frauds and crimes.
// CaresAtHome’s Privacy Policy is designed and developed to address the privacy and security of your personal information provided to us. This Privacy Policy describes the personal information which we may collect and provides our approach towards handling or dealing with the same.`;

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <ScreenLayout paddingHorizontalStyle={0}>
//       <AppHeader title="Privacy Policy" onPress={handleBack} />
//       <HtmlView
//         htmlContent={content}
//         isLoading={false}
//         baseFontSize={16}
//         padding={16}
//         marginTop={0}
//       />
//     </ScreenLayout>
//   );
// };

// export default PrivacyPolicyScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { AppHeader, ScreenLayout } from '../../component';
import { AppTheme, useAppTheme } from '../../hooks/useAppTheme';
import { Icons } from '../../assets/icons';

const PrivacyPolicyScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <ScreenLayout
      innerContainer={styles.container}
      paddingHorizontalStyle={0}
      header={
        <AppHeader
          title={'Privacy Policy'}
          leftIcon={Icons.leftIcon}
          onPress={() => navigation.goBack()}
        />
      }
    >
      <WebView
        source={{
          uri: 'https://thepacificindia.com/privacy-policy',
        }}
        startInLoadingState={true}
      />
    </ScreenLayout>
  );
};

export default PrivacyPolicyScreen;

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, moderateScale, scale, tokens } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: tokens.spacing.sm,
    },
  });
};
