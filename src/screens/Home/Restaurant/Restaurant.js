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

const Restaurant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  });

  const editOrder = (action, menuId, price, food) => {
    let orderList = orderItems.slice();
    let item = orderList.filter(a => a.menuId == menuId);
    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
          food: food,
          name: restaurant?.name,
          location: restaurant?.location,
          courier: restaurant?.courier,
          rating: restaurant?.rating,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  };

  const getOrderQty = menuId => {
    let orderItem = orderItems.filter(a => a.menuId == menuId);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  };

  const getBasketItemCount = () => {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  };

  const sumOrder = () => {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  };

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
                    }}>
                    <View
                      style={{
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                        backgroundColor: COLORS.white,
                      }}>
                      <RectButton
                        style={{
                          width: 50,
                          height: 50,
                          borderTopLeftRadius: 25,
                          borderBottomLeftRadius: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() =>
                          editOrder('-', item.menuId, item.price, item)
                        }>
                        <Text style={{...FONTS.h1}}>-</Text>
                      </RectButton>
                    </View>

                    <View
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          ...FONTS.h5,
                        }}>
                        {getOrderQty(item.menuId)}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        backgroundColor: COLORS.white,
                      }}>
                      <RectButton
                        style={{
                          width: 50,
                          height: 50,
                          borderTopRightRadius: 25,
                          borderBottomRightRadius: 25,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() =>
                          editOrder('+', item.menuId, item.price, item)
                        }>
                        <Text style={{...FONTS.h1}}>+</Text>
                      </RectButton>
                    </View>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: SIZES.base * 2,
                paddingHorizontal: SIZES.base * 3,
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
              }}>
              <Text style={{...FONTS.h3}}>
                {getBasketItemCount()} items in Cart
              </Text>
              <Text style={{...FONTS.h3}}>₹{sumOrder()}</Text>
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
              </View>

              <View style={{flexDirection: 'row'}}>
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
            </View>
            {/* Order Button */}
            <View
              style={{
                padding: SIZES.base * 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{
                  width: SIZES.width * 0.9,
                  padding: SIZES.base,
                  backgroundColor: COLORS.blue,
                  alignItems: 'center',
                  borderRadius: SIZES.radius,
                }}
                onPress={() => {
                  // console.log("RESTAU>>>", restaurant?.name),
                  //   navigation.navigate("OrderDelivery", {
                  //     restaurant: restaurant,
                  //     curentLocation: curentLocation,
                  //   });
                  navigation.navigate('Cart', {orderItems});
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h6,
                  }}>
                  Go to Cart
                </Text>
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

export default Restaurant;
