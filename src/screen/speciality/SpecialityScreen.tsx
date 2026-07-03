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
import { baseURL } from '../../component/api/axios';
import AppBackHandler from '../../component/backhandler/AppBackHandler';

const SpecialityScreen = () => {
  const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [speciality, setSpeciality] = useState([]);
  const navigation = useNavigation();
  const [imageError, setImageError] = useState({});

  const handleBack = useCallback(() => {
    navigation.navigate('HomeTab', { screen: 'Home' });
  }, [navigation]);

  const handleNavigate = (item) => {
    navigation.navigate('SpecialityDetails', {
      medicine_id: item?.ms_id,
      specialityName: item?.ms_name,
    });
  };

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

  const renderItem = ({ item, index }) => {
    const imageUrl = `${baseURL}/uploads/medicine/${item.ms_image}`;
    return (
      <Pressable style={styles.cart} onPress={() => handleNavigate(item)}>
        <View style={styles.categoryBox}>
          <Image
            source={
              item?.ms_image
                ? {
                    uri: imageUrl,
                  }
                : DUMMY_IMAGE
            }
            style={styles.categoryImg}
          />
        </View>
        <Text style={styles.titleText}>{item?.ms_name}</Text>
      </Pressable>
    );
  };

  const filteredData = useMemo(() => {
    if (!search?.trim()) {
      return speciality;
    }
    return speciality?.filter((item) =>
      item?.ms_name?.toLowerCase().includes(search?.toLocaleLowerCase())
    );
  }, [search, speciality]);

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
      scroll={!loading && true}
    >
      <Loader visible={loading} />
      <AppBackHandler screenName={'HomeTab'} nestedScreen="Home" />

      <SearchList
        value={search}
        onChange={setSearch}
        searchRowCustom={styles.searchTop}
      />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.ms_id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenLayout>
  );
};
export default SpecialityScreen;
