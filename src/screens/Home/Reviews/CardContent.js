import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, icons} from '../../../constants';

const CardContent = ({review}) => {
  const item = review.data;
  return (
    <View
      style={{
        borderRadius: 15,
        height: 120,
        width: 150,
        elevation: 2,
        marginRight: 7,
        backgroundColor: COLORS.blue,
      }}>
      <View
        style={{
          padding: 10,
        }}>
        <Text style={{fontSize: 14, color: COLORS.white}}>{item.review}</Text>
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
          <Text style={{fontSize: 14, color: COLORS.white}}>
            ({item.rating})
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardContent;
