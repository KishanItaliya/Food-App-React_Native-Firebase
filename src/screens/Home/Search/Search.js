import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Header from '../../../components/Header';
import {COLORS} from '../../../constants';
import firestore from '@react-native-firebase/firestore';
import SearchItem from './SearchItem';

const Search = ({navigation}) => {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    firestore()
      .collection('items')
      .onSnapshot(snapshot =>
        setItems(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <Header
        title="Search"
        left={{icon: 'menu', onPress: () => navigation.openDrawer()}}
        right={{icon: 'external-link', onPress: () => true}}
      />
      <SearchItem data={items} />
    </View>
  );
};

export default Search;
