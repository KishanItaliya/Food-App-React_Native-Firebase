import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, StyleSheet, Image, View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import RoundedIcon from '../components/RoundedIcon';
import FontAwesomeRoundedIcon from '../components/FontAwesomeRoundedIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, SIZES, images} from '../constants';
import Header from '../components/Header';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const DRAWER_WIDTH = SIZES.width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const DrawerContent = props => {
  const {user, logout} = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  const fetchProfile = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setProfile({
            id: user?.uid,
            data: snapshot?.data(),
          });
        } else {
          setProfile({
            id: user?.uid,
            data: null,
          });
        }
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, backgroundColor: COLORS.white}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderBottomRightRadius: SIZES.borderRadii.xl,
            backgroundColor: COLORS.blue,
          }}>
          <Header
            title="MENU"
            left={{
              icon: 'x',
              onPress: () =>
                props.navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{
              icon: 'shopping-cart',
              onPress: () => props.navigation.navigate('Cart'),
            }}
            dark
            cart
            drawerCart
          />
        </View>
      </View>
      <View style={{flex: 0.8}}>
        <View style={{flex: 1, backgroundColor: COLORS.blue}} />
        <View style={{flex: 1, backgroundColor: COLORS.primary}} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.borderRadii.xl,
            borderBottomRightRadius: SIZES.borderRadii.xl,
            justifyContent: 'center',
            padding: SIZES.spacing.xl,
          }}>
          <View style={styles.avatarPlaceholder}>{/* Profile Image */}</View>
          <View style={{marginVertical: SIZES.spacing.m}}>
            <Text style={{...FONTS.h1, textAlign: 'center'}}>
              {profile?.data == null ? 'Username' : profile?.data.username}
            </Text>
            <Text style={{...FONTS.body5, textAlign: 'center'}}>
              {user.email}
            </Text>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <RoundedIcon
                  iconRatio={0.6}
                  name="home"
                  size={36}
                  backgroundColor={COLORS.violet}
                  color={COLORS.white}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Restaurants');
              }}
            />

            <DrawerItem
              icon={() => (
                <RoundedIcon
                  iconRatio={0.6}
                  name="user"
                  size={36}
                  backgroundColor={COLORS.pink}
                  color={COLORS.white}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />

            {/* <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="book"
                  size={36}
                  backgroundColor={COLORS.yellow}
                  color={COLORS.blue}
                />
              )}
              label="User Reviews"
              onPress={() => {
                props.navigation.navigate('UserReviews');
              }}
            /> */}

            <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="money"
                  size={36}
                  backgroundColor={COLORS.primary}
                  color={COLORS.blue}
                />
              )}
              label="Orders"
              onPress={() => {
                props.navigation.navigate('Orders');
              }}
            />

            <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="book"
                  size={36}
                  backgroundColor={COLORS.yellow}
                  color={COLORS.blue}
                />
              )}
              label="All Reviews"
              onPress={() => {
                props.navigation.navigate('Review');
              }}
            />

            <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="sign-out"
                  size={36}
                  backgroundColor={COLORS.blue}
                  color={COLORS.white}
                />
              )}
              label="Sign Out"
              onPress={() => logout()}
            />
          </Drawer.Section>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: DRAWER_WIDTH,
          overflow: 'hidden',
          height: height * 0.39,
        }}>
        <Image
          source={images.bg_2}
          style={{
            width: DRAWER_WIDTH,
            height: height,
            borderTopLeftRadius: SIZES.borderRadii.xl,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatarPlaceholder: {
    position: 'absolute',
    top: -35,
    left: DRAWER_WIDTH / 2 - 40,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatar: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default DrawerContent;
