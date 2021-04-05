import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../constants';

const Notification = ({title, description}) => {
  const [toggled, setToggled] = useState(false);
  return (
    <View style={{flexDirection: 'row', marginBottom: SIZES.spacing.m}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{...FONTS.h5}}>{title}</Text>
        <Text style={{...FONTS.body5}}>{description}</Text>
      </View>
      <View style={{paddingVertical: SIZES.spacing.m}}>
        <Switch
          value={toggled}
          onValueChange={setToggled}
          trackColor={{
            true: COLORS.lightPrimary,
            false: COLORS.gray,
          }}
          thumbColor={toggled ? COLORS.primary : COLORS.darkGray}
        />
      </View>
    </View>
  );
};

export default Notification;
