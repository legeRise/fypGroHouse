import React from 'react';
import { Alert } from 'react-native';

const ShowAlert = ({ message }) => {
  React.useEffect(() => {
    Alert.alert(
      'Message',
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }, [message]);

  return null;
};

export default ShowAlert;