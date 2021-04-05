import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {COLORS, SIZES, images, FONTS} from '../../constants';

const picture = {
  src: images.onboarding4,
  width: 4875,
  height: 4825,
};

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          borderBottomRightRadius: SIZES.borderRadii.xl,
          backgroundColor: COLORS.gray,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={picture.src}
          style={{
            width: SIZES.width - SIZES.borderRadii.xl,
            height:
              ((SIZES.width - SIZES.borderRadii.xl) * picture.height) /
              picture.width,
          }}
        />
      </View>
      <View style={{flex: 1, borderTopLeftRadius: SIZES.borderRadii.xl}}>
        <View
          style={{
            backgroundColor: COLORS.gray,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.borderRadii.xl,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flex: 1,
            padding: SIZES.borderRadii.l,
          }}>
          <Text style={{...FONTS.h2}}>Let's get started</Text>
          <Text
            style={[styles.description, {...FONTS.body4, textAlign: 'center'}]}>
            Login to your account below or signup for an amazing experience
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{marginTop: 10}}>
            <View style={styles.button}>
              <Text style={{...FONTS.body4, color: COLORS.blue}}>
                Have an account ? Login
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
            style={{marginTop: 10}}>
            <View style={styles.button}>
              <Text style={{...FONTS.body4, color: COLORS.blue}}>
                Create account, it's Free
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{marginTop: 10}}>
            <View style={styles.button}>
              <Text style={{...FONTS.body4, color: COLORS.blue}}>
                Forgot password?
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  description: {
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.borderRadii.l,
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
