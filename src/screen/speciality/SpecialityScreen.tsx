import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Loader, ScreenLayout } from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import AppHeader from '../../component/AppHeader/AppHeader';
import { Images } from '../../assets/images';
import { createStyles } from './styles';
import { SearchList } from '../../component/searchList/SearchList';
import { useNavigation } from '@react-navigation/native';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { showToast } from '../../utils/toast';

const SpecialityScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [speciality, setSpeciality] = useState([]);
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigate = () => {
    navigation.navigate('SpecialityStack', { screen: 'SpecialityDetails' });
  };

  const category = [
    { id: 1, title: 'Obstetrics & Gynaecology', img: Images.doctor },
    { id: 2, title: 'Orthopaedics', img: Images.doctor },
    { id: 3, title: 'General Physician', img: Images.apppointments },
    { id: 4, title: 'General & Laparoscopic Surgeon', img: Images.dailyVisit },
    { id: 5, title: 'Nephrology', img: Images.apppointments1 },
    { id: 6, title: 'Paediatrics', img: Images.apppointments1 },
    { id: 7, title: 'Ophthalmology', img: Images.apppointments1 },
    { id: 8, title: 'Diabetology', img: Images.apppointments1 },
    { id: 19, title: 'Endocrinology', img: Images.apppointments1 },
    { id: 20, title: 'Cardiology', img: Images.apppointments1 },
    { id: 21, title: 'Urology', img: Images.apppointments1 },
    {
      id: 22,
      title: 'Pulmonology/ Respiratory Medicine',
      img: Images.apppointments1,
    }, // Fixed duplicate ID from 20 to 22
  ];

  const banner = [
    { id: 1, image: Images.bannerImg },
    { id: 2, image: Images.bannerImg },
    { id: 3, image: Images.bannerImg },
    { id: 4, image: Images.bannerImg },
  ];

  const specialityList = async () => {
    try {
      setLoading(true);
      const response = await GET(ApiEndPoint.listSpeciality);
      if (response?.status === '1') {
        setSpeciality(response?.result || []);
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
      <Pressable style={styles.cart} onPress={handleNavigate}>
        <View style={styles.categoryBox}>
          <Image source={{ uri: item?.ms_image }} style={styles.categoryImg} />
        </View>
        <Text style={styles.titleText}>{item?.ms_name}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    specialityList();
  }, []);
  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Speciality"
          search={search}
          leftIcon={Icons.leftIcon}
          onPress={handleBack}
        />
      }
    >
      <Loader visible={loading} />
      <SearchList
        value={search}
        onChange={setSearch}
        searchRowCustom={styles.searchTop}
      />

      <FlatList
        data={speciality}
        renderItem={renderItem}
        keyExtractor={(item) => item.ms_id.toString()} // Good practice: Convert ID to a string
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenLayout>
  );
};

export default SpecialityScreen;
