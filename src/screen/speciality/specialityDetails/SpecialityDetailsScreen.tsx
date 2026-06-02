// import React, { useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   Image,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import { createStyles } from './styles';
// import { Images } from '../../../assets/images';
// import { ScreenLayout, SearchList, AppModal } from '../../../component';
// import AppHeader from '../../../component/AppHeader/AppHeader';
// import { useAppTheme } from '../../../hooks/useAppTheme';
// import { Icons } from '../../../assets/icons';
// import { Modal } from 'react-native/types_generated/index';

// const SpecialityDetailsScreen = ({ navigation }) => {
//   const theme = useAppTheme();
//   const styles = createStyles(theme);
//   const [seach, setSearch] = useState('');
//   const [selected, setSelected] = useState('all');
//   const [visible, setVisible] = useState(false);
//   const [img, setImg] = useState('');

//   const category = [
//     {
//       id: 1,
//       title: 'Obstetrics & Gynaecology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 2,
//       title: 'Orthopaedics',
//       img: Images.madicinImg,
//     },
//     {
//       id: 3,
//       title: 'General Physician',
//       img: Images.madicinImg,
//     },
//     {
//       id: 4,
//       title: 'General & Laparoscopic Surgeon',
//       img: Images.madicinImg,
//     },
//     {
//       id: 5,
//       title: 'Nephrology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 6,
//       title: 'Paediatrics',
//       img: Images.madicinImg,
//     },
//     {
//       id: 7,
//       title: 'Ophthalmology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 8,
//       title: 'Diabetology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 19,
//       title: 'Endocrinology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 20,
//       title: 'Cardiology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 21,
//       title: 'Urology',
//       img: Images.madicinImg,
//     },
//     {
//       id: 20,
//       title: 'Pulmonology/ Respiratory Medicine',
//       img: Images.madicinImg,
//     },
//   ];

//   const specialityData = [
//     { id: 'all', title: 'All' },
//     { id: 'ortho', title: 'Ortho' },
//     { id: 'gynae', title: 'Gynaec' },
//     { id: 'paid', title: 'Paid' },
//     { id: 'general', title: 'General Physician' },
//   ];
//   const banner = [
//     { id: 1, image: Images.madicinImg },
//     { id: 2, image: Images.madicinImg },
//     { id: 3, image: Images.madicinImg },
//     { id: 4, image: Images.madicinImg },
//   ];

//   const handleClose = () => {
//     setVisible(false);
//   };
//   const handleSetImg = async (img) => {
//     setImg(img);
//     await handleOpenModal();
//   };

//   const handleOpenModal = () => {
//     setVisible(true);
//   };
//   const handerItemRender = ({ item }) => {
//     const isSelected = selected === item?.id;
//     return (
//       <Pressable
//         onPress={() => setSelected(item?.id)}
//         style={[styles.headerItemBox, isSelected && styles.headerSelectBox]}
//       >
//         <Text
//           style={[
//             styles.headerTitleText,
//             isSelected && styles.headerSelectTitle,
//           ]}
//         >
//           {item?.title}
//         </Text>
//       </Pressable>
//     );
//   };
//   // <View style={styles.categoryBox}>
//   // </View>
//   const renderItem = ({ item }) => {
//     return (
//       <Pressable style={styles.cart} onPress={() => handleSetImg(item?.img)}>
//         <Image source={item?.img} style={styles.categoryImg} />
//       </Pressable>
//     );
//   };
//   return (
//     <ScreenLayout
//       header={
//         <AppHeader
//           title="Speciality Detail"
//           search={seach}
//           leftIcon={Icons.leftIcon}
//         />
//       }
//     >
//       <SearchList
//         value={seach}
//         onChange={setSearch}
//         searchRowCustom={styles.searchTop}
//       />

//       <View>
//         <FlatList
//           horizontal
//           data={specialityData}
//           keyExtractor={(item) => item}
//           showsHorizontalScrollIndicator={false}
//           horizontal
//           contentContainerStyle={styles.headerListContainer}
//           renderItem={handerItemRender}
//         />

// <FlatList
//   data={category}
//   renderItem={renderItem}
//   keyExtractor={(item) => item.id}
//   numColumns={3}
//   columnWrapperStyle={styles.row}
//   showsVerticalScrollIndicator={false}
//   contentContainerStyle={styles.listContainer}
// />
//       </View>
//     </ScreenLayout>
//   );
// };

// // <AppModal
// //   visible={visible}
// //   onClose={handleClose}
// //   contentStyle={styles.modalContainer}
// // >
// //   <View style={styles.imgBox}>
// //     <Image source={img} style={styles.madicinImg} resizeMode="contain" />
// //   </View>

