import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const submitReview = (review, rating, name, status, userId) => {
  if (status != undefined) {
    if (status == 'Positive Review') {
      firestore()
        .collection('reviews')
        .doc(name)
        .collection('positive')
        .doc()
        .set({
          review: review,
          rating: rating,
          name: name,
          userId: userId,
          status: status,
          time: Date.now(),
        })
        .then(() => {
          console.log('Review submitted successfully!!');
          // alert('Review submitted successfully!!');
          ToastAndroid.show(
            'Review submitted successfully!!',
            ToastAndroid.LONG,
          );
        })
        .catch(error => {
          console.log('ERROR', error);
          alert('Review Not submitted!!');
        });
    } else {
      firestore()
        .collection('reviews')
        .doc(name)
        .collection('negative')
        .doc()
        .set({
          review: review,
          rating: rating,
          name: name,
          userId: userId,
          status: status,
          time: Date.now(),
        })
        .then(() => {
          console.log('Review submitted successfully!!');
          alert('Review submitted successfully!!');
        })
        .catch(error => {
          console.log('ERROR', error);
          alert('Review Not submitted!!');
        });
    }
  } else {
    alert('Please submit review again!!');
  }
};
