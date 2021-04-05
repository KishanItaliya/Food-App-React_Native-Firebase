import React, {useRef} from 'react';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SIZES, COLORS, FONTS, images} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RoundedIcon from '../../components/RoundedIcon';
import CloseButton from '../../components/CloseButton';

const aspectRatio = 750 / 1125;
const height = SIZES.width * aspectRatio;

const SIZE = 80;

const PasswordChanged = ({navigation}) => {
  const insets = useSafeAreaInsets();

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
            <View style={{alignSelf: 'center'}}>
              <RoundedIcon
                iconRatio={0.7}
                name="check"
                size={SIZE}
                backgroundColor={COLORS.lightBlue}
                color={COLORS.blue}
              />
            </View>
            <Text
              style={{
                ...FONTS.h1,
                textAlign: 'center',
                marginBottom: SIZES.spacing.s,
                marginVertical: SIZES.spacing.l,
              }}>
              Link has been sent to your Email
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                textAlign: 'center',
                marginBottom: SIZES.spacing.m,
              }}>
              Reset your password and login again
            </Text>

            <View>
              <View style={{alignItems: 'center'}}>
                <Pressable
                  onPress={() => navigation.navigate('Login')}
                  style={{marginTop: 10}}>
                  <View style={styles.button}>
                    <Text style={{...FONTS.body3, color: COLORS.blue}}>
                      Login Now
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
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CloseButton onPress={() => navigation.pop()} />
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

export default PasswordChanged;
