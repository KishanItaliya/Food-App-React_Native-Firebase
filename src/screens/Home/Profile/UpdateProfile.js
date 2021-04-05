import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../../components/Header';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const ProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(10, 'Too short!')
    .max(100, 'Too long!')
    .required('Required'),
  city: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  state: Yup.string()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .required('Required'),
  country: Yup.string()
    .min(3, 'Too short!')
    .max(100, 'Too long!')
    .required('Required'),
});

const UpdateProfile = ({navigation}) => {
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
          setImage(snapshot?.data().avatar);
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

  const choosePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    }).then(image => {
      // console.log(image);
      const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS == 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = storage().ref(filename).put(file);

      upload.on(
        'state_changed',
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        },
      );
    });
  };

  const updateUser = async (
    userId,
    username,
    address,
    city,
    state,
    country,
    avatar,
  ) => {
    // console.log(username),
    //   console.log(address),
    //   console.log(city),
    //   console.log(state),
    //   console.log(country);
    // console.log(image);
    let remoteUri = null;

    try {
      let db = firestore().collection('users').doc(userId);

      db.set(
        {
          username: username,
          address: address,
          city: city,
          state: state,
          country: country,
          avatar: null,
        },
        {merge: true},
      );
      if (avatar) {
        remoteUri = await uploadPhotoAsync(avatar, `avatars/${userId}`);
        db.set({avatar: remoteUri}, {merge: true});
      }
      alert('Profile Updated Successfully');
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: ProfileSchema,
    initialValues: {
      username: '',
      address: '',
      city: '',
      state: '',
      country: '',
    },
    onSubmit: values => {
      updateUser(
        user.uid,
        values.username,
        values.address,
        values.city,
        values.state,
        values.country,
        image,
      );
    },
  });

  const username = useRef(null);
  const address = useRef(null);
  const city = useRef(null);
  const state = useRef(null);

  return (
    <View style={styles.container}>
      <Header
        title="Edit Profile"
        left={{icon: 'menu', onPress: () => navigation.openDrawer()}}
        right={{
          icon: 'external-link',
          onPress: () => navigation.navigate('Profile'),
        }}
      />
      <View style={{alignItems: 'center'}}>
        <View style={styles.avatarPlaceholder}>
          <Image
            style={styles.avatar}
            source={profile?.data == null ? {uri: null} : {uri: image}}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30, marginBottom: 20, marginHorizontal: 40}}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              style={styles.textContainer}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              defaultValue={
                profile?.data == null ? undefined : profile?.data.username
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => username.current?.focus()}
            />
          </View>
          {errors.username ? (
            <Text
              style={{
                color: COLORS.danger,
                ...FONTS.body3,
                marginHorizontal: 15,
              }}>
              {errors.username}
            </Text>
          ) : null}
          <View style={styles.inputContainer}>
            <TextInput
              ref={username}
              placeholder="Address"
              style={styles.textContainer}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              defaultValue={
                profile?.data == null ? undefined : profile?.data.address
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => address.current?.focus()}
            />
          </View>
          {errors.address ? (
            <Text
              style={{
                color: COLORS.danger,
                ...FONTS.body3,
                marginHorizontal: 15,
              }}>
              {errors.address}
            </Text>
          ) : null}
          <View style={styles.inputContainer}>
            <TextInput
              ref={address}
              placeholder="City"
              style={styles.textContainer}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              defaultValue={
                profile?.data == null ? undefined : profile?.data.city
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => city.current?.focus()}
            />
          </View>
          {errors.city ? (
            <Text
              style={{
                color: COLORS.danger,
                ...FONTS.body3,
                marginHorizontal: 15,
              }}>
              {errors.city}
            </Text>
          ) : null}
          <View style={styles.inputContainer}>
            <TextInput
              ref={city}
              placeholder="State"
              style={styles.textContainer}
              onChangeText={handleChange('state')}
              onBlur={handleBlur('state')}
              defaultValue={
                profile?.data == null ? undefined : profile?.data.state
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => state.current?.focus()}
            />
          </View>
          {errors.state ? (
            <Text
              style={{
                color: COLORS.danger,
                ...FONTS.body3,
                marginHorizontal: 15,
              }}>
              {errors.state}
            </Text>
          ) : null}
          <View style={styles.inputContainer}>
            <TextInput
              ref={state}
              placeholder="Country"
              style={styles.textContainer}
              onChangeText={handleChange('country')}
              onBlur={handleBlur('country')}
              defaultValue={
                profile?.data == null ? undefined : profile?.data.country
              }
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => handleSubmit()}
            />
          </View>
          {errors.country ? (
            <Text
              style={{
                color: COLORS.danger,
                ...FONTS.body3,
                marginHorizontal: 15,
              }}>
              {errors.country}
            </Text>
          ) : null}
        </View>

        <Pressable
          style={{alignItems: 'center', marginTop: 25, marginBottom: 70}}
          onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={{...FONTS.h4}}>SUBMIT</Text>
          </View>
        </Pressable>

        <ActionButton buttonColor={COLORS.blue} offsetY={10} position="right">
          <ActionButton.Item
            buttonColor={COLORS.primary}
            title="Take Photo"
            onPress={() => choosePhotoFromCamera()}>
            <Icon name="camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Photo"
            onPress={() => choosePhotoFromLibrary()}>
            <Icon name="md-image" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
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
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.blue,
  },
  textContainer: {
    ...FONTS.body3,
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

export default UpdateProfile;
