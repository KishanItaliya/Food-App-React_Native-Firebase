import React from 'react';
import {View, Text} from 'react-native';
import {FONTS} from '../../../constants';

const Product = ({name, price, qty}) => {
  console.log(name, price, qty);
  return (
    <View>
      <View style={{padding: 10}}>
        <Text style={{...FONTS.body3}}>{name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.body4}}>PRICE: </Text>
            <Text style={{...FONTS.body4}}>{price}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.body4}}>QTY: </Text>
            <Text style={{...FONTS.body4}}>{qty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Product;
