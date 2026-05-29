import React, { useRef, useState } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { Images } from '../../../../assets/images';
import Loader from '../../../../component/Common/Loader';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { createStyles } from './styles';

const FALLBACK_IMAGES = [
  { id: '1', image: Images.bannerImg },
  { id: '2', image: Images.bannerImg },
  { id: '3', image: Images.bannerImg },
];

export default function HomeBannerSlider({ banners = [], loading = false }) {
  const ref = useRef<ICarouselInstance>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { width } = useWindowDimensions();

  const theme = useAppTheme();
  const styles = createStyles(theme);

  const BANNER_HEIGHT = width * 0.4;

  const carouselData =
    banners?.length > 0
      ? banners.map((banner, index) => ({
          id: String(banner?.id ?? index),
          imageUrl: banner?.ban_image ?? null,
          image:
            banner?.image ??
            FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]?.image,
        }))
      : FALLBACK_IMAGES;

  const renderBannerItem = ({ item }) => (
    <View style={styles.imageWrapper}>
      <Image
        source={item?.imageUrl ? { uri: item.imageUrl } : item.image}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );

  if (loading && banners.length) {
    return <Loader visible={loading} />;
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
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={renderBannerItem}
      />

      <View style={styles.dotWrapper}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}
