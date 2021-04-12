import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import ClassifyReview from './ClassifyReview';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../../../constants';

const ReviewContainer = ({route}) => {
  const name = route.params;
  // console.log(name);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <ClassifyReview name={name.name} />
    </View>
  );
};

export default ReviewContainer;
