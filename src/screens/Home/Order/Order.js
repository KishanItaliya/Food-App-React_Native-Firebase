import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {COLORS, FONTS} from '../../../constants';
import Product from './Product';
import {useNavigation} from '@react-navigation/native';

const Order = ({order}) => {
  // console.log('OO', order);
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
      }}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            ORDER ID{` `}:{' '}
          </Text>
          <Text style={{...FONTS.h3, color: COLORS.white}}>
            {` `}
            {order.data.order_id}
          </Text>
        </View>

        <Text style={{...FONTS.body3, textAlign: 'right'}}>
          {order.data.time}
        </Text>
      </View>
      {order.data.cart?.map(item => (
        <Product
          name={item.name}
          price={item.price}
          qty={item.qty}
          photo={item.photo}
        />
      ))}
      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Text style={{...FONTS.h3, color: COLORS.white}}>TOTAL: </Text>
        <Text style={{...FONTS.body3, color: COLORS.white}}>
          ₹{order.data.total}
        </Text>
      </View>
      {/* <View style={{alignItems: 'center'}}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            backgroundColor: COLORS.white,
            width: 90,
            height: 40,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('OrderDelivery', {name: order.data.name});
          }}>
          <Text
            style={{
              ...FONTS.h3,
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.primary,
            }}>
            TRACK
          </Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default Order;
