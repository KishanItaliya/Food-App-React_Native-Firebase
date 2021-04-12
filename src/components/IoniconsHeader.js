import React from 'react';
import {View, Text} from 'react-native';
import IoniconsRoundedIconButton from './IoniconsRoundedIconButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES} from '../constants';
import {connect} from 'react-redux';

const IoniconsHeader = ({
  left,
  title,
  right,
  dark,
  cart,
  amount,
  drawerCart,
}) => {
  const insets = useSafeAreaInsets();
  const color = dark ? COLORS.white : COLORS.blue;
  const backgroundColor = dark ? COLORS.blue : COLORS.lightGray;
  const itemBackColor = drawerCart ? COLORS.lightBlue : COLORS.blue;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: insets.top + 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.spacing.m,
      }}>
      <IoniconsRoundedIconButton
        size={44}
        iconRatio={0.5}
        name={left.icon}
        onPress={left.onPress}
        {...{color, backgroundColor}}
      />
      <Text style={{...FONTS.body4, color: color}}>{title.toUpperCase()}</Text>

      {cart ? (
        <View>
          <IoniconsRoundedIconButton
            size={44}
            iconRatio={0.5}
            name={right.icon}
            onPress={right.onPress}
            {...{color, backgroundColor}}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: itemBackColor,
              height: 18,
              width: 18,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                ...FONTS.h7,
                color: drawerCart ? COLORS.blue : COLORS.white,
              }}>
              {amount}
            </Text>
          </View>
        </View>
      ) : (
        <IoniconsRoundedIconButton
          size={44}
          iconRatio={0.4}
          name={right.icon}
          onPress={right.onPress}
          {...{color, backgroundColor}}
        />
      )}
    </View>
  );
};

IoniconsHeader.defaultProps = {
  dark: false,
};

const mapStateToProps = store => {
  const {amount} = store;
  return {amount};
};

export default connect(mapStateToProps)(IoniconsHeader);
