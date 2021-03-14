import React, {useEffect} from 'react';

import {COLORS, SIZES} from '../constants/theme';

import {FlatGrid} from 'react-native-super-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {UserContext} from '../components/context';
const ProfileScreen = ({navigation}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      position: 'relative'
    },
    overlayContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    },
    avatarContainer: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: SIZES.padding * 10,
      
    },
    avatar:{
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    userTextName: {
        fontSize: SIZES.h1,
        color: COLORS.blue,
        fontWeight: '200',
        marginTop: 10
        
    },
    infoContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        padding: SIZES.padding * 2,
    },
    infoItems:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoItemsLabel: {
        flex: 1,
        color: COLORS.black,
        fontSize: SIZES.h4,
        fontWeight: '500'
    },
    infoItemsData: {
      flex: 2.5,
      color: COLORS.black
    },
    btnBack:{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      top: 50,
      left: 20
    }
  });
  const RenderUserInfo = (user) =>{
return Object.keys(user).map((val, key)=>{
return(
              <View key={`v-${val}`} style={styles.infoItems}>
                <Text key={`t-${val}`} style={styles.infoItemsLabel}> {val === 'id' ? 'MSSV: ': val === 'name' ? 'Họ và tên: ' : val === 'birthDate' ? 'Ngày sinh: ': val === 'place' ? 'Nơi sinh: ' : val === 'gender' ? 'Giới tính: ' : val === 'email' ? 'Email: ' : val === 'emailUEH' ? 'Email UEH: ' : val === 'avatar' ? '' : ''} </Text> 
                <Text key={`user-${val}`} style={styles.infoItemsData}> {val === 'avatar' ? null : user[val]} </Text> 
              </View>
          )
      })
  }
  const  test = (user) =>{
      
    for (const [key, value] of Object.entries(user)){
        console.log(`${key}: ${value}`)
    }
  } 
  return (
    <UserContext.Consumer>
      {(user) => (
        <LinearGradient
          colors={COLORS.background}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.container}>
          <StatusBar barStyle="dark-content" />

          <LinearGradient
            colors={COLORS.glass}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.container}>
            <LinearGradient
              colors={COLORS.glass}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={styles.container}>
                  <TouchableOpacity style={styles.btnBack} onPress = {() => navigation.navigate('Dashboard')}>
                    <Ionicons name='arrow-back-outline' color={COLORS.black} size={26} />
                    <Text style={{color: COLORS.black, fontSize: SIZES.font}}>Trở vê</Text>
                  </TouchableOpacity>
              <View style={styles.avatarContainer}>
                <Image
                  source={{uri: user.userInfo.avatar}}
                  style={styles.avatar}
                />
                <Text style={styles.userTextName}>
                    {user.userInfo.name}
                </Text>
              </View>
              <View style={styles.infoContainer}> 
                {RenderUserInfo(user.userInfo)}
              </View>
            </LinearGradient>
          </LinearGradient>
        </LinearGradient>
      )}
    </UserContext.Consumer>
  );
};

export default ProfileScreen;
