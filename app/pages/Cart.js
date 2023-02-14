import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import NumberFormat from "react-number-format";
import { AntDesign } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input'
import Toast from 'react-native-toast-message';

import Header from "../components/nav/Header";
import TableHeader from "../components/common/table/TableHeader";
import TableBody from "../components/common/table/TableBody";
import ActionButton from "../components/cart/ActionButton";

import { storeData, removeData } from "../functions/asyncstorage";
import { emptyUserCart } from "../functions/user";

const noImage = "../images/noimage.jpg";

function Cart({navigation}) {
    let dispatch = useDispatch();

    const { inputs, estore, user } = useSelector((state) => ({ ...state }));

    const handleQuantityChange = (value, product) => {
        let {cart} = inputs;
        const newCart = cart.map((prod) =>
            prod._id === product._id && prod.variant === product.variant
                ? prod = { ...prod, count: value }
                : prod
        );
        dispatch({
            type: "INPUTS_OBJECT_III",
            payload: {cart: newCart},
        });
        storeData("cart", newCart);
    };
    
    const handleRemove = (product) => {
        let {cart} = inputs;
        const newCart = cart.filter((prod) =>
            prod._id !== product._id || prod.variant !== product.variant
        );
        dispatch({
            type: "INPUTS_OBJECT_III",
            payload: {cart: newCart},
        });
        storeData("cart", newCart);
    };

    const emptyCart = () => {
        dispatch({
            type: "INPUTS_OBJECT_III",
            payload: {cart: []},
        });
        removeData("cart");
        user.token && emptyUserCart(user.token).then(() => {
            Toast.show({
                type: 'info',
                text1: 'Cart is now empty',
                text2: 'No more products in the cart'
            });
        });
    };

    const columns = [
        {
            key: "image",
            label: `Cart (${inputs.cart.length})`,
            content: (product) =>
                <Image source={
                    product.images.length
                        ? { uri: product.images[0].url }
                        : require(noImage)
                    }
                    style={{ width: 60, height: 60, margin: 10, marginTop:18 }}
                />,
            row: 1,
        },
        {
            key: "title",
            label: "",
            content: (product) =>
                <Text style={{ fontSize: 12 }}>
                    {product.title}
                </Text>,
            row: 1,
            style: {
                flex: 8,
            }
        },
        {
            key: "variant",
            label: "",
            content: (product) =>
                <Text style={{ fontSize: 12 }}>
                    {product.variants.filter(v => v._id === product.variant)[0].name}
                </Text>,
            row: 1,
            style: {
                flex: 4,
            }
        },
        {
            key: "action",
            label: "",
            content: (product) =>
                <TouchableOpacity onPress={() => handleRemove(product)}>
                    <AntDesign name="delete" size={13} color="red" style={{marginLeft: 5}} />
                </TouchableOpacity>,
            row: 1,
            style: {
                flex: 2,
            }
        },
        {
            key: "price",
            label: "Price",
            content: (product) =>
                <View>
                    <NumberFormat
                        value={product.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={estore.country.currency}
                        renderText={(value) => <Text style={{ fontSize: 10 }}>{value}</Text>}
                    />
                </View>,
            row: 2,
            style: {
                flex: 3,
            }
        },
        {
            key: "quantity",
            label: "Qty",
            content: (product) =>
                <View>
                    <NumericInput
                        value={product.count}
                        onChange={value => handleQuantityChange(value, product)}
                        totalWidth={60} 
                        totalHeight={25}
                    />
                </View>,
            row: 2,
            style: {
                flex: 4,
            }
        },
        {
            key: "total",
            label: "Total",
            content: (product) =>
                <View style={{flexDirection: "row"}}>
                    <NumberFormat
                        value={(product.count * product.price).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={estore.country.currency}
                        renderText={(value) => <Text style={{ fontSize: 10 }}>{value}</Text>}
                    />
                </View>,
            row: 2,
            style: {
                flex: 3,
            }
        },
    ];

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} />
            <ScrollView style={styles.container}>
                {!inputs.cart.length ? (
                <Text style={{margin: 10}}>
                    No products in cart. <Text style={{color: 'blue'}} onPress={() => navigation.navigate("Shop")}>Continue Shopping.</Text>
                </Text>
                ) : (
                    <DataTable style={styles.table}>
                        <TableHeader columns={columns} />
                        <TableBody
                            columns={columns}
                            data={inputs.cart}
                        />
                    </DataTable>
                )}
            </ScrollView>
            <ActionButton
                navigation={navigation}
                emptyCart={emptyCart}
            />
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: "#fff",
    },
});

export default Cart;