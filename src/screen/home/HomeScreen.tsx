import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
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
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { width, height } = useWindowDimensions();
  const [seach, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState([]);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [listScrollEnabled, setListScrollEnabled] = useState(true);
  const backPressCount = useRef(0);

  const isLandscape = width > height;

  // Dynamic column calculation based on orientation and device
  const numColumns = useMemo(() => {
    if (theme.isTablet) {
      return isLandscape ? 4 : 4;
    }
    return isLandscape ? 2 : 2;
  }, [isLandscape, theme.isTablet]);

  const handleNephroLogist = () => {
    navigation.navigate('SpecialityStack', {
      screen: 'SpecialityDetails',
      params: {
        medicine_id: 21,
        specialityName: 'Nephrologist',
      },
    });
  };

  const reportNavigate = () => {
    navigation.navigate('Report');
  };
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
    // {
    //   id: 4,
    //   title: 'Daily Visit',
    //   dec: 'Explore Our Wide Range of Speciality',
    //   img: Images.dailyVisit,
    //   screen: 'DailyVisitStack',
    // },
    {
      id: 5,
      title: 'Report',
      dec: 'Explore Our Wide Range of Speciality',
      img: Icons.reportIcon,
      screen: 'Report',
    },
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

  const headerComponent = () => {
    return (
      <View>
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
      </View>
    );
  };

  const footerComponent = () => {
    return (
      <View style={styles.nefroBox}>
        <Text style={styles.nefroText}>Nephro </Text>
        <View style={styles.nefroContainer}>
          <Pressable style={styles.cart} onPress={handleNephroLogist}>
            <View style={styles.categoryBox}>
              <Image source={Icons.nephrologyIcon} style={styles.categoryImg} />
            </View>
            <Text style={styles.titleText}>Nephro</Text>
            <Text style={styles.titledDecText}>
              Explore Our Wide Range of Speciality
            </Text>
          </Pressable>
          {
            // <Pressable style={styles.cart} onPress={reportNavigate}>
            //   <View style={styles.categoryBox}>
            //     <Image source={Icons.reportIcon} style={styles.categoryImg} />
            //   </View>
            //   <Text style={styles.titleText}>Report</Text>
            //   <Text style={styles.titledDecText}>
            //     Explore Our Wide Range of Speciality
            //   </Text>
            // </Pressable>
          }
        </View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressCount.current === 0) {
          backPressCount.current = 1;

          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

          setTimeout(() => {
            backPressCount.current = 0;
          }, 2000);

          return true;
        }

        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  // Detect orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      if (window.width > window.height) {
        setOrientation('LANDSCAPE');
      } else {
        setOrientation('PORTRAIT');
      }
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Medwell Pacific"
          leftIcon={Icons.drawerIcon}
          onPress={() => navigation.openDrawer()}
        />
      }
    >
      <Loader visible={loading} />

      <FlatList
        key={`flatlist-${numColumns}-${orientation}`}
        data={category}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        scrollEnabled={true}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;

//  <View>
//       <Text style={styles.pacificText}>Pacific Medical & Diagnostics</Text>

//       <Text style={styles.pacificDecText}>
//         Pacific Medical & Diagnostics is an emerging integrated healthcare
//         service provider committed to delivering quality healthcare solutions
//         under one roof. With a team of experienced medical practitioners,
//         advanced diagnostic facilities, and modern laboratory services, we aim
//         to make healthcare more accessible, reliable, and patient-focused. Our
//         organization is built on a foundation of ethical medical practices,
//         professional excellence, and a strong commitment to patient
//         well-being.
//       </Text>

//       <Text style={[styles.pacificDecText, styles.secondParagrapText]}>
//         We combine expert medical consultations, diagnostic services, and
//         healthcare support through a technology-driven platform that enables
//         patients to conveniently access healthcare services. Our focus is on
//         providing accurate diagnoses, timely treatment guidance, medicine
//         management, and a seamless healthcare experience for individuals and
//         families.
//       </Text>
//     </View>
