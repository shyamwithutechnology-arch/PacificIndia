import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';

interface AppImagePickerProps {
  visible: boolean;
  onClose: () => void;
  onChange?: (image: Asset | null) => void;
}

const AppImagePicker = ({
  visible,
  onClose,
  onChange,
}: AppImagePickerProps) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const openGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    };

    try {
      const response = await launchImageLibrary(options);

      if (response.assets && response.assets.length > 0) {
        onChange?.(response.assets[0]);
      }
    } catch (error) {
      console.log('Gallery Error => ', error);
    } finally {
      onClose();
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      saveToPhotos: true,
      cameraType: 'back',
    };

    try {
      const response = await launchCamera(options);

      if (response.assets && response.assets.length > 0) {
        onChange?.(response.assets[0]);
      }
    } catch (error) {
      console.log('Camera Error => ', error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Image</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={openCamera}
          >
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={openGallery}
          >
            <Text style={styles.buttonText}>Choose From Gallery</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppImagePicker;
