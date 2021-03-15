import React from 'react';

import {COLORS, SIZES} from '../constants/theme';

import AppBar from '../components/Layouts/AppBar';
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import {UserContext} from '../components/context';
const ProfileScreen = ({navigation}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      position: 'relative',
    },
    overlayContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    avatarContainer: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: SIZES.padding * 5,
    },
    avatar: {
      width: 200,
      height: 200,
      borderRadius: 100,
      resizeMode: 'cover',
    },
    userTextName: {
      fontSize: SIZES.h1,
      color: COLORS.blue,
      fontWeight: '800',
      marginTop: 10,
    },
    infoContainer: {
      flex: 2,
      display: 'flex',
      flexDirection: 'column',
      marginTop: 40,
      padding: SIZES.padding * 2,
    },
    infoItems: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoItemsLabel: {
      flex: 1,
      color: COLORS.black,
      fontSize: SIZES.h4,
      fontWeight: '800',
    },
    infoItemsData: {
      flex: 2.5,
      color: COLORS.black,
      fontWeight: '400'
    },
    btnBack: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      top: 50,
      left: 20,
    },
  });
  const RenderUserInfo = (user) => {
    return Object.keys(user).map((val, key) => {
      return (
        <View key={`v-${val}`} style={styles.infoItems}>
          <Text key={`t-${val}`} style={styles.infoItemsLabel}>
            {' '}
            {val === 'id'
              ? 'MSSV: '
              : val === 'name'
              ? 'Họ và tên: '
              : val === 'birthDate'
              ? 'Ngày sinh: '
              : val === 'place'
              ? 'Nơi sinh: '
              : val === 'gender'
              ? 'Giới tính: '
              : val === 'email'
              ? 'Email: '
              : val === 'emailUEH'
              ? 'Email UEH: '
              : val === 'avatar'
              ? ''
              : ''}{' '}
          </Text>
          <Text key={`user-${val}`} style={styles.infoItemsData}>
            {' '}
            {val === 'avatar' ? null : user[val]}{' '}
          </Text>
        </View>
      );
    });
  };
  const test = (user) => {
    for (const [key, value] of Object.entries(user)) {
      console.log(`${key}: ${value}`);
    }
  };
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
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.container}>
            <LinearGradient
              colors={COLORS.glass}
              start={{x: 1, y: 0}}
              end={{x: 0.4, y: 1}}
              style={styles.container}>
              <AppBar
                navigation={navigation}
                navigate={'Dashboard'}
                title={'Thông tin cá nhân'}
              />
              <View style={styles.avatarContainer}>
                <Image
                  source={{uri: user.userInfo.avatar}}
                  style={styles.avatar}
                />
                <Text style={styles.userTextName}>{user.userInfo.name}</Text>
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
