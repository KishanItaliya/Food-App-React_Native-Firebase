import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  TOGGLE_AMOUNT,
  ADD_TO_CART,
} from './actions';

// initial store
const initialStore = {
  cart: [],
  total: 0,
  amount: 0,
};

function reducer(state = initialStore, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let addToCart;
      if (state.cart.length == 0) {
        addToCart = [...state.cart, action.payload];
        state.amount = state.amount + 1;
      } else {
        state.cart.map(cartItem => {
          if (cartItem.id !== action.id) {
            addToCart = [...state.cart, action.payload];
          } else {
            addToCart = [...state.cart];
          }
          return addToCart;
        });
      }

      return {
        ...state,
        cart: addToCart,
        amount: state.amount + 1,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        amount: 0,
      };

    case DECREASE:
      let tmpCart = state.cart.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          cartItem = {...cartItem, qty: cartItem.qty - 1};
        }
        return cartItem;
      });

      return {
        ...state,
        cart: tmpCart,
        amount: state.amount - 1,
      };

    case INCREASE:
      let tempCart = state.cart.map(cartItem => {
        // console.log(cartItem.id);
        if (cartItem.id === action.payload.id) {
          cartItem = {...cartItem, qty: cartItem.qty + 1};
        }
        return cartItem;
      });

      return {
        ...state,
        cart: tempCart,
        amount: state.amount + 1,
      };

    case REMOVE:
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id),
        amount: state.amount - action.payload.qty,
      };

    case GET_TOTALS:
      let {total, amount} = state.cart.reduce(
        (cartTotal, cartItem) => {
          const {price, qty} = cartItem;
          const itemTotal = price * qty;

          cartTotal.total += itemTotal;
          cartTotal.amount += qty;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      return {...state, total, amount};

    case TOGGLE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map(cartItem => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.toggle === 'inc') {
              return (cartItem = {...cartItem, amount: cartItem.amount + 1});
            }
            if (action.payload.toggle === 'dec') {
              return (cartItem = {...cartItem, amount: cartItem.amount - 1});
            }
          }
          return cartItem;
        }),
      };

    default:
      return state;
  }
}

export default reducer;
