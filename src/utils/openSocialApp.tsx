import { Linking, Platform } from 'react-native';

const openSocialApp = async (appUrl, playStore, appStore) => {
  try {
    // console.log('OPEN URL =>', appUrl);

    // For normal website links
    if (appUrl.startsWith('http://') || appUrl.startsWith('https://')) {
      await Linking.openURL(appUrl);
      return;
    }

    // For app schemes like fb:// whatsapp:// tg://
    const supported = await Linking.canOpenURL(appUrl);

    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      const storeUrl = Platform.OS === 'android' ? playStore : appStore;
      await Linking.openURL(storeUrl);
    }
  } catch (error) {
    console.log('Error opening social app:', error);
  }
};

export default openSocialApp;

// import { Linking, Platform } from 'react-native';

// const openSocialApp = async (
//   appUrl: string,
//   playStoreUrl: string,
//   appStoreUrl: string
// ) => {
//   try {
//     const supported = await Linking.canOpenURL(appUrl);

//     if (supported) {
//       await Linking.openURL(appUrl);
//     } else {
//       await Linking.openURL(
//         Platform.OS === 'android' ? playStoreUrl : appStoreUrl
//       );
//     }
//   } catch (error) {
//     console.log('Error:', error);
//   }
// };
// export default openSocialApp;
