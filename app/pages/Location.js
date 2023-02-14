import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

import Header from "../components/nav/Header";
import CountrySelect from "../components/location/CountrySelect";
import Addiv1Select from "../components/location/Addiv1Select";
import Addiv2Select from "../components/location/Addiv2Select";
import Addiv3Select from "../components/location/Addiv3Select";

import { getAllMyCountry } from "../functions/address";
import { storeData, removeData } from "../functions/asyncstorage";

const initialAddress = {
  country: {},
  addiv1: {},
  addiv2: {},
  addiv3: {},
};

const pickerStyle = {
  inputIOS: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 19,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
  },
}

function Location({parentNavigation}) {
  let dispatch = useDispatch();
  
  const [countries, setCountries] = useState([]);
  const [addiv1s, setAddiv1s] = useState([]);
  const [addiv2s, setAddiv2s] = useState([]);
  const [addiv3s, setAddiv3s] = useState([]);
  const [address, setAddress] = useState(initialAddress);

  const { user, location, estore } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllMyCountry();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAllMyCountry = () => {
    if (location.countries && location.countries.length > 0) {
      setCountries(location.countries.map(
        country => { return { ...country, label: country.name, value: country._id } }
      ));
    } else {
      getAllMyCountry().then((res) => {
        setCountries(res.data && res.data.map(
          country => { return { ...country, label: country.name, value: country._id } }
        ));
        dispatch({
          type: "LOCATION_LIST_V",
          payload: { countries: res.data },
        });
      });
    }
  };

  const handleSubmit = () => {
    if (address.addiv3 && address.addiv3._id) {
      dispatch({
        type: "PRODUCT_LIST_V",
        payload: [],
      });
      dispatch({
        type: "CATEGORY_LIST_II",
        payload: [],
      });
      dispatch({
        type: "LOGGED_IN_USER_III",
        payload: { address },
      });
      storeData("estore", { ...estore, userAddress: address });
      dispatch({
          type: "INPUTS_OBJECT_IV",
          payload: {cart: []},
      });
      removeData("cart");
      parentNavigation.navigate("Home", {refresh: Math.floor((Math.random() * 100) + 1)});
    } else {
      Toast.show({
          type: 'error',
          text1: 'No location have entered',
          text2: 'Enter location below'
      });
    }
  };

  const styles = StyleSheet.create({
    heading: {
      backgroundColor: "#fff",
      margin: 15,
      padding: 10,
      borderRadius: 5,
    },
    locationContainer: {
      backgroundColor: "#fff",
      margin: 15,
      borderRadius: 5,
    },
    submit: {
      alignItems: "center",
      marginTop: 20
    },
    button: {
        width: 180,
        height: 50,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#4c8bf5'
    },
  });
    
  return (
    <View>
      <Header navigation={parentNavigation} />
      <View style={styles.heading}>
        <Text>Location</Text>
      </View>
      <View style={styles.heading}>
        <Text style={{ fontSize: 12, color: "#666" }}>
          Place your location below so we may know what products can be delivered to you
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <CountrySelect
          address={address}
          setAddress={setAddress}
          countries={countries}
          setAddiv1s={setAddiv1s}
          setAddiv2s={setAddiv2s}
          setAddiv3s={setAddiv3s}
          sourceAddress={user.address}
          setAddressSaved={() => ""}
          pickerStyle={pickerStyle}
        />
        <Addiv1Select
          address={address}
          setAddress={setAddress}
          countries={countries}
          addiv1s={addiv1s}
          setAddiv2s={setAddiv2s}
          sourceAddress={user.address}
          setAddressSaved={() => ""}
          pickerStyle={pickerStyle}
        />
        <Addiv2Select
          address={address}
          setAddress={setAddress}
          countries={countries}
          addiv1s={addiv1s}
          addiv2s={addiv2s}
          setAddiv3s={setAddiv3s}
          sourceAddress={user.address}
          setAddressSaved={() => ""}
          pickerStyle={pickerStyle}
        />
        <Addiv3Select
          address={address}
          setAddress={setAddress}
          addiv3s={addiv3s}
          sourceAddress={user.address}
          setAddressSaved={() => ""}
          pickerStyle={pickerStyle}
        />
      </View>
      <View style={styles.submit}>
        <Pressable style={styles.button} onPress={() => handleSubmit()}>
          <Text style={{color: "#fff", fontSize: 16}}>Submit</Text>
          </Pressable>
      </View>
      <Toast />
    </View>
  );
}

export default Location;