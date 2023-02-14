import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Location from "../pages/Location";
import Cart from "../pages/Cart";
import User from "../pages/User";

const Tab = createBottomTabNavigator();

function Tabs({navigation}) {  

  const { estore, inputs } = useSelector((state) => ({ ...state }));

  return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: estore.headerColor,
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Home" options={{
              headerShown: false,
              tabBarIcon: () => (
                  <View>
                    <Feather name="home" size={24} color={estore.headerColor} />
                  </View>
              )
          }}
        >
          {props => <Home {...props} parentNavigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Shop" options={{
              headerShown: false,
              tabBarIcon: () => (
                  <View>
                    <Feather name="shopping-bag" size={24} color={estore.headerColor} />
                  </View>
              )
          }}
        >
          {props => <Shop {...props} parentNavigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Location" options={{
              headerShown: false,
              tabBarIcon: () => (
                  <View>
                    <EvilIcons name="location" size={30} color={estore.headerColor} />
                  </View>
              )
          }}
        >
          {props => <Location {...props} parentNavigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Cart" options={{
              headerShown: false,
              tabBarIcon: () => (
                  <View>
                    <Ionicons name="cart-outline" size={28} color={estore.headerColor} />
                  </View>
              ),
              tabBarBadge: inputs.cart && inputs.cart.length > 0 
                ? inputs.cart.map(p => p.count).reduce((a, b) => a + b, 0)
                : null,
              tabBarStyle: { display: "none" },
          }}
        >
          {props => <Cart {...props} parentNavigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="User" options={{
              headerShown: false,
              tabBarIcon: () => (
                  <View>
                    <FontAwesome name="user-o" size={24} color={estore.headerColor} />
                  </View>
              )
          }}
        >
          {props => <User {...props} parentNavigation={navigation} />}
        </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Tabs;