import React from 'react';
import {Alert, StyleSheet, Vibration, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import CustomButton from './CustomButton';

export default function DeleteButtons({list, setList, alertTrigger}) {
  const clearCompleted = () => {
    if (list && list.length > 0) {
      if (list.find(obj => obj.checked)) {
        Vibration.vibrate();
        Alert.alert(
          'Remove Items?',
          'All the completed items will be removed',
          [
            {
              text: 'OK',
              onPress: () => {
                setList(preList => preList.filter(obj => !obj.checked));
                PushNotification.removeAllDeliveredNotifications();
              },
            },
            {
              text: 'Cancel',
            },
          ],
        );
      } else {
        alertTrigger('No check-marked item found!');
      }
    } else {
      alertTrigger('No items to remove!');
    }
  };
  return (
    <View style={buttonContainer.style}>
      <CustomButton
        color="#195"
        iconSource={require('../assets/checked.png')}
        onPress={clearCompleted}
        title="REMOVE CHECKED"
      />
    </View>
  );
}

const buttonContainer = StyleSheet.create({
  style: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});
