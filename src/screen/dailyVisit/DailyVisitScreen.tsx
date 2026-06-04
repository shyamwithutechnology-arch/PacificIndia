import React, { useEffect, useMemo, useState } from 'react';
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
import { SearchList } from '../../component/searchList/SearchList';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { showToast } from '../../utils/toast';
import { localStorage, storageKeys } from '../../storage/storage';
import { baseURL } from '../../component/api/axios';

const DailyVisitScreen = () => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [dailyVisit, setDailyVisit] = useState([]);
  const [memberId, setMemberId] = useState([]);
  const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;

  const navigation = useNavigation();

  const handleNavigate = () => {
    // navigation.navigate('DoctorDetails');
  };

  const category = [
    {
      id: 1,
      name: 'Dr. Himani Sharma',
      date: '20-5-2026',
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
      date: '20-5-2026',
    },
    {
      id: 3,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg3,
      date: '20-5-2026',
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
      date: '20-5-2026',
    },
    {
      id: 6,
      name: 'Dr. Himani Sharma',
      dec: 'Gynecologist & obstetrician',
      location: 'Women & Heart Clinic, Malviya Nagar',
      img: Images.doctorImg3,
      date: '20-5-2026',
    },
  ];

  const specialityList = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.dailyVisit, {
        team_member_id: id,
      });
      if (response?.status === '1') {
        setDailyVisit(response?.result || []);
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
    // dailyr_comment
    return (
      <Pressable style={styles.cart} onPress={handleNavigate}>
        <Image
          source={{ uri: DUMMY_IMAGE }}
          style={styles.categoryImg}
          borderRadius={theme.tokens.radius.md}
        />
        <View style={styles.mainCardInner}>
          <Text style={styles.titleText}>{item?.dailyr_doctor_name}</Text>

          <View style={styles.mapRow}>
            <Image
              source={Icons.mapFillIcon}
              style={styles.verificationImg}
              resizeMode="contain"
              tintColor={'#adadad'}
            />
            <Text style={[styles.titleDecText, styles.locationText]}>
              {item?.dailyr_doctor_address}
            </Text>
          </View>

          <View style={styles.mapRow}>
            <View style={[styles.mapRow, styles.dateText]}>
              <Image
                source={Icons.dateIcon}
                style={styles.dateIcon}
                resizeMode="contain"
              />
              <Text style={[styles.titleDecText, styles.locationText]}>
                {item?.dailyr_date}
              </Text>
            </View>

            <View style={[styles.mapRow, styles.dateText]}>
              <Image
                source={Icons.clockIcon}
                style={styles.timeIcon}
                resizeMode="contain"
              />
              <Text style={[styles.titleDecText, styles.locationText]}>
                {'  '}
                {item?.dailyr_time}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const filteredList = useMemo(() => {
    if (!seach.trim()) {
      return dailyVisit;
    }

    return dailyVisit?.filter((item) =>
      item?.dailyr_doctor_name
        ?.toLowerCase()
        .includes(seach.toLocaleLowerCase())
    );
  }, [dailyVisit, seach]);

  // useEffect(() => {
  //   const getMemberId = async () => {
  //     const Id = await localStorage.getItem(storageKeys.member_id);

  //   };
  //   getMemberId();
  // }, []);
  useEffect(() => {
    const getId = async () => {
      const id = await localStorage.getItem(storageKeys.member_id);
      if (id) {
        specialityList(id);
        setMemberId(id);
      }
    };
    getId();
  }, []);
  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Daily Visit"
          search={seach}
          leftIcon={Icons.leftIcon}
          notificationPress={() => {}}
        />
      }
    >
      <Loader visible={loading} />
      <View style={styles.rowSerach}>
        <SearchList
          value={seach}
          onChange={setSearch}
          searchRowCustom={styles.searchTop}
          searchPlaceHolder={'Add Your New Visit....'}
        />
        <Pressable style={styles.addBox}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenLayout>
  );
};

export default DailyVisitScreen;
