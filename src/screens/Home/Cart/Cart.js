import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {v4 as uuidv4} from 'uuid';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {groupBy, chain} from 'lodash';

const Cart = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);

  var x, group;
  var groupedRestaurants;

  const {orderItems} = route.params;
  const getUniqueRestaurant = () => {
    orderItems.map(item => {
      if (!orders.includes(item.name)) {
        orders.push(item.name);
      }
    });
    x = orderItems
      .filter(function (item) {
        var i;
        for (i = 0; i < orders.length; i++) {
          item.name == orders[i];
        }
        return item.name;
      })
      .map(function ({
        name,
        menuId,
        qty,
        price,
        total,
        food,
        location,
        courier,
        rating,
      }) {
        return {
          name,
          menuId,
          qty,
          price,
          total,
          food,
          location,
          courier,
          rating,
        };
      });

    group = x.reduce((r, a) => {
      r[a.name] = [...(r[a.name] || []), a];
      return r;
    }, {});
    groupedRestaurants = chain(x)
      .groupBy('name')
      .map((value, key) => ({id: uuidv4(), name: key, restaurants: value}))
      .value();
    // console.log("GROUPED>>", groupedRestaurants);
  };
  getUniqueRestaurant();

  const renderCards = () => {
    const RenderItem = ({restaurant}) => {
      // console.log("X:", restaurant);
      var total = 0;
      return (
        <View
          style={{
            width: SIZES.width * 0.9,
            backgroundColor: COLORS.blue,
            alignSelf: 'center',
            borderRadius: SIZES.radius,
            marginBottom: SIZES.padding,
            padding: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.white,
            }}>
            {restaurant.name}
          </Text>
          <View>
            {restaurant?.restaurants.map(item => {
              const qty = item.qty;
              total += item.total;
              if (qty > 0) {
                return (
                  <View key={item.menuId} style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 0.3, marginRight: 10}}>
                        <Image
                          source={item.food.photo}
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                          }}
                        />
                      </View>
                      <View style={{flex: 0.7}}>
                        <Text
                          style={{
                            ...FONTS.body5,
                            color: COLORS.white,
                          }}>
                          {item.food.name}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}>
                        {item.qty} ✘ {item.price} = ₹{item.total}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'flex-end',
              borderTopWidth: 2,
              borderTopColor: COLORS.white,
            }}>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.white,
                marginTop: 10,
              }}>
              Total: ₹{total}
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Pressable
              style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius * 2,
                height: 50,
                width: 150,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: {
                    name: restaurant?.name,
                    location: restaurant?.restaurants[0].location,
                    courier: restaurant?.restaurants[0].courier,
                    rating: restaurant?.restaurants[0].rating,
                  },
                })
              }>
              <View>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.blue,
                  }}>
                  Map View
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={groupedRestaurants}
        keyExtractor={(x, index) => index.toString()}
        renderItem={({item}) => <RenderItem restaurant={item} />}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View
      style={{flex: 1, backgroundColor: COLORS.white, marginTop: insets.top}}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Text style={{...FONTS.h5, marginLeft: SIZES.spacing.m}}>Cart</Text>
      </View>
      {renderCards()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default Cart;
