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
import { ScreenLayout, SearchList } from '../../component';
import { Icons } from '../../assets/icons';
import { useAppTheme } from '../../hooks/useAppTheme';
import { createStyles } from './styles';
import AppHeader from '../../component/AppHeader/AppHeader';
import { Images } from '../../assets/images';
import AddIcon from 'react-native-vector-icons/Ionicons';

const AppointMentsScreen = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [seach, setSearch] = useState('');

  return (
    <ScreenLayout
      header={
        <AppHeader
          title="Pacific India"
          search={seach}
          leftIcon={Icons.drawerIcon}
        />
      }
    >
      <View style={styles.searchRow}>
        <SearchList
          value={seach}
          onChange={setSearch}
          searchRowCustom={styles.searchRowCustom}
        />

        <Pressable onPress={() => navigation.navigate('AddAppointMent')}>
          <AddIcon
            name="add-circle-sharp"
            color={theme.tokens.colors.primary}
            size={theme.moderateScale(40)}
          />
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

export default AppointMentsScreen;
