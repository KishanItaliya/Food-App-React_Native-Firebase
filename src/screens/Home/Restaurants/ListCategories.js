import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
  LogBox,
} from 'react-native';
import {COLORS, icons, SIZES, images} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const initialCurrentLocation = {
  streetName: 'Kuching',
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

// price rating
const affordable = 1;
const fairPrice = 2;
const expensive = 3;

LogBox.ignoreAllLogs();

const ListCategories = ({data}) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);

  // console.log(data);

  const fetchItems = () => {
    firestore()
      .collection('items')
      .onSnapshot(snapshot =>
        setItems(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  };

  const fetchCategories = () => {
    firestore()
      .collection('categories')
      .onSnapshot(snapshot =>
        setCategory(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
    setRestaurants(data);
  }, []);

  console.log('ITEMS>>', restaurants);
  // console.log('CATEGORIES>>', category);

  const onSelectCategory = category => {
    let restaurantList = data.filter(a =>
      a.data.categories.includes(category.id),
    );
    // console.log('FILTER', restaurantList);
    setSelectedCategory(category);
    setRestaurants(restaurantList);
  };

  const renderMainCategories = () => {
    const renderItem = ({item}) => {
      const product = item.data;
      // console.log('PID', product.id);
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.base,
            paddingBottom: SIZES.base * 2,
            backgroundColor:
              selectedCategory?.id == product.id
                ? COLORS.primary
                : COLORS.white,
            borderRadius: SIZES.radius * 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.base,
            elevation: 5,
          }}
          onPress={() => onSelectCategory(product)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == product.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={{uri: product.icon}}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.base,
              color:
                selectedCategory?.id == product.id
                  ? COLORS.white
                  : COLORS.black,
              fontSize: 12,
              lineHeight: 22,
            }}>
            {product.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={category}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{paddingVertical: SIZES.base * 2}}
      />
    );
  };

  const renderRestaurantList = () => {
    const getCategoryNameById = id => {
      let cat = category.filter(a => a.data.id == id);

      if (cat.length > 0) return cat[0].data.name;
      return '';
    };
    const renderItem = ({item}) => {
      // console.log("ABC", item);
      const product = item.data;
      return (
        <Pressable
          style={{marginBottom: SIZES.base * 2}}
          //onPress => navigate to Restaurant screen
          onPress={() => navigation.navigate('Restaurant', {product})}>
          <View style={{marginBottom: SIZES.base}}>
            <Image
              source={{uri: product.photo}}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 175,
                borderRadius: SIZES.radius,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 1,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {product.duration}
              </Text>
            </View>
          </View>

          {/* Restaurant Info */}
          <Text style={{lineHeight: 24, fontSize: 16}}>{product.name}</Text>
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
            }}>
            <Image
              source={icons.star}
              style={{
                height: 16,
                width: 16,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text style={{lineHeight: 18, fontSize: 14}}>{product.rating}</Text>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              {product.categories.map(categoryId => {
                return (
                  <View style={{flexDirection: 'row'}} key={categoryId}>
                    <Text style={{lineHeight: 18, fontSize: 14}}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{color: COLORS.darkGray, fontSize: 14}}>
                      {' '}
                      .{' '}
                    </Text>
                  </View>
                );
              })}

              {[1, 2, 3].map(priceRating => (
                <Text
                  key={priceRating}
                  style={{
                    lineHeight: 22,
                    fontSize: 16,
                    color:
                      priceRating <= product.priceRating
                        ? COLORS.black
                        : COLORS.darkGray,
                  }}>
                  ₹
                </Text>
              ))}
            </View>
          </View>
        </Pressable>
      );
    };

    return (
      <View>
        {restaurants.length === 0 ? (
          <FlatList
            data={data}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: SIZES.base,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={restaurants}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: SIZES.base,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding: SIZES.base}}>
        {renderMainCategories()}
        {renderRestaurantList()}
      </View>
    </ScrollView>
  );
};

export default ListCategories;
