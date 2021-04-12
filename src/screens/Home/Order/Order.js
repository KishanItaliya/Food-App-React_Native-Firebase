import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS} from '../../../constants';
import Product from './Product';

const Order = ({order}) => {
  console.log('OO', order);
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
        <Text style={{...FONTS.h3, color: COLORS.white}}>
          {order.data.payment_id}
        </Text>
      </View>
      {order.data.cart?.map(item => (
        <Product name={item.name} price={item.price} qty={item.qty} />
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
    </View>
  );
};

export default Order;
