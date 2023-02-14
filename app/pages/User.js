import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import Header from "../components/nav/Header";
import OrderHistory from "../components/user/OrderHistory"
import Login from "../components/auth/Login";

function User({navigation}) {

  const { user } = useSelector((state) => ({ ...state }));

  const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
  });
    
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {user.token && <OrderHistory navigation={navigation} />}
      {!user.token && <Login navigation={navigation} />}
      <Toast />
    </View>
  );
}

export default User;