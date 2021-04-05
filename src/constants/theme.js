import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  text: 'rgba(12, 13, 52, 0.7)',
  primary: '#F9813A',
  lightPrimary: '#FFD8C2',
  secondary: '#2CB9B0',
  black: '#000',
  white: '#FFF',
  gray: '#F4F0EF',
  lightGray: '#FAFAFA',
  lightGray2: '#EDEDED',
  darkGray: '#8A8D90',
  blue: '#0C0D34',
  lightBlue: '#BFEAF5',
  skyBlue: '#6EB9CC',
  yellow: '#FFC641',
  pink: '#FF87A2',
  violet: '#442CB9',
  danger: '#FF0058',
};

export const SIZES = {
  //Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  //New
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },

  //Font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 19,
  h6: 20,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  //App dimensions
  width,
  height,
};

export const FONTS = {
  h1: {fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h5, lineHeight: 22},
  h6: {fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h6, lineHeight: 24},
  body1: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
