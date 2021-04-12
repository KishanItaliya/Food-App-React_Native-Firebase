import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import IoniconsHeader from '../../../components/IoniconsHeader';
import Order from './Order';
import {FONTS, SIZES} from '../../../constants';

const Orders = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('orders')
      .onSnapshot(snapshot =>
        setOrders(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  }, []);

  console.log('ORDER', orders);

  return (
    <View>
      <IoniconsHeader
        title="Orders"
        left={{icon: 'arrow-back', onPress: () => navigation.goBack()}}
        right={{
          icon: 'cart',
          onPress: () => navigation.navigate('Cart'),
        }}
        cart
      />
      {orders.length === 0 ? (
        <View style={{marginTop: SIZES.height * 0.4, alignItems: 'center'}}>
          <Text style={{...FONTS.h2}}>No orders History!!</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}>
          {orders?.map(order => (
            <Order order={order} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Orders;
