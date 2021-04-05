import React from 'react';
import {View} from 'react-native';
import Header from '../../../components/Header';
import {COLORS, SIZES} from '../../../constants';
import Notification from './Notification';

const Settings = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Notifications"
        left={{icon: 'menu', onPress: () => navigation.openDrawer()}}
        right={{icon: 'external-link', onPress: () => true}}
      />
      <View style={{padding: SIZES.spacing.m, flex: 1}}>
        <Notification
          title="Food Items"
          description="Receive daily notifications"
        />
        <Notification
          title="Discounts & Coupens"
          description="Order the food you love for less"
        />
      </View>
    </View>
  );
};

export default Settings;
