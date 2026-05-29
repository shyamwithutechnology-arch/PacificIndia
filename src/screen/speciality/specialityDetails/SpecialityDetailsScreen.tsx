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
import { createStyles } from './styles';
import { Images } from '../../../assets/images';
import { ScreenLayout, SearchList, AppModal } from '../../../component';
import AppHeader from '../../../component/AppHeader/AppHeader';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Icons } from '../../../assets/icons';
import { Modal } from 'react-native/types_generated/index';

const SpecialityDetailsScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');
  const [selected, setSelected] = useState('all');
  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState('');

  const category = [
    {
      id: 1,
      title: 'Obstetrics & Gynaecology',
      img: Images.madicinImg,
    },
    {
      id: 2,
      title: 'Orthopaedics',
      img: Images.madicinImg,
    },
    {
      id: 3,
      title: 'General Physician',
      img: Images.madicinImg,
    },
    {
      id: 4,
      title: 'General & Laparoscopic Surgeon',
      img: Images.madicinImg,
    },
    {
      id: 5,
      title: 'Nephrology',
      img: Images.madicinImg,
    },
    {
      id: 6,
      title: 'Paediatrics',
      img: Images.madicinImg,
    },
    {
      id: 7,
      title: 'Ophthalmology',
      img: Images.madicinImg,
    },
    {
      id: 8,
      title: 'Diabetology',
      img: Images.madicinImg,
    },
    {
      id: 19,
      title: 'Endocrinology',
      img: Images.madicinImg,
    },
    {
      id: 20,
      title: 'Cardiology',
      img: Images.madicinImg,
    },
    {
      id: 21,
      title: 'Urology',
      img: Images.madicinImg,
    },
    {
      id: 20,
      title: 'Pulmonology/ Respiratory Medicine',
      img: Images.madicinImg,
    },
  ];

  const specialityData = [
    { id: 'all', title: 'All' },
    { id: 'ortho', title: 'Ortho' },
    { id: 'gynae', title: 'Gynaec' },
    { id: 'paid', title: 'Paid' },
    { id: 'general', title: 'General Physician' },
  ];
  const banner = [
    { id: 1, image: Images.madicinImg },
    { id: 2, image: Images.madicinImg },
    { id: 3, image: Images.madicinImg },
    { id: 4, image: Images.madicinImg },
  ];

  const handleClose = () => {
    setVisible(false);
  };
  const handleSetImg = async (img) => {
    setImg(img);
    await handleOpenModal();
  };

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handerItemRender = ({ item }) => {
    const isSelected = selected === item?.id;
    return (
      <Pressable
        onPress={() => setSelected(item?.id)}
        style={[styles.headerItemBox, isSelected && styles.headerSelectBox]}
      >
        <Text
          style={[
            styles.headerTitleText,
            isSelected && styles.headerSelectTitle,
          ]}
        >
          {item?.title}
        </Text>
      </Pressable>
    );
  };
  // <View style={styles.categoryBox}>
  // </View>
  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.cart} onPress={() => handleSetImg(item?.img)}>
        <Image source={item?.img} style={styles.categoryImg} />
      </Pressable>
    );
  };
  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Speciality Detail"
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

      <View>
        <FlatList
          horizontal
          data={specialityData}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.headerListContainer}
          renderItem={handerItemRender}
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
      </View>

      <AppModal
        visible={visible}
        onClose={handleClose}
        contentStyle={styles.modalContainer}
      >
        <View style={styles.imgBox}>
          <Image source={img} style={styles.madicinImg} resizeMode="contain" />
        </View>

        <Pressable style={styles.cancelBox} onPress={handleClose}>
          <Image source={Icons.cancleIcon} style={styles.cancleIcon} />
        </Pressable>
      </AppModal>
    </ScreenLayout>
  );
};

export default SpecialityDetailsScreen;
