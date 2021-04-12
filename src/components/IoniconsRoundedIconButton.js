import React from 'react';
import {BorderlessButton} from 'react-native-gesture-handler';
import IoniconsRoundedIcon from './IoniconsRoundedIcon';

const IoniconsRoundedIconButton = ({onPress, ...props}) => {
  return (
    <BorderlessButton {...{onPress}}>
      <IoniconsRoundedIcon {...props} />
    </BorderlessButton>
  );
};

IoniconsRoundedIconButton.defaultProps = {
  iconRatio: 0.7,
};

export default IoniconsRoundedIconButton;
