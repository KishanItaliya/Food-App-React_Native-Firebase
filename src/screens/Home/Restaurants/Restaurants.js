import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../../components/Header';
import {COLORS} from '../../../constants';
import ListCategories from './ListCategories';
import firestore from '@react-native-firebase/firestore';

const Restaurants = ({navigation}) => {
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
    <View style={styles.container}>
      <Header
        title="Aahar"
        left={{icon: 'menu', onPress: () => navigation.openDrawer()}}
        right={{
          icon: 'shopping-cart',
          onPress: () => navigation.navigate('Cart'),
        }}
        cart
      />
      <ListCategories data={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Restaurants;
