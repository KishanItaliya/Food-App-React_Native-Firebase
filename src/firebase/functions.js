import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

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

export const saveReview = (
  review,
  rating,
  status,
  userId,
  restaurant_name,
  id,
  orderId,
) => {
  // console.log('RE', restaurant_name);
  // console.log('PI', payId);
  let db = firestore()
    .collection('users')
    .doc(userId)
    .collection('reviews')
    .doc(orderId.order_id);
  let db1 = firestore()
    .collection('reviews')
    .doc(restaurant_name)
    .collection('positive')
    .doc(orderId.order_id);
  let db2 = firestore()
    .collection('reviews')
    .doc(restaurant_name)
    .collection('negative')
    .doc(orderId.order_id);
  if (status != undefined && restaurant_name !== null) {
    db.set({
      restaurant_id: id,
      review: review,
      rating: rating,
      status: status.substring(0, 8),
      restaurant_name: restaurant_name,
      orderId: orderId.order_id,
      time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
    })
      .then(() => {
        console.log('Review submitted successfully!!');
        // alert('Review submitted successfully!!');
        ToastAndroid.show('Review submitted successfully!!', ToastAndroid.LONG);
      })
      .catch(error => {
        console.log('ERROR', error);
        alert('Review Not submitted!!');
      });
  } else {
    alert('Please submit review again!!');
  }

  if (status != undefined && restaurant_name !== null) {
    if (status == 'Positive Review') {
      db1
        .set({
          review: review,
          rating: rating,
          restaurant_id: id,
          restaurant_name: restaurant_name,
          userId: userId,
          orderId: orderId.order_id,
          status: status.substring(0, 8),
          time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
        })
        .then(() => {
          console.log('Review submitted successfully!!');
        })
        .catch(error => {
          console.log('ERROR', error);
        });
    } else {
      db2
        .set({
          review: review,
          rating: rating,
          restaurant_id: id,
          restaurant_name: restaurant_name,
          userId: userId,
          orderId: orderId.order_id,
          status: status.substring(0, 8),
          time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
        })
        .then(() => {
          console.log('Review submitted successfully!!');
        })
        .catch(error => {
          console.log('ERROR', error);
        });
    }
  } else {
    alert('Please submit review again!!');
  }
};

export const updateReview = (
  review,
  rating,
  status,
  userId,
  restaurant_name,
  id,
  orderId,
) => {
  // console.log('RE', restaurant_name);
  // console.log('PI', payId);
  let db = firestore()
    .collection('users')
    .doc(userId)
    .collection('reviews')
    .doc(orderId);
  let db1 = firestore()
    .collection('reviews')
    .doc(restaurant_name)
    .collection('positive')
    .doc(orderId);
  let db2 = firestore()
    .collection('reviews')
    .doc(restaurant_name)
    .collection('negative')
    .doc(orderId);
  if (status != undefined && restaurant_name !== null) {
    db.set({
      restaurant_id: id,
      review: review,
      rating: rating,
      status: status.substring(0, 8),
      restaurant_name: restaurant_name,
      orderId: orderId,
      time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
    })
      .then(() => {
        console.log('Review submitted successfully!!');
        // alert('Review submitted successfully!!');
        ToastAndroid.show('Review submitted successfully!!', ToastAndroid.LONG);
      })
      .catch(error => {
        console.log('ERROR', error);
        alert('Review Not submitted!!');
      });
  } else {
    alert('Please submit review again!!');
  }

  if (status != undefined && restaurant_name !== null) {
    if (status == 'Positive Review') {
      db1
        .set({
          review: review,
          rating: rating,
          restaurant_id: id,
          restaurant_name: restaurant_name,
          userId: userId,
          orderId: orderId,
          status: status.substring(0, 8),
          time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
        })
        .then(() => {
          console.log('Review submitted successfully!!');
        })
        .catch(error => {
          console.log('ERROR', error);
        });
    } else {
      db2
        .set({
          review: review,
          rating: rating,
          restaurant_id: id,
          restaurant_name: restaurant_name,
          userId: userId,
          orderId: orderId,
          status: status.substring(0, 8),
          time: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
        })
        .then(() => {
          console.log('Review submitted successfully!!');
        })
        .catch(error => {
          console.log('ERROR', error);
        });
    }
  } else {
    alert('Please submit review again!!');
  }
};
