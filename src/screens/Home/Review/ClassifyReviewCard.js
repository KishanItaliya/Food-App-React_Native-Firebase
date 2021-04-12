import React from 'react';
import {View, Text, FlatList} from 'react-native';
import CardContent from './CardContent';
import {COLORS, FONTS, SIZES} from '../../../constants';

const ClassifyReviewCard = ({positiveReviews, negativeReviews}) => {
  const positiveReview = positiveReviews;
  const negativeReview = negativeReviews;
  // console.log('PR', positiveReview);
  // console.log('NR', negativeReview);
  return (
    <View style={{backgroundColor: COLORS.white}}>
      {positiveReview?.length == 0 && negativeReview?.length == 0 ? (
        <View
          style={{
            marginTop: SIZES.height / 2 - 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h6,
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
          <View style={{height: SIZES.height * 0.5 - 30}}>
            <Text
              style={{
                ...FONTS.h6,
              }}>
              Positive Review
            </Text>
            {positiveReview?.length == 0 ? (
              <Text
                style={{
                  ...FONTS.h4,
                }}>
                No Reviews Present
              </Text>
            ) : (
              <FlatList
                data={positiveReview}
                renderItem={({item}) => <CardContent review={item.data} />}
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
          <View style={{height: SIZES.height * 0.5}}>
            <Text
              style={{
                ...FONTS.h6,
              }}>
              Negative Review
            </Text>
            {negativeReview?.length == 0 ? (
              <Text
                style={{
                  ...FONTS.h4,
                }}>
                No Reviews Present
              </Text>
            ) : (
              <FlatList
                data={negativeReview}
                renderItem={({item}) => <CardContent review={item.data} />}
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
        </View>
      )}
    </View>
  );
};

export default ClassifyReviewCard;
