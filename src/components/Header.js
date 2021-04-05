import React from 'react';
import {View, Text} from 'react-native';
import RoundedIconButton from './RoundedIconButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES} from '../constants';

const Header = ({left, title, right, dark}) => {
  const insets = useSafeAreaInsets();
  const color = dark ? COLORS.white : COLORS.blue;
  const backgroundColor = dark ? COLORS.blue : COLORS.lightGray;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: insets.top + 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.spacing.m,
      }}>
      <RoundedIconButton
        size={44}
        iconRatio={0.4}
        name={left.icon}
        onPress={left.onPress}
        {...{color, backgroundColor}}
      />
      <Text style={{...FONTS.body4, color: color}}>{title.toUpperCase()}</Text>
      <RoundedIconButton
        size={44}
        iconRatio={0.4}
        name={right.icon}
        onPress={right.onPress}
        {...{color, backgroundColor}}
      />
    </View>
  );
};

Header.defaultProps = {
  dark: false,
};

export default Header;
