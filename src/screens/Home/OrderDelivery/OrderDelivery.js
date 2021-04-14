import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {COLORS, SIZES, icons, GOOGLE_API_KEY} from '../../constants';
import firestore from '@react-native-firebase/firestore';

const OrderDelivery = ({route, navigation}) => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const name = route.params.name;
    console.log(name);
    const fetchDetail = async () => {
      await firestore()
        .collection('items')
        .where('name', '==', name)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
            setDetails(documentSnapshot.data());
          });
        });
    };
    fetchDetail();
  }, [route.params.name]);

  // console.log(details);

  return (
    <View>
      <Text>Map</Text>
    </View>
  );
};

export default OrderDelivery;
