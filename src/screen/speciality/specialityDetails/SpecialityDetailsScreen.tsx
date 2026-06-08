// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   Image,
//   Pressable,
//   Text,
//   useWindowDimensions,
//   View,
// } from 'react-native';
// import ImageView from 'react-native-image-viewing';
// import { useRoute } from '@react-navigation/native';
// import { createStyles } from './styles';
// import { Images } from '../../../assets/images';
// import { Loader, ScreenLayout, SearchList } from '../../../component';
// import AppHeader from '../../../component/AppHeader/AppHeader';
// import { useAppTheme } from '../../../hooks/useAppTheme';
// import { Icons } from '../../../assets/icons';
// import { showToast } from '../../../utils/toast';
// import { ApiEndPoint } from '../../../api/endPoints';
// import { POST_FORM } from '../../../api/request';
// import { baseURL } from '../../../component/api/axios';

// const SpecialityDetailsScreen = ({ navigation }) => {
//   const theme = useAppTheme();
//   const styles = createStyles(theme);
//   const route = useRoute();
//   const { medicine_id } = route?.params || {};
//   const { width, height } = useWindowDimensions();
//   const isLandscape = width > height;
//   const numColumns = theme.isTablet
//     ? isLandscape
//       ? 5
//       : 3
//     : isLandscape
//     ? 4
//     : 2;
//   const [search, setSearch] = useState('');
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [specialityDetailsList, setSpecialityDetailsList] = useState([]);
//   const [imageError, setImageError] = useState({});
//   const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;
//   const cardWidth =
//     (width - theme.tokens.spacing.lg * (numColumns + 1)) / numColumns;
//   const category = [
//     {
//       id: 1,
//       title: '1',
//       img: Images.bannerImg,
//     },
//     {
//       id: 2,
//       title: '2',
//       img: Images.madicinImg,
//     },
//     {
//       id: 3,
//       title: '3',
//       img: Images.madicinImg,
//     },
//     {
//       id: 4,
//       title: '4',
//       img: Images.madicinImg,
//     },
//     {
//       id: 5,
//       title: '5',
//       img: Images.madicinImg,
//     },
//   ];

//   // image select / unselect
// const handleSelect = (item) => {
//   const exists = selectedImages.some((image) => image.ms_id === item.ms_id);

//   if (exists) {
//     setSelectedImages((prev) =>
//       prev.filter((image) => image.ms_id !== item.ms_id)
//     );
//   } else {
//     setSelectedImages((prev) => [...prev, item]);
//   }
// };

//   const handleOpenPreview = (item) => {
//     const isSelected = selectedImages.some(
//       (image) => image.mssub_id === item.mssub_id
//     );

//     const imagesToPreview = isSelected
//       ? selectedImages
//       : specialityDetailsList.filter(
//           (image) =>
//             !selectedImages.some(
//               (selected) => selected.mssub_id === image.mssub_id
//             )
//         );

//     const imageIndex = imagesToPreview.findIndex(
//       (image) => image.mssub_id === item.mssub_id
//     );

//     setPreviewImages(
//       imagesToPreview.map((image) => ({
//         uri: image?.mssub_image
//           ? `${baseURL}/uploads/medicine/${image.mssub_image}`
//           : DUMMY_IMAGE,
//       }))
//     );

//     setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
//     setVisible(true);
//   };

//   const renderItem = ({ item, index }) => {
//     const isSelected = selectedImages.some(
//       (image) => image.mssub_id === item.mssub_id
//     );
//     const imageUrl = item?.mssub_image
//       ? `${baseURL}/uploads/medicine/${item.mssub_image}`
//       : DUMMY_IMAGE;

//     return (
//       <Pressable
//         style={[
//           styles.cart,
//           { width: cardWidth },
//           isSelected && styles.selectedBorder,
//         ]}
//         onPress={() => handleOpenPreview(item, index)}
//       >
//         <Image
//           source={{
//             uri: imageError[item.mssub_id] ? DUMMY_IMAGE : imageUrl,
//           }}
//           style={styles.categoryImg}
//           resizeMode="cover"
//           onError={() => {
//             setImageError((prev) => ({
//               ...prev,
//               [item.mssub_id]: true,
//             }));
//           }}
//         />

