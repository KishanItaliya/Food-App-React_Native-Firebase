import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/Authentication/Onboarding';
import Login from '../screens/Authentication/Login';
import Welcome from '../screens/Authentication/Welcome';
import SignUp from '../screens/Authentication/SignUp';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import PasswordChanged from '../screens/Authentication/PasswordChanged';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = () => (
  <AuthenticationStack.Navigator headerMode="none">
    <AuthenticationStack.Screen
      name="Onboarding"
      component={OnboardingScreen}
    />
    <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    <AuthenticationStack.Screen name="Login" component={Login} />
    <AuthenticationStack.Screen name="SignUp" component={SignUp} />
    <AuthenticationStack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
    />
    <AuthenticationStack.Screen
      name="PasswordChanged"
      component={PasswordChanged}
    />
  </AuthenticationStack.Navigator>
);

export default AuthenticationNavigator;
