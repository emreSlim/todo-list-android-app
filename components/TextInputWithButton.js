import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from './CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';

const myTextInput = React.createRef();

export default function TextInputWithButton({
  list,
  setList,
  alertTrigger,
  setRefresh,
}) {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    if (!myTextInput.current.isFocused()) {
      !myTextInput.current.focus();
      return;
    }
    if (input) {
      if (input.length > 3) {
        if (!list.find(item => item.text === input)) {
          Alert.alert(
            'Almost there!',
            'Would you like to set schedule date and time?',
            [
              {
                text: 'YES',
                onPress: () => {
                  showDatePicker();
                },
              },
              {
                text: 'NO',
                onPress: () => {
                  pushItem();
                },
              },
            ],
          );
          myTextInput.current.blur();
          myTextInput.current.clear();
        } else {
          alertTrigger('Duplicate entry not allowed!');
        }
      } else {
        alertTrigger('Input text must be minimum 4 characters!');
      }
    } else {
      alertTrigger('Please type a valid input!');
    }
  };

  function pushItem(dateScheduled = false, dateAdded = new Date()) {
    setList(previousList => [
      {
        text: input,
        checked: false,
        dateAdded: dateAdded.toLocaleString(),
        dateScheduled: dateScheduled,
      },
      ...previousList,
    ]);
    setInput('');
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleCancel = () => {
    pushItem();
    setDatePickerVisibility(false);
  };

  const handleConfirm = scheduledDate => {
    scheduledDate = scheduledDate.toLocaleString();
    pushItem(scheduledDate);
    setDatePickerVisibility(false);
    PushNotification.localNotificationSchedule({
      channelId: 'com.localnotifications.todo',
      title: 'Your task is due',
      message: 'Task: ' + input,
      bigText: `You have a task '${input}' to complete which was scheduled for '${scheduledDate}'.`,
      date: new Date(scheduledDate),
    });

    setTimeout(() => {
      setRefresh(pre => !pre);
    }, new Date(scheduledDate) - Date.now());
  };

  return (
    <>
      <Text style={styles.header}>Type in your item below:</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          ref={myTextInput}
          onSubmitEditing={handleSubmit}
          onChangeText={inp => {
            setInput(inp.trim());
          }}
          placeholder="type here.."
          style={styles.textInput}
        />
        <CustomButton
          style={styles.submitBtn}
          iconSource={require('../assets/plus.png')}
          onPress={handleSubmit}
          color="#26a"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    marginBottom: 5,
    width: '80%',
    padding: 5,
    fontSize: 16,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#888',
    borderTopLeftRadius: 5,
    borderRightWidth: 0,
  },
  header: {
    borderRadius: 5,
    marginVertical: 5,
    color: '#fff',
    padding: 8,
    paddingTop: 5,
    backgroundColor: '#000b',
  },
  submitBtn: {
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderColor: '#888',
    borderWidth: 0.5,
  },
});
