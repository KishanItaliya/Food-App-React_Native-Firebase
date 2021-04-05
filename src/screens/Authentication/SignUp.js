import React, {useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  Button,
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

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref('password')], "Passwords don't match")
    .required('Required'),
  username: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const SignUp = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {register} = useContext(AuthContext);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {username: '', email: '', password: '', remember: false},
    onSubmit: values => {
      console.log(values);
      register(values.email, values.password, values.username);
    },
  });

  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);

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
              Create account
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                textAlign: 'center',
                marginBottom: SIZES.spacing.m,
              }}>
              Let's us know what your name, email and your password
            </Text>

            <View>
              <View style={{marginBottom: SIZES.spacing.s}}>
                <TextInput
                  icon="user"
                  placeholder="Enter your Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => email.current?.focus()}
                />
              </View>
              {/* {errors.username ? <Text style={{color: COLORS.danger, ...FONTS.body4}}>{errors.username}</Text> : null} */}
              <View style={{marginBottom: SIZES.spacing.s}}>
                <TextInput
                  ref={email}
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
              {/* {errors.email ? <Text style={{color: COLORS.danger, ...FONTS.body4}}>{errors.email}</Text> : null} */}
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
                  returnKeyType="next"
                  returnKeyLabel="next"
                  secureTextEntry
                  onSubmitEditing={() => passwordConfirmation.current?.focus()}
                />
              </View>
              <View style={{marginBottom: SIZES.spacing.s}}>
                <TextInput
                  ref={passwordConfirmation}
                  icon="lock"
                  placeholder="Confirm your Password"
                  onChangeText={handleChange('passwordConfirmation')}
                  onBlur={handleBlur('passwordConfirmation')}
                  error={errors.passwordConfirmation}
                  touched={touched.passwordConfirmation}
                  autoCapitalize="none"
                  autoCompleteType="password"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  secureTextEntry
                  onSubmitEditing={() => handleSubmit()}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <Pressable onPress={handleSubmit} style={{marginTop: 10}}>
                  <View style={styles.button}>
                    <Text style={{...FONTS.body3, color: COLORS.blue}}>
                      Create your account
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
            <BorderlessButton onPress={() => navigation.navigate('Login')}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    marginRight: 5,
                  }}>
                  Already have an account?
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.white}}>
                  Login here
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default SignUp;
