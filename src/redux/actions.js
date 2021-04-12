export const ADD_TO_CART = 'ADD_TO_CART';
export const DECREASE = 'DECREASE';
export const INCREASE = 'INCREASE';
export const REMOVE = 'REMOVE';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_TOTALS = 'GET_TOTALS';
export const TOGGLE_AMOUNT = 'TOGGLE_AMOUNT';
export const CLEAR_RESTAU_ID = 'CLEAR_RESTAU_ID';

export const removeItem = id => {
  return {
    type: REMOVE,
    payload: {id},
  };
};
