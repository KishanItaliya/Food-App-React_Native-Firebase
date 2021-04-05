import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import RoundedIcon from './RoundedIcon';

const RoundedIconButton = ({onPress, ...props}) => {
  return (
    <BorderlessButton {...{onPress}}>
      <RoundedIcon {...props} />
    </BorderlessButton>
  );
};

RoundedIconButton.defaultProps = {
  iconRatio: 0.7,
};

export default RoundedIconButton;
