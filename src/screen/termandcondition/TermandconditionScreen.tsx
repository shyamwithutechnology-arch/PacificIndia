// import React, { useState, useEffect } from 'react';
// import { View, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../../theme';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import HtmlView from '../../component/htmlview/HtmlView';
// import Loader from '../../component/loader/Loader';
// import { GET } from '../../api/request';
// import { ApiEndPoint } from '../../api/endPoints';
// import { showToast } from '../../utils/toast';
// import { styles } from './styles';

// const TermandconditionScreen = () => {
//   const navigation = useNavigation();
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleTermAndCondition = async () => {
//     setLoading(true);
//     try {
//       const response = await GET(ApiEndPoint.termCondition);
//       if (response?.status === '1' || 200) {
//         setContent(response?.result[0]?.page_description);
//       }
//     } catch (error: any) {
//       if (error?.offline) {
//         return;
//       }
//       const errorMessage =
//         error?.response?.data?.message ||
//         error?.message ||
//         'Something went wrong. Please try again.';
//       showToast('error', 'Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleTermAndCondition();
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.white }}>
//       {/* Loader */}
//       <Loader visible={loading} />

//       <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />

//       {/* Header Section */}
//       <View style={{ backgroundColor: colors.primary }}>
//         <SafeAreaView edges={['top']}>
//           <HeaderPaperModule
//             title="Terms & Conditions"
//             leftIconPress={handleBack}
//           />
//         </SafeAreaView>
//       </View>

//       {/* Content Section */}
//       <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
//         <HtmlView
//           htmlContent={content}
//           isLoading={loading}
//           baseFontSize={16}
//           padding={16}
//           logoStyle={styles.logo}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default TermandconditionScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { AppHeader, ScreenLayout } from '../../component';
import { AppTheme, useAppTheme } from '../../hooks/useAppTheme';
import { Icons } from '../../assets/icons';

const TermandconditionScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <ScreenLayout
      innerContainer={styles.container}
      paddingHorizontalStyle={0}
      header={
        <AppHeader
          title={'Terms and condition'}
          leftIcon={Icons.leftIcon}
          onPress={() => navigation.goBack()}
        />
      }
    >
      <WebView
        source={{
          uri: 'https://thepacificindia.com/terms-condition',
        }}
        startInLoadingState={true}
      />
    </ScreenLayout>
  );
};

export default TermandconditionScreen;

export const createStyles = (theme: AppTheme) => {
  const { verticalScale, moderateScale, scale, tokens } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: tokens.spacing.sm,
    },
  });
};
