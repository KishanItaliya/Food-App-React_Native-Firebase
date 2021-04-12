import React, {useState, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Button,
  TextInput,
  Pressable,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS, FONTS, SIZES} from '../../../constants';
import SuggestionRow from './SuggestionRow';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import StarRating from '../Reviews/StarRating';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {saveReview} from '../../../firebase/functions';
import axios from 'axios';
import {AuthContext} from '../../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {CLEAR_RESTAU_ID} from '../../../redux/actions';

const getRating = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('review');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const ReviewSchema = Yup.object().shape({
  review: Yup.string().min(2, 'Too Short!').required('Required'),
});

const Explore = ({name, navigation, dispatch}) => {
  const {user} = useContext(AuthContext);
  const [rating, setRating] = useState();
  const [showModal, setShowModal] = useState(true);

  getRating()
    .then(rating => setRating(rating))
    .catch(error => console.log('ERROR', error));

  const getReviewStatus = review => {
    axios
      .post(
        'http://ec2-13-127-176-96.ap-south-1.compute.amazonaws.com/predict',
        {
          review: review,
        },
      )
      .then(response => {
        console.log('AXIOS::', response.data);
        saveReview(values.review, rating, response.data, user.uid, name);
      })
      .catch(error => {
        console.warn(error);
      });
    dispatch({type: CLEAR_RESTAU_ID});
  };
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    resetForm,
  } = useFormik({
    validationSchema: ReviewSchema,
    initialValues: {
      review: '',
    },
    onSubmit: values => {
      console.log('OKKK');
      getReviewStatus(values.review);
      // setShowModal(!showModal);
      resetForm(values);
    },
  });
  const reviews = useRef(null);
  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
        {/* <GooglePlacesAutocomplete
          placeholder="Where are you going?"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          styles={{
            textInput: styles.textInput,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDMNOQfBTH53qDTT2H1tCIw6iigqUz6nxw',
            language: 'en',
            types: '(cities)',
          }}
          suppressDefaultStyles
          renderRow={item => <SuggestionRow item={item} />}
        /> */}
        {/* <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
              console.log('Modal has been closed.');
              navigation.navigate('Restaurants');
            }}>
            <View style={styles.modal}>
              <View
                style={{
                  paddingHorizontal: 25,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.white,
                    }}>
                    Review
                  </Text>
                  <Icon
                    name="close"
                    size={32}
                    onPress={() => {
                      setShowModal(!showModal),
                        navigation.navigate('Restaurants');
                    }}
                    color={COLORS.white}
                  />
                </View>

                <View style={{marginTop: 5}}>
                  <StarRating rating={2} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 5,
                      marginHorizontal: 5,
                    }}>
                    <Icon name="rate-review" size={24} color={COLORS.white} />
                    <TextInput
                      style={{
                        ...FONTS.h3,
                        flex: 1,
                        marginLeft: 5,
                        color: COLORS.white,
                      }}
                      placeholder="Enter Review..."
                      placeholderTextColor={COLORS.skyBlue}
                      onChangeText={handleChange('review')}
                      onBlur={handleBlur('review')}
                      autoCapitalize="none"
                      returnKeyType="go"
                      returnKeyLabel="go"
                      onSubmitEditing={() => {
                        handleSubmit();
                      }}
                      value={values.review}
                      ref={reviews}
                    />
                    {errors.review ? (
                      <Text style={{color: COLORS.danger, ...FONTS.h5}}>
                        {errors.review}
                      </Text>
                    ) : null}
                  </View>

                  <Pressable
                    style={[
                      styles.btnContainer,
                      {
                        marginTop: 15,
                        marginBottom: 20,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      },
                    ]}
                    onPress={() => handleSubmit()}>
                    <Text style={{color: COLORS.blue, ...FONTS.h3}}>
                      SUBMIT
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Button
            title="Click To Submit Review"
            onPress={() => {
              setShowModal(!showModal);
            }}
          />
        </View> */}
        <Text>Map View</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    ...FONTS.h5,
    marginBottom: 20,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.borderRadii.m,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  iconContainer: {
    backgroundColor: '#e7e7e7',
    padding: 7,
    borderRadius: 10,
    marginRight: 15,
  },
  locationText: {},
  modal: {
    position: 'absolute',
    left: SIZES.width * 0.08,
    top: SIZES.height * 0.26,
    height: 240,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    elevation: 10,
    borderRadius: SIZES.borderRadii.l,
  },
  btnContainer: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

function mapStateToProps(store) {
  const {name} = store;
  console.log(name);
  return {name};
}

export default connect(mapStateToProps)(Explore);
