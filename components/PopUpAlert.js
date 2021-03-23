import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';

export default function PopUpAlert({pAlert}) {
  return (
    <Modal animationType="fade" transparent={true} visible={pAlert.display}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Image
            fadeDuration={0}
            style={styles.errorIcon}
            source={require('../assets/errorIcon.png')}
          />
          <Text style={styles.modalText}>{pAlert.text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    top: 60,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 35,
    maxWidth: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {flex: 1, alignItems: 'center', backgroundColor: '#0009'},
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c00',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    textShadowColor: '#0003',
  },
  errorIcon: {
    height: 40,
    width: 40,
  },
});
