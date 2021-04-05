import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './MainTabScreen';
import {SIZES} from '../constants';
import DrawerNavigator from './DrawerNavigator';
import Profile from '../screens/Home/Profile';
import UpdateProfile from '../screens/Home/Profile/UpdateProfile';

const Drawer = createDrawerNavigator();
const DRAWER_WIDTH = SIZES.width * 0.8;

const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <DrawerNavigator {...props} />}
    drawerStyle={{
      width: DRAWER_WIDTH,
    }}>
    <Drawer.Screen name="Home" component={MainTabScreen} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
  </Drawer.Navigator>
);

export default HomeNavigator;
