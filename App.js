/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, UserContext} from './components/context'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import codePush from 'react-native-code-push'

import Login from './screens/login'
import HomeScreen from './screens/MainTabScreen'
import MainTabScreen from './screens/MainTabScreen';
const Stack = createStackNavigator()

const App: () => React$Node = () => {
  const initialLoginState = {
    isLoading: true,
    userData: null
  }

  const loginReducer = (prevState, action) =>{
    switch(action.type){
      case "LOGIN":
        return{
          ...prevState,
          userData: JSON.parse(action.userData),
          isLoading: false
        }
      case "LOGOUT":
        return{
          ...prevState,
          userData: null,
          isLoading: false
        }
      case "REMEMBER_USER":
        return{
          ...prevState,
          isLoading: false,
          userAuth: action.userAuth
        }
        case "CLEAR_USER": 
        return{
          ...prevState,
          userAuth: null
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() =>({
    signIn: async(userData) =>{
      dispatch({type: "LOGIN", userData: userData})
    },
    signOut: async () =>{
      dispatch({type: "LOGOUT"})
    },
    rememberUser: async (userAuth) =>{
      try {
        await AsyncStorage.setItem('user_auth', userAuth)
        dispatch({type: 'REMEMBER_USER', userAuth})
      } catch (error) {
        console.log(error)
      }
    },
    clearUser: async () =>{
      try {
        await AsyncStorage.removeItem('user_auth')
        dispatch({type: 'CLEAR_USER'})
      } catch (error) {
        console.log(error)
      }
    },
  }), [])
  return (
<AuthContext.Provider value={authContext}>

        <UserContext.Provider value={loginState.userData}>
    <NavigationContainer>

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {loginState.userData !== null ? (

      <Stack.Screen name="HOME" component={MainTabScreen} />

      ): 
      (

      <Stack.Screen name="LOGIN" component={Login} />
      )  
    }
    </Stack.Navigator>
  </NavigationContainer>
</UserContext.Provider>

</AuthContext.Provider>

);
}


const codePushOptions = {
checkFrequency: codePush.CheckFrequency.ON_APP_START, installMode: codePush.InstallMode.IMMEDIATE
}
export default codePush(codePushOptions)(App);
