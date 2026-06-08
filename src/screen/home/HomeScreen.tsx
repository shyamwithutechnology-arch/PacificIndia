import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScreenLayout, Loader } from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import AppHeader from '../../component/AppHeader/AppHeader';
import { Images } from '../../assets/images';
import HomeBannerSlider from './component/homebanner/HomeBannerSlider';
import { showToast } from '../../utils/toast';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';

const HomeScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState([]);
  console.log('banner', banner);

  const category = [
    {
      id: 1,
      title: 'Specility',
      dec: 'Explore Our Wide Range of Speciality',
      img: Images.speciality,
      tab: 'SpecialityStack',
      screen: 'Speciality',
    },
    {
      id: 2,
      title: 'Doctors',
      dec: 'Explore Our Wide Range of Speciality',
      img: Images.doctor,
      screen: 'Doctorlist',
    },
    {
      id: 3,
      title: 'Appointments',
      dec: 'Explore Our Wide Range of Speciality',
      img: Images.apppointments,
      screen: 'AppointMents',
    },
    {
      id: 4,
      title: 'Daily Visit',
      dec: 'Explore Our Wide Range of Speciality',
      img: Images.dailyVisit,
      screen: 'DailyVisitStack',
    },
    {
      id: 5,
      title: 'Doctors',
      dec: 'Explore Our Wide Range of Speciality',
      img: Images.apppointments1,
      screen: 'Specility',
    },
    {
      id: 6,
      title: 'Appoitments',
      dec: 'Explore Our Wide Range of Speciality',
      img: Images.apppointments1,
      screen: 'Specility',
    },
  ];

  const bannerd = [
    { id: 1, image: Images.bannerImg },
    { id: 2, image: Images.bannerImg },
    { id: 3, image: Images.bannerImg },
    { id: 4, image: Images.bannerImg },
  ];

  const handleNavigate = (item) => {
    if (item?.tab) {
      navigation.navigate(item?.tab, { screen: item?.screen });
    } else {
      navigation.navigate(item?.screen);
    }
  };

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const res = await GET(ApiEndPoint.banner);
      if (res?.status === '1') {
        setBanner(res?.result);
      }
    } catch (error) {
      if (error?.offline) {
        return;
      }
      showToast(
        'error',
        'Error',
        error?.msg || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.cart} onPress={() => handleNavigate(item)}>
        <View style={styles.categoryBox}>
          <Image source={item?.img} style={styles.categoryImg} />
        </View>
        <Text style={styles.titleText}>{item?.title}</Text>
        <Text style={styles.titledDecText}>{item?.dec}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Pacific India"
          search={seach}
          leftIcon={Icons.drawerIcon}
          setSearch={setSearch}
          searchStatus={true}
          onPress={() => navigation.openDrawer()}
        />
      }
    >
      <Loader visible={loading} />
      <HomeBannerSlider banners={banner} />

      <Text
        style={styles.specialityText}
        onPress={() => navigation.navigate('Doctorlist')}
      >
        Healthcare Solutions
      </Text>
      <Text style={styles.specialityDecText}>
        Manage appointments, consult doctors, access reports, and get complete
        healthcare support in one place.
      </Text>

      <FlatList
        data={category}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;
