import React, {useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  Linking,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SIZES, COLORS, FONTS, images} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextInput from '../../components/Form/TextInput';
import {AuthContext} from '../../navigation/AuthProvider';

const aspectRatio = 750 / 1125;
const height = SIZES.width * aspectRatio;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPassword = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {passwordReset} = useContext(AuthContext);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: ForgotPasswordSchema,
    initialValues: {email: ''},
    onSubmit: values => {
      passwordReset(values.email);
      navigation.navigate('PasswordChanged');
    },
  });

  const password = useRef(null);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}>
      <View
        style={{
          height: SIZES.height + (Platform.OS === 'android' ? 0 : 0),
          backgroundColor: COLORS.blue,
        }}>
        <View style={{backgroundColor: COLORS.white}}>
          <View
            style={{
              borderBottomLeftRadius: SIZES.borderRadii.xl,
              overflow: 'hidden',
              height: height * 0.61,
            }}>
            <Image
              source={images.bg_1}
              style={{
                height: height,
                width: SIZES.width,
                borderBottomLeftRadius: SIZES.borderRadii.xl,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, overflow: 'hidden'}}>
          <Image
            source={images.bg_1}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: SIZES.width,
              height: height,
              top: -height * 0.61,
            }}
          />
          <View
            style={{
              borderRadius: SIZES.borderRadii.xl,
              borderTopLeftRadius: 0,
              backgroundColor: COLORS.white,
              flex: 1,
              justifyContent: 'center',
              padding: SIZES.borderRadii.l,
            }}>
            {/* childrens */}
            <Text
              style={{
                ...FONTS.h1,
                textAlign: 'center',
                marginBottom: SIZES.spacing.s,
              }}>
              Forgot password?
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                textAlign: 'center',
                marginBottom: SIZES.spacing.m,
              }}>
              Enter the email address associated with your account
            </Text>

            <View>
              <View style={{marginBottom: SIZES.spacing.s}}>
                <TextInput
                  icon="mail"
                  placeholder="Enter your Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onSubmitEditing={() => handleSubmit()}
                />
              </View>
              {errors.email ? (
                <Text style={{color: COLORS.danger, ...FONTS.body4}}>
                  {errors.email}
                </Text>
              ) : null}

              <View style={{alignItems: 'center'}}>
                <Pressable onPress={handleSubmit} style={{marginTop: 10}}>
                  <View style={styles.button}>
                    <Text style={{...FONTS.body3, color: COLORS.blue}}>
                      Reset password
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        {/* Footer */}
        <View
          style={{
            backgroundColor: COLORS.blue,
            paddingTop: SIZES.spacing.m,
            paddingBottom: SIZES.spacing.l,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginTop: SIZES.borderRadii.m,
              marginBottom: SIZES.borderRadii.s,
            }}>
            <BorderlessButton
              onPress={() => Linking.openURL('mailto:help@support.com')}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    marginRight: 5,
                  }}>
                  Don't work?
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.white}}>
                  Try another way
                </Text>
              </View>
            </BorderlessButton>
          </View>
          <View style={{height: insets.bottom}} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.borderRadii.l,
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgotPassword;
