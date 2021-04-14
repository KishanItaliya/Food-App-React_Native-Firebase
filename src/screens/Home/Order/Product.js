import React from 'react';
import {View, Text, Image} from 'react-native';
import {FONTS} from '../../../constants';

const Product = ({name, price, qty, photo}) => {
  // console.log(name, price, qty, photo);
  return (
    <View>
      <View style={{padding: 8, marginTop: 10}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{flex: 0.3}}>
            <Image
              source={{uri: photo}}
              style={{height: 70, width: 70, marginRight: 10, borderRadius: 15}}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text style={{...FONTS.body3}}>{name}</Text>
          </View>
        </View>
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
