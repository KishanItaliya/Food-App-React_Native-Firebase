import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './MainTabScreen';
import {SIZES} from '../constants';
import DrawerNavigator from './DrawerNavigator';
import Profile from '../screens/Home/Profile';
import UpdateProfile from '../screens/Home/Profile/UpdateProfile';
import Review from '../screens/Home/Review';
import ReviewContainer from '../screens/Home/Review/ReviewContainer';
import Orders from '../screens/Home/Order';
import userReviews from '../screens/Home/userReviews';

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
    <Drawer.Screen name="Review" component={Review} />
    <Drawer.Screen name="ReviewContainer" component={ReviewContainer} />
    <Drawer.Screen name="Orders" component={Orders} />
    <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />
  </Drawer.Navigator>
);

export default HomeNavigator;
