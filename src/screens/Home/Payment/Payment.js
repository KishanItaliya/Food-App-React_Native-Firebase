import React, {useState} from 'react';
import {View, Button} from 'react-native';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import {RazorpayApiKey} from './config';
import {COLORS} from '../../../constants';

const Payment = () => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const createOrder = async () => {
    const {data} = await axios.post(
      'https://us-central1-food-review-308615.cloudfunctions.net/api/createOrder',
      {
        amount: 100,
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
      name: 'Kishan Italiya',
      image: '',
      description: 'Aahar Food App',
      order_id: order.id,
      key: RazorpayApiKey,
      prefill: {
        email: 'kishanpitaliya@gmail.com',
        contact: '9191919191',
        name: 'Kishan Italiya',
      },
      theme: {color: COLORS.blue},
    };

    RazorpayCheckout.open(options)
      .then(async transaction => {
        // **** payment successful ****

        // console.log(transaction);
        // const s = await verifyPayment(order.id, transaction);
        // console.log(s);
        alert(`Payment Successful for: ${transaction.razorpay_payment_id}`);
      })
      .catch(error => {
        // **** payment failure ****
        alert(`Error: ${error.code} | ${error.description}`);
      });

    setPaymentProcessing(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button onPress={() => onPay()} title="Pay ₹1" />
    </View>
  );
};

export default Payment;
