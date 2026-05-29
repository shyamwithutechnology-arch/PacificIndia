import React from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'react-native';
import { createStyles } from './styles';
import { useAppTheme } from '../../hooks/useAppTheme';

const CustomDropDown = ({
  data,
  value,
  onChange,
  placeholder = 'Select item',
  leftIcon,
  dropDownContainer,
  leftIconStyle,
  optionStyle,
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const renderLeftIcon = () => {
    if (!leftIcon) return null;

    return <Image source={leftIcon} style={[styles.icon, leftIconStyle]} />;
  };

  const renderItem = (item: any) => {
    const isSelected = value === item.value;

    return (
      <View
        style={[
          styles.itemContainer,
          optionStyle,
          isSelected && styles.selectedItemContainer,
        ]}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item.label}
        </Text>
      </View>
    );
  };
  return (
    <View style={[styles.container, dropDownContainer]}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        renderItem={renderItem}
        onChange={(item) => onChange(item.value)}
        // ✅ Left Icons
        renderLeftIcon={renderLeftIcon}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        containerStyle={styles.containerDropdown}
      />
    </View>
  );
};
export default CustomDropDown;

// import React from 'react';
// import { Image, View } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { createStyles } from './styles';
// import { useAppTheme } from '../../hooks/useAppTheme';
// import { Icons } from '../../assets/icons';

// const CustomDropDown = ({
//   open,
//   value,
//   items,
//   setOpen,
//   setValue,
//   setItems,
//   placeholderText,
//   placeholderColor,
// }) => {
//   const theme = useAppTheme();
//   const styles = createStyles(theme);
//   return (
//     <View style={styles.wrapper}>
//       <Image source={Icons.mapIcon} style={styles.leftIcon} />

//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         placeholder={placeholderText}
//         style={styles.dropDown}
//         dropDownContainerStyle={styles.dropDownContainer}
//         placeholderStyle={{ color: theme.tokens.colors.lightGray }}
//         arrowIconStyle={{
//           tintColor: theme.tokens.colors.lightGray,
//         }}
//       />
//     </View>
//   );
// };

// export default CustomDropDown;
