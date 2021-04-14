import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  INCREASE,
  DECREASE,
  TOGGLE_AMOUNT,
  removeItem,
  REMOVE,
} from '../../../redux/actions';

const CartItem = ({
  price,
  calories,
  description,
  name,
  photo,
  qty,
  increase,
  amount,
  decrease,
  remove,
}) => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.3, marginRight: 10}}>
          <Image
            source={{uri: photo}}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
          />
        </View>
        <View style={{flex: 0.55}}>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.white,
            }}>
            {name}
          </Text>
        </View>
        <View style={{flex: 0.15, alignItems: 'flex-end'}}>
          <Icon
            name="delete-forever"
            size={30}
            color={COLORS.white}
            onPress={() => {
              remove();
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: -5,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <View
          style={{
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            backgroundColor: COLORS.white,
          }}>
          <Pressable
            style={{
              width: 30,
              height: 30,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green',
            }}
            onPress={() => {
              if (qty === 1) {
                return remove();
              } else {
                decrease();
              }
            }}>
            <Text style={{...FONTS.h6}}>-</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: 40,
            height: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h5,
            }}>
            {qty}
          </Text>
        </View>
        <View
          style={{
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: COLORS.white,
          }}>
          <Pressable
            style={{
              width: 30,
              height: 30,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green',
            }}
            onPress={() => {
              increase();
            }}>
            <Text style={{...FONTS.h6}}>+</Text>
          </Pressable>
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
          {qty} ✘ {price} = ₹{qty * price}
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {id, qty} = ownProps;
  return {
    remove: () =>
      dispatch({
        type: REMOVE,
        payload: {
          id,
          qty,
        },
      }),

    increase: () =>
      dispatch({
        type: INCREASE,
        payload: {
          id,
        },
      }),

    decrease: () =>
      dispatch({
        type: DECREASE,
        payload: {
          id,
          qty,
        },
      }),

    toggle: toggle =>
      dispatch({
        type: TOGGLE_AMOUNT,
        payload: {
          id,
          toggle,
        },
      }),
  };
};

const mapStateToProps = state => {
  console.log(state.amount);
  return {amount: state.amount};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
