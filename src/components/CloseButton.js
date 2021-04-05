import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';
import {COLORS} from '../constants';

const SIZE = 60;

const CloseButton = ({onPress}) => {
  return (
    <RectButton {...{onPress}}>
      <View
        style={{
          height: SIZE,
          width: SIZE,
          borderRadius: SIZE / 2,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: COLORS.blue, textAlign: 'center'}}>
          <Icon name="x" size={45} />
        </Text>
      </View>
    </RectButton>
  );
};

export default CloseButton;
