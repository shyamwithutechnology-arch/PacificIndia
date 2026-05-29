import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { createStyles } from './styles';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Icons } from '../../assets/icons';
import { SearchList } from '../searchList/SearchList';
import LinearGradient from 'react-native-linear-gradient';

type AppHeaderProp = {
  title: string;
  onPress: () => void;
  headerContainer: ViewStyle;
  leftIcon: Image;

  cartCount: number;
  notificationPress: () => void;
  questionMarkPress?: ImageSourcePropType;
  search?: string;
  setSearch?: () => void;
  searchStatus: boolean;
};
const AppHeader = ({
  title,
  onPress,
  headerContainer,
  notificationPress,
  questionMarkPress,
  search,
  setSearch,
  searchStatus = false,
  leftIcon,
}: AppHeaderProp) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  return (
    <LinearGradient
      colors={[theme.tokens.colors.primary, '#0871D8', '#0871D8']}
      style={[styles.container, headerContainer]}
    >
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {leftIcon && (
            <Pressable style={styles.leftIcon} onPress={onPress}>
              <Image source={leftIcon} style={styles.drawerIcon} />
            </Pressable>
          )}
          {!notificationPress && <Text style={styles.title}>{title}</Text>}
        </View>

        {notificationPress && <Text style={styles.title}>{title}</Text>}

        {notificationPress && (
          <View style={styles.notificationRow}>
            <Pressable
              style={[styles.customRightIconBox, styles.notificaiton]}
              onPress={notificationPress}
            >
              <Image
                source={Icons.notificationIcon}
                style={styles.customRightIcon}
                resizeMode="contain"
              />
            </Pressable>

            <Pressable
              style={styles.customRightIconBox}
              onPress={questionMarkPress}
            >
              <Image
                source={Icons.questionMarkIcon}
                style={styles.customRightIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        )}
      </View>

      {searchStatus && (
        <SearchList
          value={search}
          onChange={setSearch}
          customStyles={styles.customStyle}
        />
      )}
    </LinearGradient>
  );
};

export default AppHeader;
