import React, {useEffect, useState} from 'react';

import CheckBox from '@react-native-community/checkbox';
import ItemModal from './ItemModal';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

export default function ToDoItem({item, index, setList, list, setRefresh}) {
  const [modalVisibliy, setModalVisibility] = useState(false);

  const {checked, dateAdded, dateScheduled, text} = item;

  const handleItemLongPress = (itemText, indx) => {
    Vibration.vibrate();
    Alert.alert(
      'Remove Item?',
      `Item "${itemText}" will be removed from list`,
      [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: () => {
            setList(preList => {
              return preList.filter((obj, idx) => idx !== indx);
            });
          },
        },
      ],
    );
  };
  const setCheckedState = itm => {
    setList(pre => {
      return [
        ...pre.map(obj => {
          if (obj === itm) {
            obj.checked = !obj.checked;
          }
          return obj;
        }),
      ];
    });
  };
  return (
    <View style={styles.item}>
      <ItemModal
        list={list}
        visibliy={modalVisibliy}
        setVisibility={setModalVisibility}
        index={index}
        setList={setList}
        setRefresh={setRefresh}
      />
      <CheckBox
        style={styles.checkbox}
        value={checked}
        tintColors={{true: '#195', false: '#666'}}
        onChange={() => {
          setCheckedState(item);
        }}
      />
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={0.7}
        onPress={() => {
          setModalVisibility(true);
        }}
        onLongPress={() => {
          handleItemLongPress(text, index);
        }}>
        <Text style={styles.text}>
          {`${index + 1}.`}
          <Text style={{color: '#000', fontWeight: 'bold'}}>{text}</Text>
          {dateScheduled && new Date(dateScheduled) < new Date() ? (
            <Text style={{color: 'red'}}> (Due)</Text>
          ) : undefined}
        </Text>
        <Text style={styles.time}>
          {dateScheduled
            ? 'Time Scheduled : ' + dateScheduled
            : '(Not Scheduled) Time Added : ' + dateAdded}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    bottom: 3,
    padding: 5,
    flex: 1,
    color: '#000',
    fontSize: 16,
  },

  time: {
    bottom: -8,
    position: 'absolute',
    color: '#666',
    fontSize: 10,
    width: '100%',
    textAlign: 'right',
  },
});
