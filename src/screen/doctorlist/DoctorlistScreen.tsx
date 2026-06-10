import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Loader, ScreenLayout } from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import AppHeader from '../../component/AppHeader/AppHeader';
import { Images } from '../../assets/images';
import { SearchList } from '../../component/searchList/SearchList';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { showToast } from '../../utils/toast';
import { localStorage, storageKeys } from '../../storage/storage';
import AppBackHandler from '../../component/backhandler/AppBackHandler';

const DoctorlistScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // const handleNavigate = () => {
  //   navigation.navigate('SpecialityStack', { screen: 'SpecialityDetails' });
  // };

  const handleNavigate = (id) => {
    navigation.navigate('DoctorDetails', { dr_id: id });
  };

  const filteredList = useMemo(() => {
    if (!seach.trim()) {
      return doctorList;
    }
    return doctorList?.filter((item) =>
      item?.dr_name?.toLowerCase().includes(seach.toLocaleLowerCase())
    );
  }, [doctorList, seach]);

  const category = [
    {
      id: 1,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg1,
    },
    {
      id: 2,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Cocoon Hospital, Jagatpura / Malviya Nagar',
      img: Images.doctorImg2,
    },
    {
      id: 3,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg3,
    },
    {
      id: 4,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Cocoon Hospital, Jagatpura / Malviya Nagar',
      img: Images.doctorImg1,
    },
    {
      id: 5,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Cocoon Hospital, Jagatpura / Malviya Nagar',
      img: Images.doctorImg2,
    },
    {
      id: 6,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg3,
    },
  ];

  const banner = [
    { id: 1, image: Images.bannerImg },
    { id: 2, image: Images.bannerImg },
    { id: 3, image: Images.bannerImg },
    { id: 4, image: Images.bannerImg },
  ];

  const handleGoback = useCallback(() => {
    navigation.navigate('HomeTab', 'Home');
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[styles.cart, numColumns > 1 && styles.cartBox]}
        onPress={() => handleNavigate(item?.dr_id)}
      >
        <Image
          source={{ uri: item?.dr_image }}
          style={styles.categoryImg}
          borderRadius={theme.tokens.radius.md}
        />
        <View style={styles.mainCardInner}>
          <View>
            <View style={styles.mapRow}>
              <Text style={styles.titleText}>{item?.dr_name}</Text>
              <View style={styles.verificationBox}>
                <Image
                  source={Icons.verificationIcon}
                  style={styles.verificationImg}
                  resizeMode="contain"
                />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>

            <Text style={[styles.titleDecText, styles.decLength]}>
              {item?.dr_speciality_name}
            </Text>
          </View>

          <View style={[styles.mapRow, styles.doctorImgRow]}>
            <View style={styles.mapRow}>
              <Image
                source={Icons.mapIcon}
                style={styles.verificationImg}
                resizeMode="contain"
              />
              <Text style={[styles.titleDecText, styles.locationText]}>
                {item?.dr_address}
              </Text>
            </View>

            <View style={styles.rightArrowBox}>
              <Image
                source={Icons.rightVerticalArrow}
                resizeMode="contain"
                style={styles.rightArrowImg}
              />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const fetchDoctorList = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.listDoctor, {
        member_id: id,
      });
      if (response?.status === '1') {
        setDoctorList(response?.result || []);
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

  useEffect(() => {
    const getId = async () => {
      const id = await localStorage.getItem(storageKeys.member_id);
      if (id) {
        fetchDoctorList(id);
      }
    };
    getId();
  }, []);

  // Dynamic column calculation based on orientation and device
  const numColumns = useMemo(() => {
    if (theme.isTablet) {
      return isLandscape ? 3 : 1;
    }
    return isLandscape ? 2 : 1;
  }, [isLandscape, theme.isTablet]);

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

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Doctors List"
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
    >
      <AppBackHandler screenName="HomeTab" nestedScreen="HomeScreen" />
      <View style={styles.rowSerach}>
        <SearchList
          value={seach}
          onChange={setSearch}
          searchRowCustom={styles.searchTop}
          searchPlaceHolder={'Search Doctor....'}
        />

        <Pressable
          style={styles.addBox}
          onPress={() => navigation.navigate('AddDoctor')}
        >
          <Image
            source={Icons.addIcon}
            style={styles.addIcon}
            resizeMode="contain"
          />
          <Text style={styles.addText}> Add</Text>
        </Pressable>
      </View>
      <Loader visible={loading} />
      <FlatList
        key={`flatlist-${numColumns}-${orientation}`}
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={
          numColumns > 1 ? styles.columnWrapperStyle : undefined
        }
        numColumns={numColumns}
      />
    </ScreenLayout>
  );
};

export default DoctorlistScreen;
