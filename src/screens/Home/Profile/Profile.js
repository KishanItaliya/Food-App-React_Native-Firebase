import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import Header from '../../../components/Header';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation}) => {
  const [image, setImage] = useState(null);

  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState();

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
    <View style={styles.container}>
      <Header
        title="Profile"
        left={{icon: 'menu', onPress: () => navigation.openDrawer()}}
        right={{
          icon: 'external-link',
          onPress: () => navigation.navigate('UpdateProfile'),
        }}
      />

      <Pressable
        style={{alignItems: 'center'}}
        onPress={() => navigation.navigate('UpdateProfile')}>
        <View style={styles.avatarPlaceholder}>
          <Image
            style={styles.avatar}
            source={
              profile?.data == null ? {uri: null} : {uri: profile?.data.avatar}
            }
          />
        </View>
      </Pressable>

      <View style={{marginTop: 30, marginBottom: 20, marginHorizontal: 40}}>
        <Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.textContainer}>
              {profile?.data == null
                ? undefined
                : profile?.data.username == null
                ? 'Username'
                : profile?.data.username}
            </Text>
          </View>
        </Pressable>

        <Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.textContainer}>
              {profile?.data == null
                ? undefined
                : profile?.data.address == null
                ? 'Address'
                : profile?.data.address}
            </Text>
          </View>
        </Pressable>

        <Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.textContainer}>
              {profile?.data == null
                ? undefined
                : profile?.data.city == null
                ? 'City'
                : profile?.data.city}
            </Text>
          </View>
        </Pressable>

        <Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.textContainer}>
              {profile?.data == null
                ? undefined
                : profile?.data.state == null
                ? 'State'
                : profile?.data.state}
            </Text>
          </View>
        </Pressable>

        <Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.textContainer}>
              {profile?.data == null
                ? undefined
                : profile?.data.country == null
                ? 'Country'
                : profile?.data.country}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={{alignItems: 'center', marginVertical: 30}}
          onPress={() => navigation.navigate('UpdateProfile')}>
          <View style={styles.button}>
            <Text style={{...FONTS.h4}}>EDIT PROFILE</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    height: 50,
    marginHorizontal: 10,
  },
  textContainer: {
    ...FONTS.body3,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  button: {
    borderRadius: SIZES.borderRadii.m,
    backgroundColor: COLORS.lightBlue,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
