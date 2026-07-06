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
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useRoute } from '@react-navigation/native';
import { createStyles } from './styles';
import { Loader, ScreenLayout } from '../../../component';
import AppHeader from '../../../component/AppHeader/AppHeader';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Icons } from '../../../assets/icons';
import { showToast } from '../../../utils/toast';
import { ApiEndPoint } from '../../../api/endPoints';
import { GET, POST_FORM } from '../../../api/request';
import { baseURL } from '../../../component/api/axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

const SpecialityDetailsScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const route = useRoute();
  const headerFlatListRef = useRef<FlatList>(null);
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
  const [previewMode, setPreviewMode] = useState('all');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    if (specialityDetailsList.length > 0) {
      const allUrls = specialityDetailsList.map((image) => ({
        uri: image?.mssub_image
          ? `${baseURL}/uploads/medicine/${image.mssub_image}`
          : `${baseURL}/uploads/doctor/consultant-physician126.png`,
      }));
      // Preload everything quietly in background memory
      FastImage.preload(allUrls);
    }
  }, [specialityDetailsList]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'LANDSCAPE' : 'PORTRAIT');
    });
    return () => subscription?.remove();
  }, []);

  const isLandscape = width > height;

  const numColumns = useMemo(() => {
    if (theme.isTablet) return isLandscape ? 4 : 3;
    return isLandscape ? 3 : 2;
  }, [isLandscape, theme.isTablet]);

  const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;

  const handleIdByList = useCallback((id) => {
    setSelected(id);
    medicineBySpecilityId(id);
  }, []);

  const cardWidth = useMemo(() => {
    const spacing = theme.tokens.spacing.md;
    const totalSpacing = spacing * (numColumns + 1);
    return (width - totalSpacing) / numColumns;
  }, [width, numColumns, theme.tokens.spacing.md]);

  const handleSelect = useCallback((item) => {
    setSelectedImages((prev) => {
      const exists = prev.some((image) => image.mssub_id === item.mssub_id);
      if (exists)
        return prev.filter((image) => image.mssub_id !== item.mssub_id);
      return [...prev, item];
    });
  }, []);

  const handleControlsAutoHide = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(
      () => setControlsVisible(false),
      3000
    );
  }, []);

  // Aggressive Early Image Parser for Immediate Load
  const handleOpenPreview = useCallback(
    (item) => {
      let imagesToPreview = [];
      let imageIndex = 0;
      const isItemSelected = selectedImages.some(
        (image) => image.mssub_id === item.mssub_id
      );

      if (isItemSelected) {
        setPreviewMode('selected');
        imagesToPreview = selectedImages;
        imageIndex = selectedImages.findIndex(
          (image) => image.mssub_id === item.mssub_id
        );
      } else {
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
      }

      if (imagesToPreview.length === 0) return;

      const mappedImages = imagesToPreview.map((image) => ({
        uri: image?.mssub_image
          ? `${baseURL}/uploads/medicine/${image.mssub_image}`
          : DUMMY_IMAGE,
        title: image?.title || '',
        id: image?.mssub_id,
      }));

      // Preload the specific selected target image explicitly right before opening modal
      if (mappedImages[imageIndex]) {
        FastImage.preload([{ uri: mappedImages[imageIndex].uri }]);
      }

      setPreviewImages(mappedImages);
      setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
      setVisible(true);
      setControlsVisible(true);
      handleControlsAutoHide();
    },
    [specialityDetailsList, selectedImages, DUMMY_IMAGE, handleControlsAutoHide]
  );

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
              if (controlsTimeoutRef.current)
                clearTimeout(controlsTimeoutRef.current);
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
    [controlsVisible, previewImages.length, isLandscape, styles]
  );

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
          <FastImage
            style={[
              styles.categoryImg,
              { width: cardWidth * 0.8, height: cardWidth * 0.8 },
            ]}
            source={{
              uri: imageUrl,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
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
      DUMMY_IMAGE,
      handleOpenPreview,
      handleSelect,
      styles,
    ]
  );

  const medicineBySpecilityId = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await POST_FORM(ApiEndPoint.medicineBySpecilityId, {
        ms_id: id,
      });
      if (response?.status === '1')
        setSpecialityDetailsList(response?.result || []);
      else setSpecialityDetailsList([]);
    } catch (error) {
      if (error?.offline) return;
      showToast('error', 'Error', error?.msg || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handerItemRender = useCallback(
    ({ item }) => {
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
    },
    [selected, handleIdByList, styles]
  );

  const specialityList = async () => {
    try {
      setLoading(true);
      const response = await GET(ApiEndPoint.listSpeciality);
      if (response?.status === '1') setSpeciality(response?.result || []);
    } catch (error) {
      if (error?.offline) return;
      showToast('error', 'Error', error?.msg || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (medicine_id) medicineBySpecilityId(medicine_id);
  }, [medicine_id, medicineBySpecilityId]);

  const filteredData = useMemo(() => {
    if (!search.trim()) return specialityDetailsList;
    return specialityDetailsList.filter((item) =>
      item.mssub_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, specialityDetailsList]);

  const keyExtractor = useCallback(
    (item) => item.ms_id?.toString() || item.mssub_id?.toString(),
    []
  );

  useEffect(() => {
    specialityList();
  }, []);

  // Optimized Scroll calculation handler
  const onMomentumScrollEnd = useCallback(
    (event) => {
      const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setControlsVisible(true);
        handleControlsAutoHide();
        setIsZoomed(false);
      }
    },
    [currentIndex, width, handleControlsAutoHide]
  );

  const sortedSpeciality = useMemo(() => {
    if (!selected) return speciality;

    const selectedIndex = speciality?.findIndex(
      (item) => item.ms_id === selected
    );

    if (selectedIndex === -1) return speciality;

    return [
      ...speciality.slice(selectedIndex),
      ...speciality.slice(0, selectedIndex),
    ];
  }, [speciality, selected]);

  return (
    <ScreenLayout
      header={
        <AppHeader
          title={`${specialityName}`}
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
            data={sortedSpeciality}
            keyExtractor={(item) => item?.ms_id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.headerListContainer}
            renderItem={handerItemRender}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

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

        <GestureHandlerRootView
          style={{
            width,
            height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000', // Matches image background to reduce flash contrast
          }}
        >
          <View style={styles.modalFullScreen}>
            <View style={styles.imageContainer}>
              <ImageViewerHeader imageIndex={currentIndex} />

              <FlatList
                data={previewImages}
                horizontal
                pagingEnabled
                scrollEnabled={!isZoomed}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={currentIndex}
                getItemLayout={(_, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
                onMomentumScrollEnd={onMomentumScrollEnd}
                // Performance tuning for ultra-smooth swiping
                initialNumToRender={6}
                maxToRenderPerBatch={4}
                windowSize={5}
                removeClippedSubviews={true}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width,
                        height,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#000',
                      }}
                    >
                      <ImageZoom
                        minScale={1}
                        maxScale={2}
                        doubleTapScale={1.5}
                        isDoubleTapEnabled
                        isPanEnabled
                        isPinchEnabled
                        onScaleChange={(scale) => {
                          setIsZoomed(scale > 1.01);
                        }}
                        onResetAnimationEnd={() => {
                          setIsZoomed(false);
                        }}
                        style={{
                          width: width,
                          height: height,
                        }}
                        source={{ uri: item.uri }}
                        resizeMode="contain"
                        renderImage={(props) => (
                          <FastImage
                            {...props}
                            style={[
                              props.style,
                              { width: width, height: height },
                            ]}
                            source={{
                              uri: item.uri,
                              priority: FastImage.priority.normal,
                              cache: FastImage.cacheControl.immutable,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        )}
                      />
                    </View>
                  );
                }}
                keyExtractor={(_, index) => index.toString()}
              />

              <ImageViewerFooter imageIndex={currentIndex} />
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </ScreenLayout>
  );
};

export default SpecialityDetailsScreen;

// import React, {
//   useEffect,
//   useMemo,
//   useState,
//   useCallback,
//   useRef,
// } from 'react';
// import {
//   Alert,
//   FlatList,
//   Image,
//   Pressable,
//   Text,
//   useWindowDimensions,
//   View,
//   Dimensions,
//   StatusBar,
//   Modal,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import ImageView from 'react-native-image-viewing';
// import { ImageZoom } from '@likashefqet/react-native-image-zoom';
// import FastImage from 'react-native-fast-image';
// import { useRoute } from '@react-navigation/native';
// import { createStyles } from './styles';
// import { Images } from '../../../assets/images';
// import { Loader, ScreenLayout, SearchList } from '../../../component';
// import AppHeader from '../../../component/AppHeader/AppHeader';
// import { useAppTheme } from '../../../hooks/useAppTheme';
// import { Icons } from '../../../assets/icons';
// import { showToast } from '../../../utils/toast';
// import { ApiEndPoint } from '../../../api/endPoints';
// import { GET, POST_FORM } from '../../../api/request';
// import { baseURL } from '../../../component/api/axios';
// import {
//   gestureHandlerRootHOC,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// const SpecialityDetailsScreen = ({ navigation }) => {
//   const theme = useAppTheme();
//   const styles = createStyles(theme);
//   const route = useRoute();
//   const { medicine_id, specialityName } = route?.params || {};

//   const { width, height } = useWindowDimensions();
//   const [orientation, setOrientation] = useState('PORTRAIT');
//   const [controlsVisible, setControlsVisible] = useState(true);
//   const [selected, setSelected] = useState(medicine_id || '');
//   const controlsTimeoutRef = useRef(null);

//   const [search, setSearch] = useState('');
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [specialityDetailsList, setSpecialityDetailsList] = useState([]);
//   const [speciality, setSpeciality] = useState([]);
//   const [imageError, setImageError] = useState({});
//   const [previewMode, setPreviewMode] = useState('all'); // 'selected' or 'unselected'
//   const [isZoomed, setIsZoomed] = useState(false);
//   // Detect orientation changes
//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({ window }) => {
//       if (window.width > window.height) {
//         setOrientation('LANDSCAPE');
//       } else {
//         setOrientation('PORTRAIT');
//       }
//     });
//     return () => subscription?.remove();
//   }, []);

//   const isLandscape = width > height;

//   // Dynamic column calculation based on orientation and device
//   const numColumns = useMemo(() => {
//     if (theme.isTablet) {
//       return isLandscape ? 4 : 3;
//     }
//     return isLandscape ? 3 : 2;
//   }, [isLandscape, theme.isTablet]);

//   const DUMMY_IMAGE = `${baseURL}/uploads/doctor/consultant-physician126.png`;

//   const specialityData = [
//     { id: 'all', title: 'All' },
//     { id: 'ortho', title: 'Ortho' },
//     { id: 'gynae', title: 'Gynaec' },
//     { id: 'paid', title: 'Paid' },
//     { id: 'general', title: 'General Physician' },
//   ];

//   const handleIdByList = useCallback(
//     (id) => {
//       setSelected(id);
//       medicineBySpecilityId(id);
//     },
//     [speciality]
//   );

//   // Dynamic card width calculation
//   const cardWidth = useMemo(() => {
//     const spacing = theme.tokens.spacing.md;
//     const totalSpacing = spacing * (numColumns + 1);
//     return (width - totalSpacing) / numColumns;
//   }, [width, numColumns, theme.tokens.spacing.md]);

//   // Handle image selection
//   const handleSelect = useCallback((item) => {
//     setSelectedImages((prev) => {
//       const exists = prev.some((image) => image.mssub_id === item.mssub_id);
//       if (exists) {
//         return prev.filter((image) => image.mssub_id !== item.mssub_id);
//       } else {
//         return [...prev, item];
//       }
//     });
//   }, []);

//   // Auto-hide controls after 3 seconds
//   const handleControlsAutoHide = useCallback(() => {
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current);
//     }
//     controlsTimeoutRef.current = setTimeout(() => {
//       setControlsVisible(false);
//     }, 3000);
//   }, []);

//   const toggleControls = useCallback(() => {
//     setControlsVisible((prev) => !prev);
//     if (!controlsVisible) {
//       handleControlsAutoHide();
//     }
//   }, [controlsVisible, handleControlsAutoHide]);

//   // Handle preview opening based on selection state
//   const handleOpenPreview = useCallback(
//     (item) => {
//       let imagesToPreview = [];
//       let imageIndex = 0;
//       const isItemSelected = selectedImages.some(
//         (image) => image.mssub_id === item.mssub_id
//       );

//       if (isItemSelected) {
//         // Pressed on SELECTED image -> Show ONLY selected images
//         setPreviewMode('selected');
//         imagesToPreview = selectedImages;
//         imageIndex = selectedImages.findIndex(
//           (image) => image.mssub_id === item.mssub_id
//         );

//         if (imagesToPreview.length === 0) {
//           showToast('info', 'Info', 'No selected images to preview');
//           return;
//         }
//       } else {
//         // Pressed on UNSELECTED image -> Show ONLY unselected images
//         setPreviewMode('unselected');
//         imagesToPreview = specialityDetailsList.filter(
//           (image) =>
//             !selectedImages.some(
//               (selected) => selected.mssub_id === image.mssub_id
//             )
//         );
//         imageIndex = imagesToPreview.findIndex(
//           (image) => image.mssub_id === item.mssub_id
//         );

//         if (imagesToPreview.length === 0) {
//           showToast('info', 'Info', 'No unselected images to preview');
//           return;
//         }
//       }

//       setPreviewImages(
//         imagesToPreview.map((image) => ({
//           uri: image?.mssub_image
//             ? `${baseURL}/uploads/medicine/${image.mssub_image}`
//             : DUMMY_IMAGE,
//           title: image?.title || '',
//           id: image?.mssub_id,
//         }))
//       );

//       setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
//       setVisible(true);
//       setControlsVisible(true);
//       handleControlsAutoHide();
//     },
//     [specialityDetailsList, selectedImages, DUMMY_IMAGE, handleControlsAutoHide]
//   );

//   // Custom header for image viewer
//   const ImageViewerHeader = useCallback(
//     ({ imageIndex }) => {
//       if (!controlsVisible) return null;

//       return (
//         <>
//           <View
//             style={[
//               styles.previewHeader,
//               isLandscape && styles.landscapePreviewHeader,
//             ]}
//           >
//             <Text style={styles.previewCountText}>
//               {imageIndex + 1}/{previewImages.length}
//             </Text>
//           </View>

//           <Pressable
//             onPress={() => {
//               setVisible(false);
//               if (controlsTimeoutRef.current) {
//                 clearTimeout(controlsTimeoutRef.current);
//               }
//             }}
//             style={[
//               styles.previewCloseBox,
//               isLandscape && styles.landscapePreviewCloseBox,
//             ]}
//           >
//             <Image
//               source={Icons.closeIcon || Icons.leftIcon}
//               style={styles.previewCloseIcon}
//             />
//           </Pressable>
//         </>
//       );
//     },
//     [
//       controlsVisible,
//       previewImages.length,
//       previewMode,
//       selectedImages.length,
//       specialityDetailsList.length,
//       isLandscape,
//       styles,
//     ]
//   );

//   // Custom footer for image viewer
//   const ImageViewerFooter = useCallback(
//     ({ imageIndex }) => {
//       if (!controlsVisible) return null;

//       const item = previewImages[imageIndex];
//       if (!item?.title) return null;

//       return (
//         <View
//           style={[
//             styles.previewFooter,
//             isLandscape && styles.landscapePreviewFooter,
//           ]}
//         >
//           <Text style={styles.previewFooterText}>{item.title}</Text>
//         </View>
//       );
//     },
//     [controlsVisible, previewImages, isLandscape, styles]
//   );

//   // Render individual item
//   const renderItem = useCallback(
//     ({ item, index }) => {
//       const isSelected = selectedImages.some(
//         (image) => image.mssub_id === item.mssub_id
//       );
//       const imageUrl = item?.mssub_image
//         ? `${baseURL}/uploads/medicine/${item.mssub_image}`
//         : DUMMY_IMAGE;

//       return (
//         <Pressable
//           style={[
//             styles.cart,
//             { width: cardWidth },
//             isSelected && styles.selectedBorder,
//           ]}
//           onPress={() => handleOpenPreview(item, index)}
//         >
//           {
//             // <Image
//             //   source={{
//             //     uri: imageError[item.mssub_id] ? DUMMY_IMAGE : imageUrl,
//             //   }}
//             //   style={[
//             //     styles.categoryImg,
//             //     { width: cardWidth * 0.8, height: cardWidth * 0.8 },
//             //   ]}
//             //   resizeMode="cover"
//             //   onError={() => {
//             //     setImageError((prev) => ({
//             //       ...prev,
//             //       [item.mssub_id]: true,
//             //     }));
//             //   }}
//             // />
//           }
//           <FastImage
//             style={[
//               styles.categoryImg,
//               { width: cardWidth * 0.8, height: cardWidth * 0.8 },
//             ]}
//             source={{
//               uri: imageUrl,
//               priority: FastImage.priority.normal,
//               cache: FastImage.cacheControl.immutable,
//             }}
//             resizeMode={FastImage.resizeMode.cover}
//           />

//           {/* Check icon */}
//           <View style={[styles.checkBoxBg, isSelected && styles.selectedCheck]}>
//             <Pressable
//               style={[styles.checkIconBox, isSelected && styles.selectedBox]}
//               onPress={() => handleSelect(item)}
//             >
//               <Image source={Icons.checkIcon} style={styles.checkIcon} />
//             </Pressable>
//           </View>

//           <View style={styles.itemBox}>
//             <Text style={styles.itemNumberText} numberOfLines={1}>
//               {item.title || `Item ${index + 1}`}
//             </Text>
//           </View>
//         </Pressable>
//       );
//     },
//     [
//       cardWidth,
//       selectedImages,
//       imageError,
//       DUMMY_IMAGE,
//       handleOpenPreview,
//       handleSelect,
//       styles,
//     ]
//   );

//   // Fetch medicine data
//   const medicineBySpecilityId = useCallback(async (id) => {
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
//       } else {
//         setSpecialityDetailsList([]);
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
//   }, []);

//   const handerItemRender = ({ item }) => {
//     const isSelected = selected === item?.ms_id;
//     return (
//       <Pressable
//         onPress={() => handleIdByList(item?.ms_id)}
//         style={[styles.headerItemBox, isSelected && styles.headerSelectBox]}
//       >
//         <Text
//           style={[
//             styles.headerTitleText,
//             isSelected && styles.headerSelectTitle,
//           ]}
//         >
//           {item?.ms_name}
//         </Text>
//       </Pressable>
//     );
//   };

//   const specialityList = async () => {
//     try {
//       setLoading(true);
//       const response = await GET(ApiEndPoint.listSpeciality);
//       if (response?.status === '1') {
//         setSpeciality(response?.result || []);
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
//     if (medicine_id) {
//       medicineBySpecilityId(medicine_id);
//     }
//   }, [medicine_id, medicineBySpecilityId]);

//   // Filter data based on search
//   const filteredData = useMemo(() => {
//     if (!search.trim()) return specialityDetailsList;
//     return specialityDetailsList.filter((item) =>
//       item.mssub_name?.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, specialityDetailsList]);

//   // Key extractor
//   const keyExtractor = useCallback(
//     (item) => item.ms_id?.toString() || item.mssub_id?.toString(),
//     []
//   );

//   useEffect(() => {
//     const nextImages = previewImages
//       .slice(currentIndex + 1, currentIndex + 3)
//       .map((item) => ({ uri: item.uri }));

//     FastImage.preload(nextImages);
//   }, [currentIndex]);

//   useEffect(() => {
//     specialityList();
//   }, []);

//   return (
//     <ScreenLayout
//       header={
//         <AppHeader
//           title={`${specialityName}  Detail`}
//           leftIcon={Icons.leftIcon}
//           onPress={() => navigation.goBack()}
//         />
//       }
//       paddingHorizontal={0}
//       innerContainer={styles.innerContainer}
//     >
//       <Loader visible={loading} />
//       <FlatList
//         key={`flatlist-${numColumns}-${orientation}`}
//         data={filteredData}
//         renderItem={renderItem}
//         keyExtractor={keyExtractor}
//         numColumns={numColumns}
//         columnWrapperStyle={styles.row}
//         ListHeaderComponent={() => (
//           <FlatList
//             horizontal
//             data={speciality}
//             keyExtractor={(item) => item?.ms_id.toString()}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.headerListContainer}
//             renderItem={handerItemRender}
//           />
//         )}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={10}
//         removeClippedSubviews={false}
//       />
//       {/* Custom Full-Screen Image Viewer */}
//       <Modal
//         visible={visible}
//         transparent={false}
//         animationType="none"
//         statusBarTranslucent={true}
//         onRequestClose={() => {
//           setVisible(false);
//           if (controlsTimeoutRef.current) {
//             clearTimeout(controlsTimeoutRef.current);
//           }
//         }}
//       >
//         <StatusBar hidden={true} />

//         {/* MODAL WRAPPER FIX: Poore modal content ko is view se wrap karein */}
//         <GestureHandlerRootView
//           style={{
//             width,
//             height,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <View style={styles.modalFullScreen}>
//             <View style={styles.imageContainer}>
//               <ImageViewerHeader imageIndex={currentIndex} />

//               <FlatList
//                 data={previewImages}
//                 horizontal
//                 pagingEnabled
//                 scrollEnabled={!isZoomed} // Zoom hone par horizontal scroll block hoga
//                 showsHorizontalScrollIndicator={false}
//                 initialScrollIndex={currentIndex}
//                 getItemLayout={(data, index) => ({
//                   length: width,
//                   offset: width * index,
//                   index,
//                 })}
//                 onScroll={(event) => {
//                   const newIndex = Math.round(
//                     event.nativeEvent.contentOffset.x / width
//                   );
//                   if (newIndex !== currentIndex) {
//                     setCurrentIndex(newIndex);
//                     setControlsVisible(true);
//                     handleControlsAutoHide();
//                     setIsZoomed(false); // New page par zoom reset state
//                   }
//                 }}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <View
//                       style={{
//                         width,
//                         height,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <ImageZoom
//                         minScale={1}
//                         maxScale={2}
//                         doubleTapScale={1.5}
//                         isDoubleTapEnabled
//                         isPanEnabled
//                         isPinchEnabled
//                         onScaleChange={(scale) => {
//                           setIsZoomed(scale > 1.01);
//                         }}
//                         onResetAnimationEnd={() => {
//                           setIsZoomed(false);
//                         }}
//                         style={{
//                           width: width,
//                           height: height,
//                         }}
//                         source={{
//                           uri: item.uri,
//                         }}
//                         resizeMode="contain"
//                       />
//                     </View>
//                   );
//                 }}
//                 keyExtractor={(item, index) => index.toString()}
//               />

//               <ImageViewerFooter imageIndex={currentIndex} />
//             </View>
//           </View>
//         </GestureHandlerRootView>
//       </Modal>
//     </ScreenLayout>
//   );
// };

// export default SpecialityDetailsScreen;

// onScaleChange={(scale) => {
//                         // Sirf current active image ka gesture state track hoga
//                         if (index === currentIndex) {
//                           setIsZoomed(scale > 1);
//                         }
//                       }}
//                       onResetAnimationEnd={() => {
//                         if (index === currentIndex) {
//                           setIsZoomed(false);
//                         }
//                       }}
//perfect modal
// <Modal
//         visible={visible}
//         transparent={false}
//         animationType="none"
//         statusBarTranslucent={true}
//         onRequestClose={() => {
//           setVisible(false);
//           if (controlsTimeoutRef.current) {
//             clearTimeout(controlsTimeoutRef.current);
//           }
//         }}
//       >
//         <StatusBar hidden={true} />
//         <View style={styles.modalFullScreen}>
//           <View style={styles.imageContainer}>
//             <ImageViewerHeader imageIndex={currentIndex} />

//             <FlatList
//               data={previewImages}
//               horizontal
//               pagingEnabled
//               // Dynamically disable list scrolling only when the current image is zoomed in
//               scrollEnabled={!isZoomed}
//               showsHorizontalScrollIndicator={false}
//               initialScrollIndex={currentIndex}
//               getItemLayout={(data, index) => ({
//                 length: width, // Use the dynamically structured width variable
//                 offset: width * index,
//                 index,
//               })}
//               onScroll={(event) => {
//                 const newIndex = Math.round(
//                   event.nativeEvent.contentOffset.x / width
//                 );
//                 if (newIndex !== currentIndex) {
//                   setCurrentIndex(newIndex);
//                   setControlsVisible(true);
//                   handleControlsAutoHide();
//                   setIsZoomed(false); // Reset zoom state when page changes
//                 }
//               }}
//               renderItem={({ item, index }) => {
//                 return (
//                   <View
//                     style={{
//                       width,
//                       height,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <ImageZoom
//                       minScale={1}
//                       maxScale={5}
//                       doubleTapScale={2.5}
//                       isDoubleTapEnabled
//                       isPanEnabled
//                       isPinchEnabled
//                       // Track scale changes directly to manage FlatList scroll behavior
//                       onScaleChange={(scale) => {
//                         if (index === currentIndex) {
//                           setIsZoomed(scale > 1);
//                         }
//                       }}
//                       // Reset zoom tracking when the zoom returns back to normal
//                       onResetAnimationEnd={() => {
//                         if (index === currentIndex) {
//                           setIsZoomed(false);
//                         }
//                       }}
//                       style={{
//                         width: width,
//                         height: height,
//                       }}
//                       source={{
//                         uri: item.uri,
//                       }}
//                       resizeMode="contain"
//                     />
//                   </View>
//                 );
//               }}
//               keyExtractor={(item, index) => index.toString()}
//             />

//             <ImageViewerFooter imageIndex={currentIndex} />
//           </View>
//         </View>
//       </Modal>
