import React, { useCallback } from 'react';
import { Platform, View, Modal, Pressable } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
  visible: boolean;
  onClose: () => void;
  mode?: 'date' | 'time' | 'datetime';
  maximumDate?: Date;
  minimumDate?: Date;
};

const AppDatePicker: React.FC<Props> = ({
  value,
  onChange,
  visible,
  onClose,
  mode = 'date',
  maximumDate,
  minimumDate,
}) => {
  const todayDate = new Date();
  const handleChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      // Android: always close after selection/dismiss
      if (Platform.OS === 'android') {
        onClose();
      }

      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    },
    [onChange, onClose],
  );

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPress={onClose}
      >
        <View
          onStartShouldSetResponder={() => true}
          style={{
            backgroundColor: '#000',
            paddingBottom: 10,
          }}
        >
          <DateTimePicker
            value={value}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={handleChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate || todayDate}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(AppDatePicker);
