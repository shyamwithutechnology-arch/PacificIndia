// import React, { useState, useEffect } from 'react';
// import { View, StatusBar, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../../theme';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// // import SimpleHtmlView from "../../components/SimpleHtmlView";
// import HtmlView from '../../component/htmlview/HtmlView';
// import Loader from '../../component/loader/Loader'; // If you have a Loader component
// import { GET } from '../../api/request';
// import { ApiEndPoint } from '../../api/endPoints';
// import { showToast } from '../../utils/toast';
// import { Images } from '../../assets/images';
// import { styles } from './styles';

// const PrivacyPolicyScreen = () => {
//   const navigation = useNavigation();
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   console.log('content', content);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handlePrivacyRequest = async () => {
//     setLoading(true);
//     try {
//       const response = await GET(ApiEndPoint.privacyPolicy);
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
//     handlePrivacyRequest();
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.white }}>
//       {/* Loader */}
//       <Loader visible={loading} />

//       <StatusBar
//         backgroundColor={colors.lightThemeBlue}
//         barStyle="dark-content"
//       />

//       {/* Header Section */}
//       <View style={{ backgroundColor: colors.lightThemeBlue }}>
//         <SafeAreaView edges={['top']}>
//           <HeaderPaperModule
//             title="Privacy Policy"
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
//           marginTop={-30}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default PrivacyPolicyScreen;

import { View, Text } from 'react-native';
import React from 'react';

const PrivacyPolicyScreen = () => {
  return (
    <View>
      <Text>PrivacyPolicyScreen</Text>
    </View>
  );
};

export default PrivacyPolicyScreen;
