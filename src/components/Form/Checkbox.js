import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {BorderlessButton} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES} from '../../constants';

const Checkbox = ({label, checked, onChange}) => {
  return (
    <BorderlessButton
      onPress={() => onChange()}
      style={{justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            marginRight: SIZES.spacing.m,
            height: 20,
            width: 20,
            borderRadius: SIZES.borderRadii.s,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.blue,
            backgroundColor: checked ? COLORS.blue : COLORS.white,
          }}>
          <Icon name="check" color="white" />
        </View>
        <Text style={{...FONTS.body3}}>{label}</Text>
      </View>
    </BorderlessButton>
  );
};

export default Checkbox;
