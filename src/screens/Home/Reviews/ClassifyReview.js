import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ClassifyReviewCard from './ClassifyReviewCard';
import firestore from '@react-native-firebase/firestore';

const ClassifyReview = ({name}) => {
  //   console.log("NAME", name);
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

  useEffect(() => {
    PositiveReview();
    NegativeReview();
  }, []);

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
