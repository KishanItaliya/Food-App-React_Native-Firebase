import React, {useState, useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {AuthContext} from '../../../navigation/AuthProvider';
import IoniconsHeader from '../../../components/IoniconsHeader';
import {COLORS, FONTS, SIZES} from '../../../constants';

const Review = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [names, setNames] = useState([
    {
      name: 'Crest Cafe',
    },
    {
      name: 'The Hearty Slice',
    },
    {
      name: 'Shalimar Restaurant',
    },
    {
      name: 'The Raw Herbivore',
    },
    {
      name: 'Namastey Lounge',
    },
    {
      name: 'Dessert First',
    },
  ]);

  const RenderRestaurant = data => {
    const name = data.data;
    return (
      <Pressable onPress={() => navigation.navigate('ReviewContainer', {name})}>
        <View
          style={{
            height: 150,
            width: SIZES.width / 2 - 20,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            marginBottom: 10,
            borderRadius: 10,
            padding: 15,
          }}>
          <Text style={{...FONTS.h3, textAlign: 'center'}}>{name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <IoniconsHeader
        title="FOOD REVIEWS"
        left={{icon: 'arrow-back', onPress: () => navigation.goBack()}}
        right={{
          icon: 'cart',
          onPress: () => navigation.navigate('Cart'),
        }}
        cart
      />
      <FlatList
        data={names}
        renderItem={({item}) => <RenderRestaurant data={item.name} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          marginTop: 10,
          paddingHorizontal: 15,
        }}
      />
    </View>
  );
};

export default connect()(Review);
