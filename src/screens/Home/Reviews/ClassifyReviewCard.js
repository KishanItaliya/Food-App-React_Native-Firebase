import React from 'react';
import {View, Text, FlatList, ScaledSize} from 'react-native';
import CardContent from './CardContent';
import {SIZES} from '../../../constants';

const ClassifyReviewCard = ({positiveReviews, negativeReviews}) => {
  const positiveReview = positiveReviews;
  const negativeReview = negativeReviews;
  // console.log("PR", positiveReview);
  // console.log("NR", negativeReview);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {positiveReview.length == 0 && negativeReview.length == 0 ? (
        <View
          style={{
            marginTop: SIZES.height / 2 - 150,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            No Reviews Present
          </Text>
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: 7,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Positive Review
          </Text>
          {positiveReview.length == 0 ? (
            <Text
              style={{
                fontSize: 14,
              }}>
              No Reviews Present
            </Text>
          ) : (
            <FlatList
              data={positiveReview}
              renderItem={({item}) => <CardContent review={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 7,
                paddingVertical: 5,
              }}
            />
          )}

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Negative Review
          </Text>
          {negativeReview.length == 0 ? (
            <Text
              style={{
                fontSize: 14,
              }}>
              No Reviews Present
            </Text>
          ) : (
            <FlatList
              data={negativeReview}
              renderItem={({item}) => <CardContent review={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 7,
                paddingVertical: 5,
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ClassifyReviewCard;
