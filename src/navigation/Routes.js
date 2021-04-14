import React, {useState, useEffect, useContext} from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigator from '../navigation/AuthenticationNavigator';
import HomeNavigator from '../navigation/HomeNavigator';
import {COLORS} from '../constants';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <LottieView source={require('../assets/loader.json')} autoPlay loop />
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.blue} />
      {user ? <HomeNavigator /> : <AuthenticationNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