// //   <Pressable style={styles.cancelBox} onPress={handleClose}>
// //     <Image source={Icons.cancleIcon} style={styles.cancleIcon} />
// //   </Pressable>
// // </AppModal>
// export default SpecialityDetailsScreen;

import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';

import ImageView from 'react-native-image-viewing';

import { createStyles } from './styles';
import { Images } from '../../../assets/images';
import { Loader, ScreenLayout, SearchList } from '../../../component';
import AppHeader from '../../../component/AppHeader/AppHeader';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Icons } from '../../../assets/icons';
import { showToast } from '../../../utils/toast';
import { ApiEndPoint } from '../../../api/endPoints';
import { POST_FORM } from '../../../api/request';

const SpecialityDetailsScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const route = useRoute();
  const { medicine_id } = route?.params || {};
  const numColumns = theme.isTablet ? 3 : 2;
  const [search, setSearch] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [specialityDetailsList, setSpecialityDetailsList] = useState([]);

  const category = [
    {
      id: 1,
      title: '1',
      img: Images.bannerImg,
    },
    {
      id: 2,
      title: '2',
      img: Images.madicinImg,
    },
    {
      id: 3,
      title: '3',
      img: Images.madicinImg,
    },
    {
      id: 4,
      title: '4',
      img: Images.madicinImg,
    },
    {
      id: 5,
      title: '5',
      img: Images.madicinImg,
    },
  ];

  // image select / unselect
  const handleSelect = (item) => {
    const exists = selectedImages.some((image) => image.id === item.id);

    if (exists) {
      setSelectedImages((prev) => prev.filter((image) => image.id !== item.id));
    } else {
      setSelectedImages((prev) => [...prev, item]);
    }
  };

  const handleOpenPreview = (item) => {
    const isSelected = selectedImages.some((image) => image.id === item.id);

    const imagesToPreview = isSelected
      ? selectedImages
      : category.filter(
          (image) =>
            !selectedImages.some((selected) => selected.id === image.id)
        );

    const imageIndex = imagesToPreview.findIndex(
      (image) => image.id === item.id
    );

    setPreviewImages(
      imagesToPreview.map((image) => ({
        uri: Image.resolveAssetSource(image.img).uri,
      }))
    );

    setCurrentIndex(imageIndex);
    setVisible(true);
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedImages.some((image) => image.id === item.id);

    return (
      <Pressable
        style={[styles.cart, isSelected && styles.selectedBorder]}
        onPress={() => handleOpenPreview(item, index)}
      >
        <Image
          source={item.img}
          style={styles.categoryImg}
          resizeMode="cover"
        />

        {/* check icon */}
        <Pressable
          style={[styles.checkIconBox, isSelected && styles.selectedBox]}
          onPress={() => handleSelect(item)}
        >
          <Image source={Icons.checkIcon} style={styles.checkIcon} />
        </Pressable>

        <Text style={styles.itemNumberText}>{item.title}</Text>
      </Pressable>
    );
  };

  const medicineBySpecilityId = async (id) => {
    try {
      setLoading(true);
      const params = {
        ms_id: id,
      };
      const response = await POST_FORM(
        ApiEndPoint.medicineBySpecilityId,
        params
      );
      if (response?.status === '1') {
        setSpecialityDetailsList(response?.result || []);
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
    let get_id = async (medicine_id) => {
      medicineBySpecilityId(medicine_id);
    };
    get_id(medicine_id);
  }, [medicine_id]);
  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Speciality Detail"
          leftIcon={Icons.leftIcon}
          onPress={() => navigation.goBack()}
        />
      }
      paddingHorizontal={0}
      innerContainer={styles.innerContainer}
    >
      <Loader visible={loading} />

      <SearchList value={search} onChange={setSearch} />

      <FlatList
        data={category}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />

      <ImageView
        images={previewImages}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled
        presentationStyle="fullScreen"
        backgroundColor="#000000EE"
        renderImage={({ source }) => (
          <Image source={source} style={styles.fullPreviewImage} />
        )}
        HeaderComponent={({ imageIndex }) => (
          <>
            <View style={styles.previewHeader}>
              <Text style={styles.previewCountText}>
                {imageIndex + 1}/{previewImages.length}
              </Text>
            </View>

            <Pressable
              onPress={() => setVisible(false)}
              style={styles.previewCloseBox}
            >
              <Image source={Icons.leftIcon} style={styles.previewCloseIcon} />
            </Pressable>
          </>
        )}
      />
    </ScreenLayout>
  );
};

export default SpecialityDetailsScreen;
