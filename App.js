import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);

import store from './app/reducers';

import Tabs from "./app/navigation/Tabs";
import Product from "./app/pages/Product";
import OrderDetails from "./app/components/user/OrderDetails";
import LoadDataCenter from "./app/components/common/LoadDataCenter";

import { getAllData } from "./app/functions/asyncstorage";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    getAllData(); //Delete on production
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <Provider store={store}>
      <LoadDataCenter />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
