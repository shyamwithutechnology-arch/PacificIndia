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
import { SearchList } from '../../component/searchList/SearchList';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';

const DoctorlistScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');

  // const handleNavigate = () => {
  //   navigation.navigate('SpecialityStack', { screen: 'SpecialityDetails' });
  // };
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('DoctorDetails');
  };

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

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.cart} onPress={handleNavigate}>
        <Image
          source={item?.img}
          style={styles.categoryImg}
          borderRadius={theme.tokens.radius.md}
        />
        <View style={styles.mainCardInner}>
          <View>
            <View style={styles.mapRow}>
              <Text style={styles.titleText}>{item?.name}</Text>
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
              {item?.dec}
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
                {item?.location}
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

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Specialityssssss"
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenLayout>
  );
};

export default DoctorlistScreen;
