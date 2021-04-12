import React from 'react';
import {Image, View, TouchableOpacity, BackHandler} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {COLORS, icons} from '../constants';
import Search from '../screens/Home/Search';
import Restaurants from '../screens/Home/Restaurants';
import Setting from '../screens/Home/Setting';
import Restaurant from '../screens/Home/Restaurant';
import Reviews from '../screens/Home/Reviews';
import OrderDelivery from '../screens/Home/OrderDelivery';
import Cart from '../screens/Home/Cart';
import Payment from '../screens/Home/Payment';
import SubmitReview from '../screens/Home/Reviews/SubmitReview';
import Review from '../screens/Home/Review';
import Profile from '../screens/Home/Profile';
import userReviews from '../screens/Home/userReviews';

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  // console.log('D', isSelected);

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 50,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      style: {
        height: 50,
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: 'transparent',
      },
      showLabel: false,
      activeTintColor: COLORS.blue,
      keyboardHidesTabBar: true,
    }}
    // tabBar={props => <CustomTabBar props={props} />}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <Image
            source={icons.cutlery}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.blue : COLORS.skyBlue,
            }}
          />
        ),
        // tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="UserReviews"
      component={userReviews}
      options={{
        tabBarLabel: 'UserReviews',
        tabBarIcon: ({focused}) => (
          <Icon
            name="book"
            color={focused ? COLORS.blue : COLORS.skyBlue}
            size={25}
          />
        ),
        // tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            name="search"
            color={focused ? COLORS.blue : COLORS.skyBlue}
            size={25}
          />
        ),
        // tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({focused}) => (
          <Icon
            name="user"
            color={focused ? COLORS.blue : COLORS.skyBlue}
            size={25}
          />
        ),
        // tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({focused}) => (
          <Icon
            name="shopping-cart"
            color={focused ? COLORS.blue : COLORS.skyBlue}
            size={25}
          />
        ),
        // tabBarButton: props => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Restaurants" component={Restaurants} />
    <HomeStack.Screen name="Restaurant" component={Restaurant} />
    <HomeStack.Screen name="Reviews" component={Reviews} />
    <HomeStack.Screen name="SubmitReview" component={SubmitReview} />
    <HomeStack.Screen name="Review" component={Review} />
    <HomeStack.Screen name="Payment" component={Payment} />
    <HomeStack.Screen name="OrderDelivery" component={OrderDelivery} />
  </HomeStack.Navigator>
);
