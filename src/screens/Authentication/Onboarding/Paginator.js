import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../constants';

const Paginator = ({data, scrollX}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {data.map((_, i) => {
        const last = i === data.length - 1;

        const inputRange = [
          (i - 1) * SIZES.width,
          i * SIZES.width,
          (i + 1) * SIZES.width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.blue,
    marginHorizontal: 8,
  },
});

export default Paginator;
