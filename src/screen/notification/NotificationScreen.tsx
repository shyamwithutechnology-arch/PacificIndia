import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScreenLayout } from '../../component/ScreenContainer/ScreenLayout';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import { AppHeader, Loader } from '../../component';
import { Icons } from '../../assets/icons';
import { showToast } from '../../utils/toast';
import { GET } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';

const NotificationScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.notificationBox}>
        <Text style={styles.notificationText}>{item?.nt_title}</Text>
        <View style={styles.baseLine} />
        <Text style={styles.notificationiDec}>{item?.nt_discription}</Text>
        <Text style={styles.notificationiDec}>{item?.nt_create}</Text>
      </Pressable>
    );
  };

  const stateListApi = async () => {
    try {
      setLoading(true);
      const res = await GET(ApiEndPoint.notificationList);
      if (res?.status === '1') {
        setNotificationList(res?.result);
        // Alert.alert('stateList', JSON.stringify(res?.result || []));
      }
    } catch (error) {
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    stateListApi();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Notification"
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
    >
      <Loader visible={loading} />
      <FlatList
        data={notificationList}
        renderItem={renderItem}
        contentContainerStyle={styles.containerContentStyle}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
};

export default NotificationScreen;

// import React from 'react';
// import { useWindowDimensions } from 'react-native';
// import { ImageZoom } from '@likashefqet/react-native-image-zoom';
// import FastImage from 'react-native-fast-image';

// const NotificationScreen = () => {
//   const { width, height } = useWindowDimensions();

//   return (
//     // <ImageZoom style={{ width, height }} minScale={1} maxScale={4}>
//     //   <FastImage
//     //     source={{
//     //       uri: 'https://picsum.photos/800/1200',
//     //     }}
//     //     style={{ width, height }}
//     //     resizeMode={FastImage.resizeMode.contain}
//     //   />
//     // </ImageZoom>
//     <ImageZoom
//       minScale={1}
//       maxScale={100}
//       doubleTapScale={2.5}
//       isDoubleTapEnabled
//       isPanEnabled
//       isPinchEnabled
//       style={{ flex: 1 }}
//       // style={{
//       //   width,
//       //   height,
//       // }}
//       // Pass the source directly here instead of nesting FastImage
//       source={{
//         uri: 'https://picsum.photos/800/1200',
//         priority: FastImage.priority.high,
//         cache: FastImage.cacheControl.immutable,
//       }}
//       resizeMode="contain"
//     />
//   );
// };

// export default NotificationScreen;
