import React, {useRef, useContext} from 'react';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SIZES, COLORS, FONTS, images} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextInput from '../../components/Form/TextInput';
import Checkbox from '../../components/Form/Checkbox';
import {AuthContext} from '../../navigation/AuthProvider';

const aspectRatio = 750 / 1125;
const height = SIZES.width * aspectRatio;

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Login = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {login} = useContext(AuthContext);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {email: '', password: '', remember: false},
    onSubmit: values => {
      console.log(values);
      login(values.email, values.password);
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
              Welcome back
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                textAlign: 'center',
                marginBottom: SIZES.spacing.m,
              }}>
              Use your credentials below and login to your account
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
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => password.current?.focus()}
                />
              </View>
              <View style={{marginBottom: SIZES.spacing.s}}>
                <TextInput
                  ref={password}
                  icon="lock"
                  placeholder="Enter your Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  autoCapitalize="none"
                  autoCompleteType="password"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  secureTextEntry
                  onSubmitEditing={() => handleSubmit()}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: SIZES.spacing.s,
                }}>
                <Checkbox
                  label="Remember me"
                  checked={values.remember}
                  onChange={() => setFieldValue('remember', !values.remember)}
                />
                <BorderlessButton
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{...FONTS.body3, color: COLORS.blue}}>
                    Forgot password?
                  </Text>
                </BorderlessButton>
              </View>
              <View style={{alignItems: 'center'}}>
                <Pressable onPress={handleSubmit} style={{marginTop: 10}}>
                  <View style={styles.button}>
                    <Text style={{...FONTS.body3, color: COLORS.blue}}>
                      Log into your account
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
            <BorderlessButton onPress={() => navigation.navigate('SignUp')}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    marginRight: 5,
                  }}>
                  Don't have an account?
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.white}}>
                  Sign Up here
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

export default Login;
