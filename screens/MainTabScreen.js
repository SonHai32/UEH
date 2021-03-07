import React from 'react';

import {COLORS, SIZES} from '../constants/theme';

import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen'
const Tab = createBottomTabNavigator();


const MainTabScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false}}
      initialRouteName="al"
      style={{flex: 1, backgroundColor: '#000000'}}>
      <Tab.Screen
        name="al"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name="home-outline"
              size={props.size}
              color={COLORS.secondary}
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabScreen;
