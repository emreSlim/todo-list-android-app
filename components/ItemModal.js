import React, {createRef, useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import CustomButton from './CustomButton';

const modalNote = createRef();

export default function ItemModal({
  visibliy,
  setVisibility,
  index,
  setList,
  list,
  setRefresh,
}) {
  const [note, setNote] = useState('');

  const item = list[index];

  const hideModal = () => {
    setVisibility(false);
  };

  function submitNote() {
    modalNote.current.focus();
    let str = note.trim();
    if (str.length > 3) {
      setList(preList => {
        preList[index] = {
          ...preList[index],
          note: str,
        };
        return preList;
      });
      setRefresh(pre => !pre);
      modalNote.current.clear();
    }
  }

  return (
    <Modal
      transparent={true}
      visible={visibliy}
      animationType="slide"
      onRequestClose={hideModal}>
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <CustomButton
            onPress={hideModal}
            style={styles.closeButton}
            iconSource={require('../assets/cross.png')}
            iconStyle={{tintColor: '#b22'}}
          />
          <View style={styles.detailsView}>
            <Text style={styles.task}>
              Task: <BoldText text={item.text} />
            </Text>
            <Text style={styles.timeScheduled}>
              Scheduled On:{' '}
              {item.dateScheduled ? (
                <BoldText text={item.dateScheduled} />
              ) : (
                <Text style={{color: '#666'}}>Not Scheduled</Text>
              )}
            </Text>
            <Text style={styles.timeAdded}>
              Added On : <BoldText text={item.dateAdded} />
            </Text>
            <Text style={styles.timeLeft}>
              {returnTimeLeft(item.dateScheduled)}
            </Text>
            <Text style={styles.note}>
              Note:{' '}
              {item.note ? (
                <BoldText text={item.note} />
              ) : (
                <Text style={{color: '#666'}}>(empty)</Text>
              )}
            </Text>
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              onSubmitEditing={submitNote}
              ref={modalNote}
              placeholder="type note here"
              onChangeText={inp => {
                setNote(inp.trim());
              }}
            />
            <CustomButton title="Add Note" onPress={submitNote} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const BoldText = ({text}) => <Text style={{fontWeight: 'bold'}}>{text}</Text>;

function returnTimeLeft(from) {
  if (from) {
    from = new Date(from).getTime();
    let till = Date.now();
    if (from > till) {
      let leftTime = from - till;
      let mins = Math.floor((leftTime / 60000) % 60);
      let hours = Math.floor((leftTime / 3600000) % 24);
      let days = Math.floor(leftTime / (3600000 * 24));
      return `${days} days, ${hours} hours and ${mins} minutes left.`;
    }
    return 'Task is due from its scheduled time.';
  }
  return (
    <Text style={{color: '#666', fontWeight: 'normal'}}>
      (time left will be shown here)
    </Text>
  );
}

const border = {borderBottomWidth: 0.5, borderColor: '#666', paddingTop: 10};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005',
  },
  modalView: {
    justifyContent: 'center',
    height: '98%',
    backgroundColor: '#fff',
    width: '98%',
    borderRadius: 20,
  },
  detailsView: {
    marginHorizontal: 20,
    padding: 10,
    borderLeftWidth: 0.5,
    borderColor: '#666',
  },
  closeButton: {
    backgroundColor: '#0000',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    top: 2,
    left: 2,
  },
  task: {
    ...border,
    color: '#000',
    fontSize: 25,
  },
  timeScheduled: {
    ...border,
    fontSize: 12,
  },
  timeAdded: {
    ...border,
    fontSize: 12,
  },
  timeLeft: {
    ...border,
    color: '#a55',
    fontWeight: 'bold',
  },
  note: {
    ...border,
    fontSize: 18,
  },
  inputSection: {
    width: 300,
    alignSelf: 'center',
    margin: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 200,
    ...border,
    height: 40,
  },
});
