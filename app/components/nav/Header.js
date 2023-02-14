import React from 'react';
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';

import SearchBar from '../common/SearchBar';

function Header({ navigation, goBack }) {

  const { estore, inputs } = useSelector((state) => ({ ...state }));

  const styles = StyleSheet.create({
    container: {
      backgroundColor: estore.headerColor,
      height: Platform.OS === "ios" ? 100 : 80,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    backIcon: {
      marginBottom: 7,
    },
    cart: {
      marginBottom: 7
    }
  });
  
    return (
      <View style={styles.container}>
        <Text style={styles.backIcon}>
          {goBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="back" size={35} color="white" />
            </TouchableOpacity>
          )}
        </Text>
        <SearchBar navigation={navigation} goBack={goBack} />
        <Text style={styles.cart}>
          {goBack && (
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Ionicons name="cart-outline" size={28} color="#fff" />
              {inputs.cart && inputs.cart.length > 0 &&
                <View style={{ position: "absolute", top: -5, right: -5 }}>
                  <Badge size={20}>
                    {inputs.cart.map(p => p.count).reduce((a, b) => a + b, 0)}
                  </Badge>
                </View>
              }
            </TouchableOpacity>
          )}
        </Text>
      </View>
    );
}

export default Header;