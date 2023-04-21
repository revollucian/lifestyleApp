import {Alert} from 'react-native';

export const alert = (
  title: string,
  message: string,
  onPressCancel?: any,
  onPressOK?: any,
) =>
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => onPressCancel,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => onPressOK},
  ]);
