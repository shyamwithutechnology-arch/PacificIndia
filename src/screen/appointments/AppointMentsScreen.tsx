import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Loader, ScreenLayout, SearchList } from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import AppHeader from '../../component/AppHeader/AppHeader';
import { Images } from '../../assets/images';
import AddIcon from 'react-native-vector-icons/Ionicons';
import NextIcon from 'react-native-vector-icons/MaterialIcons';
import { localStorage, storageKeys } from '../../storage/storage';
import { POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { showToast } from '../../utils/toast';
import { formatDateDayMonthShortYear } from '../../utils/date';

const AppointMentsScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointmentList, setAppointmentList] = useState(false);

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const fetchAppointList = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.listAppointment, {
        member_id: id,
      });

      if (response?.status === '1') {
        setAppointmentList(response?.result);
      } else {
        showToast('error', 'Error', response?.msg || 'Faild Insert');
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
      <Pressable
        style={styles.cart}
        onPress={() =>
          navigation.navigate('AppointMentDetails', {
            apointMentId: item?.appointment_id,
          })
        }
      >
        <View style={styles.cartInner}>
          <Text style={styles.nameLebelText}>
            Doctor : <Text style={styles.nameText}>{item?.doctor_name}</Text>
          </Text>
          <Text style={styles.nameLebelText}>
            Hospital Name :{' '}
            <Text style={styles.nameText}>{item?.hospital_name}</Text>
          </Text>

          <Text style={styles.nameLebelText}>
            Doctor : <Text style={styles.nameText}>{item?.doctor_name}</Text>
          </Text>
          <Text style={styles.nameLebelText}>
            Scheduled :
            <Text style={styles.nameText}>
              {' '}
              {item?.appointment_date} {item?.appointment_time}
            </Text>
          </Text>
          <Text style={styles.nameLebelText}>
            Address :{' '}
            <Text style={styles.nameText}>{item?.hospital_address}</Text>
          </Text>
        </View>
        <NextIcon
          name="navigate-next"
          color={theme.tokens.colors.primary}
          size={theme.moderateScale(26)}
        />
      </Pressable>
    );
  };

  const filteredList = useMemo(() => {
    if (!seach.trim()) {
      return appointmentList;
    }

    return appointmentList?.filter((item) =>
      item?.doctor_name?.toLowerCase().includes(seach.toLocaleLowerCase())
    );
  }, [appointmentList, seach]);

  useEffect(() => {
    let getMemberId = async () => {
      let id = await localStorage.getItem(storageKeys.member_id);
      await fetchAppointList(id);
    };
    getMemberId();
  }, []);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Appointments"
          search={seach}
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
    >
      <Loader visible={loading} />
      <View style={styles.searchRow}>
        <SearchList
          value={seach}
          onChange={setSearch}
          searchRowCustom={styles.searchRowCustom}
        />

        <Pressable onPress={() => navigation.navigate('AddAppointMent')}>
          <AddIcon
            name="add-circle-sharp"
            color={theme.tokens.colors.primary}
            size={theme.moderateScale(40)}
          />
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

export default AppointMentsScreen;
