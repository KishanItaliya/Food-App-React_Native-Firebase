import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {COLORS, FONTS, SIZES} from '../../../constants';
import IoniconsHeader from '../../../components/IoniconsHeader';
import {AuthContext} from '../../../navigation/AuthProvider';
import ReviewCard from './ReviewCard';

const userReviews = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('reviews')
      .onSnapshot(snapshot =>
        setReviews(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  }, []);

  console.log('REVIEW>>', reviews);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <IoniconsHeader
        title="Reviews"
        left={{icon: 'arrow-back', onPress: () => navigation.goBack()}}
        right={{
          icon: 'cart',
          onPress: () => navigation.navigate('Cart'),
        }}
        cart
      />
      {reviews?.length === 0 ? (
        <View style={{marginTop: SIZES.height * 0.4, alignItems: 'center'}}>
          <Text style={{...FONTS.h2}}>No reviews yet!!</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 10}}>
          {reviews?.map(review => (
            <ReviewCard review={review} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default userReviews;
