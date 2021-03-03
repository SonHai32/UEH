import React from 'react';
import cheerio from 'cheerio';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Image,
  Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, SIZES} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import login_bg_1 from '../assets/images/undraw_secure_login_pdn4.png';
import logo from '../assets/images/ueh_logo.png';
import UEH_API from '../modules/API';
const Login = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
    },
    formContainer: {
      width: SIZES.width,
      paddingBottom: SIZES.padding * 6,
      borderTopStartRadius: 50,
      borderTopEndRadius: 50,
      backgroundColor: COLORS.white,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    customInput: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: SIZES.padding,
      height: 50,
      borderColor: COLORS.darkGray,
      borderBottomWidth: 0.5
    },
    input: {
      flex: 1,
      fontSize: SIZES.font * 1.1,
      marginHorizontal: 10,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
    },
    title: {
      marginBottom: 30,
      textAlign: 'center',
      fontSize: SIZES.h1 * 1.5,
      fontWeight: '300',
      fontStyle: 'italic',
      color: COLORS.darkGray,
    },
    btnCustom: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: SIZES.width - 100,
      height: 60,
      marginTop: 20,
      borderRadius: 15,
      backgroundColor: COLORS.secondary,
    },
    ueh: {
      fontSize: SIZES.h1 * 1.5,
      color: '#175993',
      fontWeight: '600',
      fontStyle: 'italic',
      position: 'absolute',
      right: 50,
      top: 200,
    },
    loadingContainer: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: COLORS.white,
    },
  });

  const handleLoginSubmit = async () => {
    const API = new UEH_API();
    const data = await API.getAllData({
      userID: '31201020315',
      userPassword: '21967754',
    });

    console.log(data);
    // const a = await UEH_API.login()
    // console.log(a)
    // const user = await UEH_API.getStudentInfo();
    // console.log(user)
    // Alert.alert(a)
  };
  const [userID, setUserID] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loadingContainer}></View>

        <Animatable.View animation="fadeInUpBig" style={styles.formContainer}>
          <Image source={login_bg_1} style={{width: 150, height: 150}} />
          <Text style={styles.title}>Login to</Text>
          <Text style={styles.ueh}>UEH ❤️</Text>
          <View style={styles.customInput}>
            <FontAwesome name="user-o" color={COLORS.darkGray} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Mã số sinh viên"
              keyboardType="number-pad"
              value={userID}
              onChangeText={(text) => setUserID(text)}></TextInput>
          </View>

          <View style={styles.customInput}>
            <FontAwesome name="lock" color={COLORS.darkGray} size={20} />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Mật khẩu"
              value={userPassword}
              onChangeText={(text) => setUserPassword(text)}></TextInput>
          </View>

          <TouchableOpacity
            style={styles.btnCustom}
            onPress={() => handleLoginSubmit()}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.h3,
                fontWeight: '600',
              }}>
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
