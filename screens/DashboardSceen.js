import React, {useEffect} from 'react';

import {COLORS, SIZES} from '../constants/theme';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

import {View, StyleSheet, Image, Text, StatusBar, FlatList, TouchableOpacity, Platform} from 'react-native';
import {UserContext} from '../components/context';
const DashboardSceen = ({navigation}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    userInfoContainer: {
      padding: SIZES.padding * 5,
      flex: 1.5,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomRightRadius: 45,
      borderBottomLeftRadius: 45,
    },
    dashboardContainer: {
      flex: 2,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      paddingTop: SIZES.padding * 5,
    },
    usernameHeading: {
      marginTop: Platform.OS !== 'ios' ? 0 : 15,
      fontSize: SIZES.h1,
      color: COLORS.blue,
      fontWeight: '800',
    },
    smallText: {
      marginTop: 10,
      fontSize: SIZES.h4,
      color: COLORS.blue,
      fontWeight: '600'
    },
    dashboardItems: {
      display: 'flex',
      margin: 5,
      width: SIZES.width <= 400 ? 110 : 128,
      height: SIZES.width <= 400 ? 110 : 128,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const RenderDashBoardItems = () => {
    const data = [
      {
        name: 'Profile',
        label: 'Cá nhân',
        icon: 'person-outline',
      },
      {
        name: 'TestSchedule',
        label: 'Lịch thi',
        icon: 'calendar-outline',
      },

      {
        name: 'Schedule',
        label: 'Lịch học',
        icon: 'calendar-outline',
      },
      {
        name: 'ScoreBoard',
        label: 'Bảng điểm',
        icon: 'reader-outline',
      },
      {
        name: 'Program',
        label: 'Chương trình',
        icon: 'calendar-outline',
      },
      {
        name: 'Notifications',
        label: 'Thông báo',
        icon: 'notifications-outline',
      },
      
    ];


    const handleDashboardItemsPress = name =>{
      navigation.navigate(name)
    }
    return (
      <FlatList
      contentContainerStyle={{justifyContent: 'center' ,alignItems: 'center'}}  
      numColumns={3}
        data={data}
        renderItem={({item}) => (
        

          <TouchableOpacity onPress={() => handleDashboardItemsPress(item.name)}>

{console.log(SIZES.width)}
          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.4)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.8}}
            style={styles.dashboardItems}>
            <Ionicons name={item.icon} size={40} color={COLORS.blue}/>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 14,
                fontWeight: '800',
                marginTop: 10,
              }}>
                {item.label}
            </Text>
          </LinearGradient>


          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <UserContext.Consumer>
      {(user) => (
        <LinearGradient
          colors={['#65dfc9', '#6cdbeb']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.container}>
          <StatusBar barStyle="light-content" />
          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.4)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.8}}
            style={styles.userInfoContainer}>
            <Image
              source={{uri: user.userInfo.avatar}}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'cover',
                borderRadius: 100,
              }}
            />
            <Text style={styles.usernameHeading}>{user.userInfo.name}</Text>
            <Text style={styles.smallText}>{user.userInfo.id}</Text>
          </LinearGradient>
          <View style={styles.dashboardContainer}>
            <RenderDashBoardItems />
          </View>
        </LinearGradient>
      )}
    </UserContext.Consumer>
  );
};

export default DashboardSceen;
