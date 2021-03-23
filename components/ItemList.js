import React from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ToDoItem from './ToDoItem';

export default function ItemList({list, setList, refresh, setRefresh}) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        extraData={[refresh]}
        keyExtractor={item => item.text}
        style={styles.list}
        data={list}
        renderItem={({item, index}) => (
          <ToDoItem
            item={item}
            index={index}
            setList={setList}
            list={list}
            setRefresh={setRefresh}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 10,
    width: '99%',
    backgroundColor: '#0007',
  },
  mainContainer: {
    height: '65%',
    flexDirection: 'row',
  },
});
