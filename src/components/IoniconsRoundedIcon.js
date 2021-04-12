import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const IoniconsRoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
}) => {
  const iconSize = size * iconRatio;
  return (
    <View
      style={{
        height: size,
        width: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
      }}>
      <Text style={{width: iconSize, height: iconSize, color: color}}>
        <Icon size={iconSize} name={name} />
      </Text>
    </View>
  );
};

IoniconsRoundedIcon.defaultProps = {
  iconRatio: 0.7,
};

export default IoniconsRoundedIcon;
