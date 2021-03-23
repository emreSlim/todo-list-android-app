import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Alert,
  DrawerLayoutAndroid,
} from 'react-native';
import DeleteButtons from './components/DeleteButtons';
import ItemList from './components/ItemList';
import TextInputWithButton from './components/TextInputWithButton';
import PopUpAlert from './components/PopUpAlert';

export default function App() {
  const [list, setList] = useState([]);
  const [pAlert, setAlert] = useState({text: '', display: false});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    syncData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('data', JSON.stringify(list));
  }, [list]);

  const syncData = async () => {
    try {
      let data = await AsyncStorage.getItem('data');
      if (data) {
        setList(JSON.parse(data));
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  const alertTrigger = str => {
    setAlert({text: str, display: true});
    setTimeout(() => {
      setAlert({text: str, display: false});
    }, 1000);
  };

  return (
    <DrawerLayoutAndroid
      drawerWidth={200}
      drawerPosition="left"
      drawerBackgroundColor="#fff8"
      keyboardDismissMode="on-drag"
      renderNavigationView={() => (
        <Text style={{top: '50%', margin: 20}}>
          Designed and coded by Emre AKA Imran. More features coming soon..
        </Text>
      )}>
      <TouchableWithoutFeedback
        onPress={e => {
          Keyboard.dismiss();
        }}>
        <View style={styles.mainContainer}>
          <PopUpAlert pAlert={pAlert} />
          <StatusBar backgroundColor="#000b" translucent={true} />
          <ImageBackground
            fadeDuration={0}
            source={require('./assets/bg.jpg')}
            style={styles.bgImage}>
            <TextInputWithButton
              list={list}
              setList={setList}
              alertTrigger={alertTrigger}
              setRefresh={setRefresh}
            />
            {emptyListDisplay(list)}
            <ItemList
              list={list}
              setList={setList}
              refresh={refresh}
              setRefresh={setRefresh}
            />
            <DeleteButtons
              alertTrigger={alertTrigger}
              list={list}
              setList={setList}
            />
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </DrawerLayoutAndroid>
  );
}

const emptyListDisplay = list => {
  if (list && !list.length > 0) {
    return (
      <Text style={styles.emptyDisplayer}>
        Currently there's no item in your list. Please type in input box and add
        items.
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  bgImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDisplayer: {
    position: 'absolute',
    width: '90%',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 3,
    paddingHorizontal: 3,
    borderRadius: 8,
    top: '45%',
  },
});
