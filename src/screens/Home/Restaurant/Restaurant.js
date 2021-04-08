import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RectButton} from 'react-native-gesture-handler';
import {icons, COLORS, SIZES, FONTS} from '../../../constants';
import {connect} from 'react-redux';
import {ADD_TO_CART} from '../../../redux/actions';

const Restaurant = ({route, navigation, add_to_cart, total, amount}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  });

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.base * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.base * 3,
              borderRadius: SIZES.radius * 2,
              backgroundColor: COLORS.lightGray2,
            }}>
            <Text style={{...FONTS.body3}}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.base * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.skyBlue, COLORS.blue, COLORS.skyBlue],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {restaurant?.menu.map((item, index) => (
            <View key={`menu-${index}`} style={{alignItems: 'center'}}>
              <View style={{height: SIZES.height * 0.65}}>
                {/* Image */}
                <View style={{height: SIZES.height * 0.35}}>
                  <Image
                    source={item.photo}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width,
                      height: '100%',
                    }}
                  />

                  {/* Quantity */}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      width: SIZES.width,
                      height: 50,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      style={{
                        width: SIZES.spacing.xl * 4,
                        height: 40,
                        padding: SIZES.base,
                        backgroundColor: COLORS.blue,
                        alignItems: 'center',
                        borderRadius: SIZES.radius * 2,
                      }}
                      onPress={() => {
                        add_to_cart(item, restaurant?.name);
                        navigation.navigate('Cart');
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h6,
                        }}>
                        Add to Cart
                      </Text>
                    </Pressable>
                  </View>
                </View>
                {/* Name & Description */}
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: 'center',
                    marginTop: 15,
                    paddingHorizontal: SIZES.base * 2,
                  }}>
                  <Text
                    style={{
                      marginVertical: 10,
                      textAlign: 'center',
                      ...FONTS.h6,
                    }}>
                    {item.name} - ₹{item.price.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body5,
                      textAlign: 'center',
                    }}>
                    {item.description}
                  </Text>
                </View>

                {/* Calories */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={icons.fire}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                    }}
                  />

                  <Text
                    style={{
                      ...FONTS.body5,
                      color: COLORS.darkGray,
                    }}>
                    {item.calories.toFixed(2)} cal
                  </Text>
                </View>

                {/* Reviews */}
                <Pressable
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('Reviews', {item})}>
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: COLORS.blue,
                    }}>
                    Check Reviews {`>>`}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        <View>
          {renderDots()}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: SIZES.base * 2,
                paddingHorizontal: SIZES.base * 3,
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
              }}>
              <Text style={{...FONTS.h3}}>{amount} items in Cart</Text>
              <Text style={{...FONTS.h3}}>₹{total}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: SIZES.base * 2,
                paddingHorizontal: SIZES.base * 3,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.pin}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkgray,
                  }}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body5,
                  }}>
                  Location
                </Text>
              </View> */}

            {/* <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.master_card}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkGray,
                  }}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body5,
                  }}>
                  8888
                </Text>
              </View>
            </View> */}
            {/* Order Button */}
            <View
              style={{
                padding: SIZES.base * 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{
                  width: SIZES.width * 0.6,
                  height: 40,
                  padding: SIZES.base,
                  backgroundColor: COLORS.blue,
                  alignItems: 'center',
                  borderRadius: SIZES.radius * 2,
                }}
                onPress={() => {
                  // console.log("RESTAU>>>", restaurant?.name),
                  //   navigation.navigate("OrderDelivery", {
                  //     restaurant: restaurant,
                  //     curentLocation: curentLocation,
                  //   });
                  navigation.navigate('Cart');
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h6,
                    }}>
                    GO TO CART
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          {isIphoneX() && (
            <View
              style={{
                position: 'absolute',
                bottom: -34,
                left: 0,
                right: 0,
                height: 34,
                backgroundColor: COLORS.white,
              }}></View>
          )}
        </View>
      </View>
    );
  };

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFoodInfo()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    add_to_cart: (item, name) =>
      dispatch({
        type: ADD_TO_CART,
        id: item.menuId,
        payload: {
          restaurant: name,
          // item: {
          id: item.menuId,
          name: item.name,
          calories: item.calories,
          description: item.description,
          photo: item.photo,
          price: item.price,
          qty: 1,
          // },
        },
      }),
  };
};

const mapStateToProps = store => {
  const {cart, total, amount} = store;
  return {cart, total, amount};
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
