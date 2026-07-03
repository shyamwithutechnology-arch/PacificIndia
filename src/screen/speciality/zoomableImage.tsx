import React from 'react';
import { Image, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-worklets';

const AnimatedImage = Animated.createAnimatedComponent(Image);

type Props = {
  uri: string;
  onTap?: () => void;
  onZoomChange?: (zoomed: boolean) => void;
};

const ZoomableImage = ({ uri, onTap, onZoomChange }: Props) => {
  const { width, height } = useWindowDimensions();

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      'worklet';
      const newScale = Math.max(1, Math.min(savedScale.value * e.scale, 4));
      scale.value = newScale;

      if (newScale > 1) {
        const maxTranslateX = (width * (newScale - 1)) / 2;
        const maxTranslateY = (height * (newScale - 1)) / 2;

        translateX.value = Math.max(
          -maxTranslateX,
          Math.min(maxTranslateX, translateX.value)
        );
        translateY.value = Math.max(
          -maxTranslateY,
          Math.min(maxTranslateY, translateY.value)
        );
      }
    })
    .onEnd(() => {
      'worklet';
      savedScale.value = scale.value;

      if (scale.value <= 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
        savedScale.value = 1;

        if (onZoomChange) {
          runOnJS(onZoomChange)(false);
        }
      } else {
        if (onZoomChange) {
          runOnJS(onZoomChange)(true);
        }
      }
    });

  const panGesture = Gesture.Pan()
    .minDist(0)
    .onUpdate((e) => {
      'worklet';
      if (scale.value > 1) {
        const maxTranslateX = (width * (scale.value - 1)) / 2;
        const maxTranslateY = (height * (scale.value - 1)) / 2;

        let newTranslateX = savedTranslateX.value + e.translationX;
        let newTranslateY = savedTranslateY.value + e.translationY;

        // ✅ Correctly clamp values
        newTranslateX = Math.max(
          -maxTranslateX,
          Math.min(maxTranslateX, newTranslateX)
        );
        newTranslateY = Math.max(
          -maxTranslateY,
          Math.min(maxTranslateY, newTranslateY)
        );

        translateX.value = newTranslateX;
        translateY.value = newTranslateY;
      }
    })
    .onEnd(() => {
      'worklet';
      if (scale.value > 1) {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      'worklet';
      if (scale.value > 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;

        if (onZoomChange) {
          runOnJS(onZoomChange)(false);
        }
      } else {
        const newScale = 2.5;
        scale.value = withSpring(newScale);
        savedScale.value = newScale;

        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;

        if (onZoomChange) {
          runOnJS(onZoomChange)(true);
        }
      }
    });

  const singleTapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      'worklet';
      if (onTap) {
        runOnJS(onTap)();
      }
    });

  const composedGesture = Gesture.Race(
    Gesture.Simultaneous(pinchGesture, panGesture),
    Gesture.Exclusive(doubleTapGesture, singleTapGesture)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: 'black',
        }}
      >
        <AnimatedImage
          source={{ uri }}
          resizeMode="contain"
          style={[
            {
              width,
              height,
            },
            animatedStyle,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default ZoomableImage;
