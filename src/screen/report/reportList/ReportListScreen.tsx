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
import { Loader, ScreenLayout } from '../../../component';
import { Icons } from '../../../assets/icons';
import { useAppTheme } from '../../../hooks/useAppTheme';
import AppHeader from '../../../component/AppHeader/AppHeader';
import { createStyles } from './styles';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { showToast } from '../../../utils/toast';
import { localStorage, storageKeys } from '../../../storage/storage';
import AppBackHandler from '../../../component/backhandler/AppBackHandler';
import SeachIcon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReportListScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [loading, setLoading] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleExpand = (id: number) => {
    setSelectedReport((prev) => (prev === id ? null : id));
  };

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[styles.cart, numColumns > 1 && styles.cartBox]}
        onPress={() => handleExpand(item.trp_doctor_id)}
      >
        <View style={styles.innerRowBox}>
          <View style={styles.row}>
            <View>
              <Text style={styles.hqNameLabel}> Date </Text>
              <Text style={styles.hqNameLabel}>Place </Text>
            </View>
            <View>
              <Text style={styles.hqNameValue}>
                : {item?.trp_reporting_date},{' '}
                <Text style={styles.hqNameLabel}>
                  Work :{' '}
                  <Text style={styles.hqNameValue}>{item?.trp_work_type} </Text>
                </Text>
              </Text>
              <Text style={styles.hqNameValue}>
                : {item?.trp_town_name},{' '}
                <Text style={styles.hqNameValue}>
                  {item?.trp_city_name} ,{' '}
                  <Text style={styles.hqNameLabel}>
                    HQ :{' '}
                    <Text style={styles.hqNameValue}>{item?.trp_hq_name} </Text>
                  </Text>
                </Text>
              </Text>
            </View>
          </View>
          {
            // <View style={styles.spandIconBox}>
            //   <Ionicons
            //     name="paper-plane-outline"
            //     size={24}
            //     color={theme.tokens.colors.primary}
            //   />
            // </View>
          }
        </View>

        {selectedReport === item?.trp_doctor_id && (
          <View style={styles.contentBox}>
            <View style={styles.baseLine} />
            {
              // <View style={styles.row}>
              //   <Text style={styles.hqNameLabel}>Work Name</Text>
              //   <Text style={styles.hqNameValue}>
              //     {' '}
              //     : {item?.trp_place_work_name}
              //   </Text>
              // </View>
              // <View style={styles.baseLine} />
            }
            <View style={styles.row}>
              <Text style={styles.hqNameLabel}>WorkWidth</Text>
              <Text style={styles.hqNameValue}>
                {' '}
                : {item?.trp_work_with_name}
              </Text>
            </View>
            <View style={styles.baseLine} />
            <View style={styles.row}>
              <Text style={styles.hqNameLabel}>Doctor</Text>
              <Text style={[styles.hqNameValue, styles.doctorName]}>
                : {item?.trp_doctor_name}
              </Text>
            </View>
            <View style={styles.baseLine} />

            <View style={styles.row}>
              <Text style={styles.hqNameLabel}>Remark </Text>
              <Text style={styles.hqNameValue}> : {item?.trp_remark_area}</Text>
            </View>
            <View style={styles.baseLine} />
            <View style={styles.row}>
              <Text style={styles.hqNameLabel}>Comment </Text>
              <Text style={styles.hqNameValue}> : {item?.trp_comment}</Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  const fetchReportList = async (id: string) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.listReport, {
        team_id: id,
      });
      if (response?.status === '1') {
        setReportList(response?.result || []);
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
        fetchReportList(id);
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
          title="Report History"
          leftIcon={Icons.leftIcon}
          onPress={handleGoback}
        />
      }
    >
      <Loader visible={loading} />

      <FlatList
        key={`flatlist-${numColumns}-${orientation}`}
        data={reportList}
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

export default ReportListScreen;

// <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>HQ</Text>
//         <Text style={styles.hqNameValue}>{item?.trp_hq_name}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Work Type</Text>
//         <Text style={styles.hqNameValue}>{item?.trp_work_type}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Work Name</Text>
//         <Text style={styles.hqNameValue}>{item?.trp_work_with_name}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>City</Text>
//         <Text style={styles.hqNameValue}>{item?.trp_city_name}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Town Name</Text>
//         <Text style={styles.hqNameValue}>{item?.trp_town_name}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Doctor Name</Text>
//         <Text style={[styles.hqNameValue, styles.doctorName]}>
//           {item?.trp_doctor_name}
//         </Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Doctor Place Name</Text>
//         <Text style={styles.hqNameValue}>{item?.trp_place_work_name}</Text>
//       </View>
// <View style={styles.row}>
//   <Text style={styles.hqNameLabel}>Reporting Date </Text>
//   <Text style={styles.hqNameValue}>{item?.trp_reporting_date}</Text>
// </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Remark </Text>
//         <Text style={styles.hqNameValue}>{item?.trp_remark_area}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.hqNameLabel}>Comment </Text>
//         <Text style={styles.hqNameValue}>{item?.trp_comment}</Text>
//       </View>
