import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SIZES, FONTS, COLORS} from '../../../constants';

const OnboardingItem = ({item}) => {
  return (
    <View style={([styles.container], {width: SIZES.width})}>
      <Image
        source={item.img}
        style={[styles.image, {width: SIZES.width, resizeMode: 'cover'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={{...FONTS.h1, color: COLORS.blue, textAlign: 'center'}}>
          {item.subtitle}
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            textAlign: 'center',
            marginTop: SIZES.base,
            color: COLORS.blue,
            paddingHorizontal: 75,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
});

export default OnboardingItem;