//         {/* check icon */}
//         <Pressable
//           style={[styles.checkIconBox, isSelected && styles.selectedBox]}
//           onPress={() => handleSelect(item)}
//         >
//           <Image source={Icons.checkIcon} style={styles.checkIcon} />
//         </Pressable>

//         <Text style={styles.itemNumberText}>{item.title}</Text>
//       </Pressable>
//     );
//   };

//   const medicineBySpecilityId = async (id) => {
//     try {
//       setLoading(true);
//       const params = {
//         ms_id: id,
//       };
//       const response = await POST_FORM(
//         ApiEndPoint.medicineBySpecilityId,
//         params
//       );
//       if (response?.status === '1') {
//         setSpecialityDetailsList(response?.result || []);
//       }
//     } catch (error) {
//       if (error?.offline) {
//         return;
//       }
//       showToast(
//         'error',
//         'Error',
//         error?.msg || 'Something went wrong. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let get_id = async (medicine_id) => {
//       await medicineBySpecilityId(medicine_id);
//     };
//     get_id(medicine_id);
//   }, [medicine_id]);

//   return (
//     <ScreenLayout
//       header={
//         <AppHeader
//           title="Speciality Detail"
//           leftIcon={Icons.leftIcon}
//           onPress={() => navigation.goBack()}
//         />
//       }
//       paddingHorizontal={0}
//       innerContainer={styles.innerContainer}
//     >
//       <Loader visible={loading} />

//       <SearchList value={search} onChange={setSearch} />

//       <FlatList
//         key={`${width}-${height}`}
//         data={specialityDetailsList}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.ms_id.toString()}
//         numColumns={numColumns}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={styles.listContainer}
//         showVerticalScrollIndicator={false}
//       />

//       <ImageView
//         images={previewImages}
//         imageIndex={currentIndex}
//         visible={visible}
//         onRequestClose={() => setVisible(false)}
//         swipeToCloseEnabled
//         presentationStyle="fullScreen"
//         backgroundColor="#000000EE"
//         renderImage={({ source }) => (
//           <Image source={source} style={styles.fullPreviewImage} />
//         )}
//         HeaderComponent={({ imageIndex }) => (
//           <>
//             <View style={styles.previewHeader}>
//               <Text style={styles.previewCountText}>
//                 {imageIndex + 1}/{previewImages.length}
//               </Text>
//             </View>

//             <Pressable
//               onPress={() => setVisible(false)}
//               style={styles.previewCloseBox}
//             >
//               <Image source={Icons.leftIcon} style={styles.previewCloseIcon} />
//             </Pressable>
//           </>
//         )}
//       />
//     </ScreenLayout>
//   );
// };

// export default SpecialityDetailsScreen;

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  Dimensions,
  StatusBar,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useRoute } from '@react-navigation/native';
import { createStyles } from './styles';
import { Images } from '../../../assets/images';
import { Loader, ScreenLayout, SearchList } from '../../../component';
import AppHeader from '../../../component/AppHeader/AppHeader';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Icons } from '../../../assets/icons';
import { showToast } from '../../../utils/toast';
import { ApiEndPoint } from '../../../api/endPoints';
import { GET, POST_FORM } from '../../../api/request';
import { baseURL } from '../../../component/api/axios';

const SpecialityDetailsScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const route = useRoute();
  const { medicine_id, specialityName } = route?.params || {};

  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [controlsVisible, setControlsVisible] = useState(true);
  const [selected, setSelected] = useState(medicine_id || '');
  const controlsTimeoutRef = useRef(null);

  const [search, setSearch] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [specialityDetailsList, setSpecialityDetailsList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [imageError, setImageError] = useState({});
  const [previewMode, setPreviewMode] = useState('all'); // 'selected' or 'unselected'

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

  const isLandscape = width > height;

  // Dynamic column calculation based on orientation and device
  const numColumns = useMemo(() => {
    if (theme.isTablet) {
      return isLandscape ? 4 : 3;
    }
    return isLandscape ? 3 : 2;
  }, [isLandscape, theme.isTablet]);

  const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;

  const specialityData = [
    { id: 'all', title: 'All' },
    { id: 'ortho', title: 'Ortho' },
    { id: 'gynae', title: 'Gynaec' },
    { id: 'paid', title: 'Paid' },
    { id: 'general', title: 'General Physician' },
  ];

  const handleIdByList = useCallback(
    (id) => {
      setSelected(id);
      medicineBySpecilityId(id);
    },
    [speciality]
  );

  // Dynamic card width calculation
  const cardWidth = useMemo(() => {
    const spacing = theme.tokens.spacing.md;
    const totalSpacing = spacing * (numColumns + 1);
    return (width - totalSpacing) / numColumns;
  }, [width, numColumns, theme.tokens.spacing.md]);

  // Handle image selection
  const handleSelect = useCallback((item) => {
    setSelectedImages((prev) => {
      const exists = prev.some((image) => image.mssub_id === item.mssub_id);
      if (exists) {
        return prev.filter((image) => image.mssub_id !== item.mssub_id);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  // Auto-hide controls after 3 seconds
  const handleControlsAutoHide = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }, []);

  const toggleControls = useCallback(() => {
    setControlsVisible((prev) => !prev);
    if (!controlsVisible) {
      handleControlsAutoHide();
    }
  }, [controlsVisible, handleControlsAutoHide]);

  // Handle preview opening based on selection state
  const handleOpenPreview = useCallback(
    (item) => {
      let imagesToPreview = [];
      let imageIndex = 0;
      const isItemSelected = selectedImages.some(
        (image) => image.mssub_id === item.mssub_id
      );

      if (isItemSelected) {
        // Pressed on SELECTED image -> Show ONLY selected images
        setPreviewMode('selected');
        imagesToPreview = selectedImages;
        imageIndex = selectedImages.findIndex(
          (image) => image.mssub_id === item.mssub_id
        );

        if (imagesToPreview.length === 0) {
          showToast('info', 'Info', 'No selected images to preview');
          return;
        }
      } else {
        // Pressed on UNSELECTED image -> Show ONLY unselected images
        setPreviewMode('unselected');
        imagesToPreview = specialityDetailsList.filter(
          (image) =>
            !selectedImages.some(
              (selected) => selected.mssub_id === image.mssub_id
            )
        );
        imageIndex = imagesToPreview.findIndex(
          (image) => image.mssub_id === item.mssub_id
        );

        if (imagesToPreview.length === 0) {
          showToast('info', 'Info', 'No unselected images to preview');
          return;
        }
      }

      setPreviewImages(
        imagesToPreview.map((image) => ({
          uri: image?.mssub_image
            ? `${baseURL}/uploads/medicine/${image.mssub_image}`
            : DUMMY_IMAGE,
          title: image?.title || '',
          id: image?.mssub_id,
        }))
      );

      setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
      setVisible(true);
      setControlsVisible(true);
      handleControlsAutoHide();
    },
    [specialityDetailsList, selectedImages, DUMMY_IMAGE, handleControlsAutoHide]
  );

  // Custom header for image viewer
  const ImageViewerHeader = useCallback(
    ({ imageIndex }) => {
      if (!controlsVisible) return null;

      return (
        <>
          <View
            style={[
              styles.previewHeader,
              isLandscape && styles.landscapePreviewHeader,
            ]}
          >
            <Text style={styles.previewCountText}>
              {imageIndex + 1}/{previewImages.length}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              setVisible(false);
              if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
              }
            }}
            style={[
              styles.previewCloseBox,
              isLandscape && styles.landscapePreviewCloseBox,
            ]}
          >
            <Image
              source={Icons.closeIcon || Icons.leftIcon}
              style={styles.previewCloseIcon}
            />
          </Pressable>
        </>
      );
    },
    [
      controlsVisible,
      previewImages.length,
      previewMode,
      selectedImages.length,
      specialityDetailsList.length,
      isLandscape,
      styles,
    ]
  );

  // Custom footer for image viewer
  const ImageViewerFooter = useCallback(
    ({ imageIndex }) => {
      if (!controlsVisible) return null;

      const item = previewImages[imageIndex];
      if (!item?.title) return null;

      return (
        <View
          style={[
            styles.previewFooter,
            isLandscape && styles.landscapePreviewFooter,
          ]}
        >
          <Text style={styles.previewFooterText}>{item.title}</Text>
        </View>
      );
    },
    [controlsVisible, previewImages, isLandscape, styles]
  );

  // Render individual item
  const renderItem = useCallback(
    ({ item, index }) => {
      const isSelected = selectedImages.some(
        (image) => image.mssub_id === item.mssub_id
      );
      const imageUrl = item?.mssub_image
        ? `${baseURL}/uploads/medicine/${item.mssub_image}`
        : DUMMY_IMAGE;

      return (
        <Pressable
          style={[
            styles.cart,
            { width: cardWidth },
            isSelected && styles.selectedBorder,
          ]}
          onPress={() => handleOpenPreview(item, index)}
        >
          <Image
            source={{
              uri: imageError[item.mssub_id] ? DUMMY_IMAGE : imageUrl,
            }}
            style={[
              styles.categoryImg,
              { width: cardWidth * 0.8, height: cardWidth * 0.8 },
            ]}
            resizeMode="cover"
            onError={() => {
              setImageError((prev) => ({
                ...prev,
                [item.mssub_id]: true,
              }));
            }}
          />

          {/* Check icon */}
          <View style={[styles.checkBoxBg, isSelected && styles.selectedCheck]}>
            <Pressable
              style={[styles.checkIconBox, isSelected && styles.selectedBox]}
              onPress={() => handleSelect(item)}
            >
              <Image source={Icons.checkIcon} style={styles.checkIcon} />
            </Pressable>
          </View>

          <View style={styles.itemBox}>
            <Text style={styles.itemNumberText} numberOfLines={1}>
              {item.title || `Item ${index + 1}`}
            </Text>
          </View>
        </Pressable>
      );
    },
    [
      cardWidth,
      selectedImages,
      imageError,
      DUMMY_IMAGE,
      handleOpenPreview,
      handleSelect,
      styles,
    ]
  );

  // Fetch medicine data
  const medicineBySpecilityId = useCallback(async (id) => {
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
      } else {
        setSpecialityDetailsList([]);
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
  }, []);

  const handerItemRender = ({ item }) => {
    const isSelected = selected === item?.ms_id;
    return (
      <Pressable
        onPress={() => handleIdByList(item?.ms_id)}
        style={[styles.headerItemBox, isSelected && styles.headerSelectBox]}
      >
        <Text
          style={[
            styles.headerTitleText,
            isSelected && styles.headerSelectTitle,
          ]}
        >
          {item?.ms_name}
        </Text>
      </Pressable>
    );
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

  useEffect(() => {
    if (medicine_id) {
      medicineBySpecilityId(medicine_id);
    }
  }, [medicine_id, medicineBySpecilityId]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search.trim()) return specialityDetailsList;
    return specialityDetailsList.filter((item) =>
      item.mssub_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, specialityDetailsList]);

  // Key extractor
  const keyExtractor = useCallback(
    (item) => item.ms_id?.toString() || item.mssub_id?.toString(),
    []
  );

  useEffect(() => {
    specialityList();
  }, []);
  return (
    <ScreenLayout
      header={
        <AppHeader
          title={`${specialityName}  Detail`}
          leftIcon={Icons.leftIcon}
          onPress={() => navigation.goBack()}
        />
      }
      paddingHorizontal={0}
      innerContainer={styles.innerContainer}
    >
      <Loader visible={loading} />

      <FlatList
        key={`flatlist-${numColumns}-${orientation}`}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={() => (
          <FlatList
            horizontal
            data={speciality}
            keyExtractor={(item) => item?.ms_id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.headerListContainer}
            renderItem={handerItemRender}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />

      {/* Custom Full-Screen Image Viewer */}
      <Modal
        visible={visible}
        transparent={false}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => {
          setVisible(false);
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
        }}
      >
        <StatusBar hidden={true} />
        <View style={styles.modalFullScreen}>
          <View style={styles.imageContainer}>
            <ImageViewerHeader imageIndex={currentIndex} />

            <FlatList
              data={previewImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={currentIndex}
              getItemLayout={(data, index) => ({
                length: Dimensions.get('window').width,
                offset: Dimensions.get('window').width * index,
                index,
              })}
              onScroll={(event) => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x /
                    Dimensions.get('window').width
                );
                if (newIndex !== currentIndex) {
                  setCurrentIndex(newIndex);
                  setControlsVisible(true);
                  handleControlsAutoHide();
                }
              }}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={toggleControls}>
                  <View style={styles.fullScreenImageWrapper}>
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.fullScreenImage}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <ImageViewerFooter imageIndex={currentIndex} />
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
};

export default SpecialityDetailsScreen;
