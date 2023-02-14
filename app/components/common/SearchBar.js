import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

function SearchBar({navigation, goBack}) {
    let dispatch = useDispatch();
    
    const { inputs } = useSelector(
        (state) => ({
        ...state,
        })
    );

    const onChangeText = (value) => {
        dispatch({
            type: "INPUTS_OBJECT_V",
            payload: {searchText: value},
        });
    }

    const onSubmitText = () => {
        navigation.navigate("Shop");
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            height: 35,
            width: goBack
                ? Platform.OS === "ios"
                    ? 310
                    : 295
                : Platform.OS === "ios"
                    ? 390
                    : 370,
            margin: 7,
            borderRadius: 5,
            flexDirection: "row",
        },
        icon: {
            marginTop: 7,
        },
        input: {
            height: 29,
            width: "100%",
            margin: 3,
            marginLeft: 7,
            marginRight: 7,
        },
    });
    
    return (
        <View style={styles.container}>
            <EvilIcons name="search" size={24} color="black" style={styles.icon} />
            <TextInput
                style={styles.input}
                onChangeText={value => onChangeText(value)}
                onSubmitEditing={() => onSubmitText()}
                value={inputs.searchText}
                placeholder="Search"
            />
        </View>
    );
}

export default SearchBar;