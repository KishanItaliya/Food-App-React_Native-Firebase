import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {SIZES, icons, COLORS, FONTS} from '../../../constants';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const initialCurrentLocation = {
  streetName: 'Kuching',
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

const SearchItem = ({data}) => {
  const [restaurant, setRestaurant] = useState();
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );
  const restaurants = data;
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          marginTop: SIZES.spacing.l,
          flexDirection: 'row',
          paddingHorizontal: SIZES.spacing.m,
        }}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={24} color={COLORS.blue} />
          <TextInput
            style={{flex: 1, marginLeft: 5, ...FONTS.h3}}
            placeholder="Search the Restaurant"
            // autoFocus={true}
            onChangeText={e => {
              setRestaurant(e), console.log(restaurant);
            }}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        {restaurants
          ?.filter(x => x.data.name.includes(restaurant))
          .map(item => (
            <View key={item?.data.id}>
              <Pressable
                onPress={() =>
                  navigation.navigate('Restaurant', {
                    product: item.data,
                    currentLocation,
                  })
                }>
                <View style={styles.container}>
                  <Image
                    source={{uri: item?.data.photo}}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item?.data.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Image source={icons.star} style={styles.ratingImage} />
                      <Text style={styles.rating}>{item?.data.rating}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderColor: COLORS.blue,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    height: 175,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  nameContainer: {
    position: 'absolute',
    top: 95,
    height: 55,
    width: SIZES.width * 0.4,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  name: {
    ...FONTS.h4,
  },
  ratingImage: {
    height: 16,
    width: 16,
    tintColor: COLORS.blue,
    marginRight: 8,
  },
  rating: {
    lineHeight: 18,
    fontSize: 14,
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 15,
  },
});

export default SearchItem;
