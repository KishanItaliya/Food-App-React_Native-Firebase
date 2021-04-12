import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../../components/Header';
import {COLORS} from '../../../constants';
import ListCategories from './ListCategories';

const Restaurants = ({navigation}) => {
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
      <ListCategories />
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
