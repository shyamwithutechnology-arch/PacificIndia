import React, { useRef } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Images } from '../../assets/images';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import Loader from '../Common/Loader';

// Local fallback images
const FALLBACK_IMAGES = [
  { id: '1', image: Images.banner, imageUrl: null },
  { id: '2', image: Images.banner, imageUrl: null },
  { id: '3', image: Images.banner, imageUrl: null },
];

export default function BannerSlider({
  banners = [],
  loading = false,
  onRefresh,
}) {
  const ref = useRef<ICarouselInstance>(null);
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();

  const BANNER_HEIGHT = width * 0.45;
  const BORDER_RADIUS = 16;

  // Determine which data to use
  const getCarouselData = () => {
    if (loading) {
      return [];
    }

    if (banners && banners.length > 0) {
      return banners?.map((banner, index) => ({
        id: banner?.ban_title?.toString(),
        imageUrl: banner?.ban_image,
        // fallback image here
        fallbackImage: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]?.image,
      }));
    }

    // Fallback to local images
    return FALLBACK_IMAGES;
  };

  const carouselData = getCarouselData();

  // Handle image loading error
  const handleImageError = (item) => {
    console.log('Failed to load image:', item.imageUrl);
    // You could trigger a refresh here
  };

  // Render banner item
  const renderBannerItem = ({ item }) => {
    if (item?.imageUrl) {
      return (
        <View style={[styles.imageWrapper, { borderRadius: BORDER_RADIUS }]}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => handleImageError(item)}
          />
        </View>
      );
    }

    // For local images
    return (
      <View style={[styles.imageWrapper, { borderRadius: BORDER_RADIUS }]}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  if (loading && banners.length) {
    return <Loader visible={loading} />;
  }

  if (carouselData.length === 0) {
    return null; // Don't render anything if no data
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width - 23}
        height={BANNER_HEIGHT}
        data={carouselData}
        autoPlay={carouselData.length > 1}
        loop={carouselData.length > 1}
        autoPlayInterval={3000}
        onProgressChange={progress}
        style={{ alignSelf: 'center' }}
        renderItem={renderBannerItem}
      />
    </View>
  );
}
