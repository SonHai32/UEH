import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import * as Animatable from 'react-native-animatable';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, SIZES} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import login_bg_1 from '../assets/images/undraw_secure_login_pdn4.png';
import logo from '../assets/images/ueh_logo.png';
import UEH_API from '../modules/API';
import {AuthContext} from '../components/context'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
    },
    formContainer: {
      width: SIZES.width,
      borderTopLeftRadius: 120,
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
      position: 'relative',
      marginBottom: 80
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
    checkboxContainer:{
      marginTop: 10,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  });

  const {signIn, rememberUser, clearUser} = React.useContext(AuthContext)

  const handleLoginSubmit = async ({userID, userPassword, rememberChecked}) => {
    setLoading(true)
    if(rememberChecked){
      await rememberUser( JSON.stringify({userID, userPassword}))
    }
    else{
      await clearUser()
    }
    try {
      const API = new UEH_API();
      const data = await API.getAllData({
        userID: userID,
        userPassword: userPassword,
    });

      signIn(JSON.stringify(data))

    } catch (error) {
      console.log(error)
      Alert.alert("Đăng nhập thất bại\n\n" + error.toString())  
    }
    setLoading(false) 
    
    
    // const a = await UEH_API.login()
    // console.log(a)
    // const user = await UEH_API.getStudentInfo();
    // console.log(user)
    // Alert.alert(a)
  };

  const [data, setData] = React.useState({
    userID: '',
    userPassword: '',
    toggleShowPassword: true,
    checkboxValue: false
  })

  const [isLoading, setLoading] = React.useState(false)
  const handleIDChange = (val) =>{
    setData({
      ...data,
      userID: val
    })
  }

  const handlePasswordChange = (val) =>{
    setData({
      ...data,
      userPassword: val
    })
  }
  const toggleShowPassword = () =>{
    setData({
      ...data,
      toggleShowPassword: !data.toggleShowPassword
    })
  }

  useEffect(() => {
    const getRememberUser = async() =>{
      const user_auth = await AsyncStorage.getItem('user_auth')
      if(user_auth !== null)
      {

        const {userID, userPassword} = JSON.parse(user_auth)
        setData({
          ...data,
          checkboxValue: true,
          userID,
          userPassword
        })

      }

    }
    getRememberUser()
  }, [])
  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

          <LinearGradient colors={COLORS.background} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.container}>
        <AuthContext.Consumer>
          {context =>(
<Animatable.View animation="fadeInUpBig">

          <LinearGradient colors={COLORS.glass} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.formContainer}>
          <LinearGradient colors={COLORS.glass} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.formContainer}>

  <StatusBar barStyle='light-content'></StatusBar>
          <Image source={login_bg_1} style={{width: 150, height: 150 , resizeMode:'center'}} />
          <Text style={styles.title}>Login to</Text>
          <Text style={styles.ueh}>UEH ❤️</Text>
          <View style={styles.customInput}>
            <FontAwesome name="user-o" color={COLORS.darkGray} size={20} />
            <TextInput
              editable={!isLoading}
              style={styles.input}
              placeholder="Mã số sinh viên"
              keyboardType="number-pad"
              value={data.userID}
              onChangeText={(text) => handleIDChange(text)}></TextInput>
          </View>

          <View style={styles.customInput}>
            <FontAwesome name="lock" color={COLORS.darkGray} size={20} />
            <TextInput
              editable={!isLoading}
              style={styles.input}
              secureTextEntry={data.toggleShowPassword}
              placeholder="Mật khẩu"
              value={data.userPassword}
              onChangeText={(text) => handlePasswordChange(text)}></TextInput>
              <TouchableOpacity onPress={() => toggleShowPassword()} disabled={isLoading}>
                <FontAwesome name="eye" color={COLORS.darkGray} size={20} />
              </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox value={data.checkboxValue} onValueChange={val => setData({...data, checkboxValue: val})} style={{width: 20, height: 20, marginRight: 10}} onFillColor='rgba(255,255,255,0)' onCheckColor={COLORS.darkGray} onTintColor={COLORS.darkGray} onAnimationType="one-stroke" offAnimationType="one-stroke" disabled={isLoading} />
            <Text style={{flex: 1, fontSize: SIZES.font, color: COLORS.darkGray}}>
              Ghi nhớ tài khoản 
            </Text>
          </View>

          <LinearGradient colors={COLORS.background} start={{x: 0, y: 1}} end={{x: 1, y: 0}} style={styles.btnCustom}>
          <TouchableOpacity
          disabled={isLoading}
            onPress={() => handleLoginSubmit({userID: data.userID, userPassword: data.userPassword, rememberChecked: data.checkboxValue})}>
              
              {isLoading ? (

            <ActivityIndicator size='large' color={COLORS.white} />
              ) : (
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.h3,
                fontWeight: '600',
              }}>
              Đăng Nhập
            </Text>
              )
}
          </TouchableOpacity>
</LinearGradient>
</LinearGradient>
</LinearGradient>
        </Animatable.View>
          )}

        

        </AuthContext.Consumer>
        
</LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
