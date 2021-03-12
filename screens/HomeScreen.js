import React, {useEffect} from 'react';

import {COLORS, SIZES} from '../constants/theme';

import {FlatGrid} from 'react-native-super-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

import {View, StyleSheet, Image, Text, StatusBar, Animated, TouchableOpacity} from 'react-native';
import {UserContext} from '../components/context';
const HomeScreen = () => {
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
      borderBottomEndRadius: 45,
      borderBottomStartRadius: 45,
      borderBottomWidth: 1,
      borderColor: '#fff',
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
      marginTop: 15,
      fontSize: SIZES.h1,
      color: COLORS.blue,
      fontWeight: '200',
    },
    smallText: {
      marginTop: 10,
      fontSize: SIZES.h4,
      color: COLORS.blue,
    },
    dashboardItems: {
      display: 'flex',
      width: 128,
      height: 128,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const RenderDashBoardItems = () => {
    const data = [
      {
        name: 'Cá nhân',
        icon: 'person-outline',
      },
      {
        name: 'Lịch thi',
        icon: 'calendar-outline',
      },

      {
        name: 'Lịch học',
        icon: 'calendar-outline',
      },
      {
        name: 'Bảng điểm',
        icon: 'reader-outline',
      },
      {
        name: 'Chương trình',
        icon: 'calendar-outline',
      },
      {
        name: 'Thông báo',
        icon: 'notifications-outline',
      },
      
    ];

    return (
      <FlatGrid
        itemDimension={120}
        data={data}
        renderItem={({item}) => (

          <TouchableOpacity>

          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.4)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.8}}
            style={styles.dashboardItems}>
            <Ionicons name={item.icon} size={40} color={COLORS.pink_2}/>
            <Text
              style={{
                color: COLORS.pink_2,
                fontSize: 14,
                fontWeight: '500',
                marginTop: 10,
              }}>
                {item.name}
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
            {/* <Image
              source={{uri: user.userInfo.avatar}}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'cover',
                borderRadius: 100,
              }}
            /> */}
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

export default HomeScreen;
