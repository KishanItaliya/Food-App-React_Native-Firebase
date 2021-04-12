import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ClassifyReviewCard from './ClassifyReviewCard';

const ClassifyReview = ({name}) => {
  console.log('NAME', name);
  const [positiveReviews, setPositiveReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);

  const PositiveReview = () => {
    firestore()
      .collection('reviews')
      .doc(name)
      .collection('positive')
      .onSnapshot(snapshot =>
        setPositiveReviews(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  };

  const NegativeReview = () => {
    firestore()
      .collection('reviews')
      .doc(name)
      .collection('negative')
      .onSnapshot(snapshot =>
        setNegativeReviews(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  };

  // console.log('PPP', positiveReviews);
  // console.log('PPR', negativeReviews);

  useEffect(() => {
    PositiveReview();
    NegativeReview();
  }, [name]);

  return (
    <View>
      <ClassifyReviewCard
        positiveReviews={positiveReviews}
        negativeReviews={negativeReviews}
      />
    </View>
  );
};

export default ClassifyReview;
