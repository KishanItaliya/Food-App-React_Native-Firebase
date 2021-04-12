import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateReview} from '../../../firebase/functions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import StarRating from '../Reviews/StarRating';
import {AuthContext} from '../../../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import axios from 'axios';

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

const ReviewCard = ({review, navigation}) => {
  const {user} = useContext(AuthContext);
  const item = review.data;
  const [rating, setRating] = useState();
  const [showModal, setShowModal] = useState(false);
  console.log('RR>>', item);
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
        updateReview(
          values.review,
          rating,
          response.data,
          user.uid,
          item.restaurant_name,
          item.restaurant_id,
          item.payId,
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
      console.log('OKKK', values.review);
      getReviewStatus(values.review);
      setShowModal(!showModal);
      resetForm(values);
    },
  });
  const reviews = useRef(null);

  return (
    <View style={{alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
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
                  setShowModal(!showModal);
                }}
                color={COLORS.white}
              />
            </View>

            <View style={{marginTop: 5}}>
              <StarRating rating={item.rating} />
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
                  defaultValue={item.review}
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
                <Text style={{color: COLORS.blue, ...FONTS.h3}}>SUBMIT</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setShowModal(!showModal);
        }}>
        <View
          style={{
            width: SIZES.width * 0.9,
            backgroundColor: COLORS.primary,
            height: 100,
            borderRadius: 12,
            marginBottom: 10,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={icons.star}
              style={{
                height: 16,
                width: 16,
                tintColor: COLORS.white,
                marginRight: 8,
              }}
            />
            <Text style={{...FONTS.body5, color: COLORS.white}}>
              ({item?.rating})
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.h5, color: COLORS.white}}>
              {item?.review}
            </Text>
          </View>
          <View>
            <Text style={{...FONTS.body5, color: COLORS.blue}}>
              {item?.status}
            </Text>
          </View>
        </View>
      </Pressable>
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
  const {id, name} = store;
  // console.log(id, name);
  return {id, name};
}

export default connect(mapStateToProps)(ReviewCard);
