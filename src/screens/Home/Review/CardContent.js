import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

const CardContent = ({review}) => {
  // console.log(review);
  return (
    <View
      style={{
        borderRadius: 15,
        height: SIZES.height * 0.35,
        width: 160,
        elevation: 2,
        marginRight: 7,
        backgroundColor: COLORS.blue,
        flex: 1,
      }}>
      <View
        style={{
          padding: 13,
        }}>
        <Text style={{...FONTS.body5, color: COLORS.white}}>
          {review.review}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={icons.star}
            style={{
              height: 16,
              width: 16,
              tintColor: COLORS.white,
              marginRight: 8,
            }}
          />
          <Text style={{...FONTS.body5, color: COLORS.white}}>
            ({review.rating})
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardContent;
