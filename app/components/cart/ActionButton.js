import React from "react";
import {  useSelector } from "react-redux";
import { View, Pressable, TouchableHighlight, StyleSheet, Text, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const ActionButton = ({navigation, emptyCart}) => {

    const { estore } = useSelector((state) => ({ ...state }));

    const styles = StyleSheet.create({
        container: {
            paddingBottom: Platform.OS === "ios" ? 30 : 10,
            paddingTop: 10,
            backgroundColor: "#fff",
            borderTopColor: "#ddd",
            borderTopWidth: 1,
            flexDirection: "row",
            alignItems: "flex-end",
        },
        home: {
            flex: 1,
            margin: 10,
            alignItems: "center",
        },
        action: {
            flex: 7,
            flexDirection: "row",
            alignItems: 'flex-end',
        },
        proceed: {
            flex: 1,
            width: 120,
            height: 35,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            elevation: 3,
            backgroundColor: '#4c8bf5',
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.home}>
                <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                    <Feather name="home" size={24} color={estore.headerColor} />
                </TouchableHighlight>
            </View>
            <View style={styles.action}>
                <Pressable style={{
                    ...styles.proceed,
                    backgroundColor: "#fff",
                    borderColor: "#eee",
                    borderWidth: 1
                }} onPress={() => emptyCart()}>
                    <Text style={{
                        ...styles.text,
                        color: "#666"
                    }}>Empty Cart</Text>
                </Pressable>
                <Pressable style={styles.proceed} onPress={() => ""}>
                    <Text style={styles.text}>Checkout</Text>
                </Pressable>
            </View>
        </View>
    )
}
 
export default ActionButton;