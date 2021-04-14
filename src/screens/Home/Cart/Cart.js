import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {v4 as uuidv4} from 'uuid';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {groupBy, chain} from 'lodash';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import IoniconsHeader from '../../../components/IoniconsHeader';
import {RazorpayApiKey} from './config';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import CartItem from './CartItem';
import {CLEAR_CART, GET_TOTALS} from '../../../redux/actions';
import moment from 'moment';

const Cart = ({route, navigation, cart, total, amount, dispatch, name}) => {
  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState();

  useEffect(() => {
    dispatch({type: GET_TOTALS});
  }, [cart, dispatch]);

  // Fetch User Profile
  const fetchProfile = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setProfile({
            id: user?.uid,
            data: snapshot?.data(),
          });
        } else {
          setProfile({
            id: user?.uid,
            data: null,
          });
        }
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Store Order In DATABASE
  const saveOrder = async (transaction, cart) => {
    console.log(transaction);
    console.log(cart);
    const orderId = transaction.razorpay_order_id;
    try {
      let db = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(orderId);

      if (name !== null) {
        db.set({
          order_id: transaction.razorpay_order_id,
          payment_id: transaction.razorpay_payment_id,
          signature: transaction.razorpay_signature,
          name: name,
          total: total,
          cart: cart,
          time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
        });
      } else {
        console.log('Order not stored!!');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
    dispatch({type: CLEAR_CART});
  };

  // Payment Gateway
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const createOrder = async () => {
    const {data} = await axios.post(
      'https://us-central1-food-review-308615.cloudfunctions.net/api/createOrder',
      {
        amount: total * 100,
        currency: 'INR',
      },
    );
    return data;
  };

  const verifyPayment = async (orderID, transaction) => {
    const {data} = await axios.post(
      'https://us-central1-food-review-308615.cloudfunctions.net/api/verifyPayment',
      {
        orderID: orderID,
        transaction: transaction,
      },
    );
    return data.validSignature;
  };

  const onPay = async () => {
    setPaymentProcessing(true);
    //Step 1: Create order
    const order = await createOrder();
    // console.log('ORDER>>', order);

    var options = {
      name: 'AAHAR',
      // image: images.bg_1,
      description: 'Food Delivery App',
      order_id: order.id,
      key: RazorpayApiKey,
      prefill: {
        email: user.email,
        contact: '',
        name: profile?.data == null ? 'Username' : profile?.data.username,
      },
      theme: {color: COLORS.blue},
    };

    RazorpayCheckout.open(options)
      .then(async transaction => {
        // **** payment successful ****

        // console.log(transaction);
        // const s = await verifyPayment(order.id, transaction);
        // console.log(s);
        console.log(transaction);
        saveOrder(transaction, cart);
        alert(`Payment Successful for: ${transaction.razorpay_payment_id}`);
        navigation.navigate('SubmitReview', {
          order_id: transaction.razorpay_order_id,
        });
      })
      .catch(error => {
        // **** payment failure ****
        alert(`Error: ${error.code} | ${error.description}`);
      });

    setPaymentProcessing(false);
  };

  const Restaurants = chain(cart)
    .groupBy('restaurant')
    .map((value, key) => ({id: uuidv4(), name: key, restaurants: value}))
    .value();
  // console.log('RESTAURANTS>>', Restaurants);

  const renderCards = () => {
    const RenderItem = ({restaurant}) => {
      // console.log('X:', restaurant);
      return (
        <View>
          <View
            style={{
              width: SIZES.width * 0.9,
              backgroundColor: COLORS.blue,
              alignSelf: 'center',
              borderRadius: SIZES.radius,
              marginBottom: SIZES.padding,
              padding: SIZES.padding,
              elevation: 15,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.white,
                marginBottom: 15,
              }}>
              {restaurant?.name}
            </Text>
            <View>
              {restaurant?.restaurants.map(x => {
                return <CartItem key={x.id} {...x} />;
              })}
            </View>
            <View
              style={{
                marginTop: 15,
                alignItems: 'flex-end',
                borderTopWidth: 2,
                borderTopColor: COLORS.white,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  lineHeight: 26,
                  color: COLORS.white,
                  marginTop: 10,
                }}>
                Total: ₹{total}
              </Text>
            </View>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={Restaurants}
        keyExtractor={(x, index) => index.toString()}
        renderItem={({item}) => <RenderItem restaurant={item} />}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View
      style={{flex: 1, backgroundColor: COLORS.white, marginTop: insets.top}}>
      <IoniconsHeader
        title="Cart"
        left={{icon: 'arrow-back', onPress: () => navigation.goBack()}}
        right={{
          icon: 'cart',
          onPress: () => navigation.navigate('Cart'),
        }}
        cart
      />
      {amount !== 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderCards()}
          {cart.length !== 0 ? (
            <View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Pressable
                  style={{
                    backgroundColor: COLORS.lightBlue,
                    borderRadius: SIZES.radius * 2,
                    height: 50,
                    width: 170,
                    marginTop: -15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    onPay();
                  }}>
                  <View>
                    <Text
                      style={{
                        ...FONTS.h5,
                        color: COLORS.blue,
                      }}>
                      Pay Now ₹{total}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <Pressable
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width: 150,
                  backgroundColor: COLORS.lightBlue,
                  borderRadius: SIZES.borderRadii.l,
                  marginBottom: 30,
                }}
                onPress={() => {
                  dispatch({type: CLEAR_CART});
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{...FONTS.body3}}>CLEAR CART</Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            marginTop: SIZES.height * 0.38,
          }}>
          <Text style={{...FONTS.h2}}>Your cart is Empty!!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

function mapStateToProps(store) {
  const {cart, total, amount, name} = store;
  // console.log(cart);
  return {cart, total, amount, name};
}

export default connect(mapStateToProps)(Cart);
