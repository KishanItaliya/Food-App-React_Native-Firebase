import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  LogBox,
  Keyboard,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {submitReview} from '../../../firebase/functions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {RectButton} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';
import {AuthContext} from '../../../navigation/AuthProvider';
import {COLORS, FONTS} from '../../../constants';
import StarRating from './StarRating';
import ClassifyReview from './ClassifyReview';

LogBox.ignoreAllLogs();

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

const Reviews = ({route}) => {
  const {user} = useContext(AuthContext);
  const item = route.params;
  // console.log("REVIEW ITEM", item.item);
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState();
  const reviews = useRef(null);

  const handleBackButton = () => {
    console.log('HII');
    Keyboard.dismiss();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

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
        submitReview(
          values.review,
          rating,
          item.item.name,
          response.data,
          user.uid,
        );
      })
      .catch(error => {
        console.warn(error);
      });
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
      getReviewStatus(values.review);
      resetForm(values);
    },
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          backgroundColor: COLORS.white,
          marginTop: insets.top,
        }}
        showsVerticalScrollIndicator={false}>
        <ClassifyReview name={item.item.name} />
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.blue,
          paddingHorizontal: 25,
          paddingTop: 22,
          marginTop: 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}>
          Review
        </Text>
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

          <View>
            <RectButton
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
              <Text style={{color: COLORS.blue, ...FONTS.h3}}>SUBMIT</Text>
            </RectButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default Reviews;
