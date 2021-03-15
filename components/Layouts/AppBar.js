import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '../../constants/theme';
const AppBar = ({title, navigation, navigate}) => {
  const styles = StyleSheet.create({
    container: {
      height: 180,
      borderBottomEndRadius: 100,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginTop: 20,
      fontSize: SIZES.h1,
      color: COLORS.white,
      fontWeight: '800',
    },
    btnBack: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      top: 50,
      left: 20,
    },
    btnBackText: {
      color: COLORS.black,
      fontSize: SIZES.font,
    },
  });
  return (
    <LinearGradient
      colors={COLORS.background}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.navigate(navigate)}>
        <Ionicons name="arrow-back-outline" color={COLORS.black} size={26} />
        <Text style={styles.btnBackText}>Trở vê</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AppBar;
