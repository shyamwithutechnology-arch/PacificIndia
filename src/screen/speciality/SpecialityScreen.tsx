import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScreenLayout } from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import AppHeader from '../../component/AppHeader/AppHeader';
import { Images } from '../../assets/images';
import { createStyles } from './styles';
import { SearchList } from '../../component/searchList/SearchList';
import { useNavigation } from '@react-navigation/native';

const SpecialityScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');

  // const handleNavigate = () => {
  //   navigation.navigate('SpecialityStack', { screen: 'SpecialityDetails' });
  // };
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('SpecialityStack', { screen: 'SpecialityDetails' });
  };

  const category = [
    {
      id: 1,
      title: 'Obstetrics & Gynaecology',
      img: Images.doctor,
    },
    {
      id: 2,
      title: 'Orthopaedics',
      img: Images.doctor,
    },
    {
      id: 3,
      title: 'General Physician',
      img: Images.apppointments,
    },
    {
      id: 4,
      title: 'General & Laparoscopic Surgeon',
      img: Images.dailyVisit,
    },
    {
      id: 5,
      title: 'Nephrology',
      img: Images.apppointments1,
    },
    {
      id: 6,
      title: 'Paediatrics',
      img: Images.apppointments1,
    },
    {
      id: 7,
      title: 'Ophthalmology',
      img: Images.apppointments1,
    },
    {
      id: 8,
      title: 'Diabetology',
      img: Images.apppointments1,
    },
    {
      id: 19,
      title: 'Endocrinology',
      img: Images.apppointments1,
    },
    {
      id: 20,
      title: 'Cardiology',
      img: Images.apppointments1,
    },
    {
      id: 21,
      title: 'Urology',
      img: Images.apppointments1,
    },
    {
      id: 20,
      title: 'Pulmonology/ Respiratory Medicine',
      img: Images.apppointments1,
    },
  ];

  const banner = [
    { id: 1, image: Images.bannerImg },
    { id: 2, image: Images.bannerImg },
    { id: 3, image: Images.bannerImg },
    { id: 4, image: Images.bannerImg },
  ];

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.cart} onPress={handleNavigate}>
        <View style={styles.categoryBox}>
          <Image source={item?.img} style={styles.categoryImg} />
        </View>
        <Text style={styles.titleText}>{item?.title}</Text>
      </Pressable>
    );
  };
  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Speciality"
          search={seach}
          leftIcon={Icons.leftIcon}
        />
      }
    >
      <SearchList
        value={seach}
        onChange={setSearch}
        searchRowCustom={styles.searchTop}
      />

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

export default SpecialityScreen;
