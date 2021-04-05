import React, {forwardRef} from 'react';
import {View, Text, StyleSheet, TextInput as RNTextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, SIZES} from '../../constants';
import RoundedIcon from '../../components/RoundedIcon';

const TextInput = forwardRef(({icon, touched, error, ...props}, ref) => {
  const SIZE = SIZES.borderRadii.m * 2;
  const reColor = !touched ? COLORS.text : error ? COLORS.danger : COLORS.blue;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: SIZES.borderRadii.s,
        borderColor: reColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: SIZES.borderRadii.s,
      }}>
      <View style={{padding: SIZES.borderRadii.s}}>
        <Icon name={icon} size={16} {...{reColor}} />
      </View>

      <View style={{flex: 1}}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={reColor}
          {...{ref}}
          {...props}
        />
      </View>

      {touched && (
        <RoundedIcon
          iconRatio={0.7}
          name={!error ? 'check' : 'x'}
          size={SIZE}
          backgroundColor={!error ? COLORS.blue : COLORS.danger}
          color={COLORS.white}
        />
      )}
    </View>
  );
});

export default TextInput;
