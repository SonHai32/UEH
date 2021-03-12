import {Dimensions} from 'react-native'


const {width, height} = Dimensions.get('window')

export const COLORS = {

  //basecolor
  
  primary: '#6200ee',
  secondary: '#03DAC5',

  swatch1: '#eee2f0',
  swatch2: '#c0aae2',
  swatch3: '#7018f8',
  swatch4: '#c55849',
  swatch5: '#a353fb',
  swatch6: '#4238cb',

  //color
  black: '#1e1f20',
  white: '#ffffff',
  lightGray: '#f5f5f6',
  lightGray2: '#f6f6f7',
  lightGray3: '#efeff1',
  lightGray4: '#f8f8f9',

  darkGray: '#898c95',
  transparent: 'transparent',

  glass: ['rgba(255,255,255, 0.7)', 'rgba(255,255,255, 0.3)'],
  background: ['#65dfc9', '#6cdbeb'],
  pink: "#E795F7",
  pink_2: '#DD3AA8',
  blue: '#15B7F7',

}


export const SIZES = {
   
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  largeTitle: 50,
  h1: 30,
  h2: 22, 
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  //APP Demension
  width,
  height,
}
const THEME = {COLORS, SIZES}

export default THEME
