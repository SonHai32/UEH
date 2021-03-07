import React, {useEffect} from 'react';

import {COLORS, SIZES} from '../constants/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {View, StyleSheet, Image, Text} from 'react-native';
import {UserContext} from '../components/context';
const HomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    },
  });


  const [userInfo, setUserInfo] = React.useState("")

  return (
        <View style={styles.container}>
            <UserContext.Consumer>
                {user =>(
                    <View>
                        <Image source={{uri: user.userInfo.avatar }} style={{width: 200,height: 200, resizeMode: 'cover', borderRadius: 100}} />
                    </View>
                )}
            </UserContext.Consumer>
        </View>
  );
};

export default HomeScreen;
