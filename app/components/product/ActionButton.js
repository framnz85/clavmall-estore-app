import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Pressable, TouchableHighlight, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import StarRatingModal from "./StarRatingModal";

import { storeData, getData } from "../../functions/asyncstorage";
import { addToWishlist } from "../../functions/user";
import getUnique from "../../components/common/getUnique";

export const ActionButton = ({navigation, product, setProduct, star, setStar}) => {
    let dispatch = useDispatch();
    const { _id, variants } = product;

    const [variant, setVariant] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const { user, estore } = useSelector((state) => ({ ...state }));

    const handleWishlist = () => {
        if (user && user.token) {
            const existWishlist = user.wishlist.filter((p) => p._id === product._id);
            if (existWishlist.length > 0) {
                Toast.show({
                    type: 'info',
                    text1: 'Product already in wishlist',
                    text2: 'Choose more other products'
                });
            } else {
                addToWishlist(product._id, user.token).then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER_IV",
                        payload: { wishlist: res.data.wishlist},
                    });
                    Toast.show({
                        type: 'success',
                        text1: 'Added to wishlist',
                        text2: 'See all your wishlist in your profile'
                    });
                });
            }
        } else {
            navigation.navigate("User");
        }
    };

    const handleAddToCart = () => {
        const variantSelect = variant ? variant : variants[0]._id;
        if (user.address && user.address.addiv3) {
            getData("cart").then(cart => {
                if (!cart) cart = [];
                const existProduct = cart.filter(product =>
                    product._id === _id && product.variant === variantSelect
                );
                if (existProduct[0]) {
                    cart = cart.map(product =>
                        product._id === _id && product.variant === variantSelect
                        ? { ...product, count: product.count + 1 }
                        : product
                    );
                } else {
                    cart.push({
                        ...product,
                        count: 1,
                        variant: variantSelect,
                    });
                }
                const arrayToCheck = cart;
                const unique = getUnique(cart, arrayToCheck);
                dispatch({
                    type: "INPUTS_OBJECT_II",
                    payload: {cart: unique.all},
                });
                storeData("cart", unique.all);
                Toast.show({
                    type: 'success',
                    text1: 'Product successfully added to cart',
                    text2: product.title + ' was added'
                });
            })
        } else {
            navigation.navigate("Location")
        }
    };

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
        starRating: {
            flex: 1,
            margin: 10,
            alignItems: "center",
        },
        wishlist: {
            flex: 1,
            margin: 10,
            alignItems: "center",
        },
        action: {
            flex: 5,
            flexDirection: "row",
            alignItems: 'flex-end',
        },
        button: {
            flex: 5,
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
            <View style={styles.starRating}>
                <TouchableHighlight onPress={() => setModalVisible(true)}>
                    <AntDesign name="staro" size={28} color="gray" />
                </TouchableHighlight>
            </View>
            <View style={styles.wishlist}>
                <TouchableHighlight onPress={() => handleWishlist()}>
                    <AntDesign name={
                        (user.wishlist
                            ? user.wishlist.filter((p) => p._id === product._id)
                            : []
                        ).length > 0 ? "heart" : "hearto"} size={24} color="red" />
                </TouchableHighlight>
            </View>
            <View style={styles.action}>
                <Pressable style={
                    product.quantity < 1
                        ? { ...styles.button,
                            backgroundColor: "#fff",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                        : styles.button
                    } onPress={() => product.quantity < 1
                        ? Toast.show({
                            type: 'error',
                            text1: 'Out Of Stock',
                            text2: 'Product is out of stock'
                        })
                        : handleAddToCart()}>
                    <Text style={
                    product.quantity < 1
                        ? { ...styles.text,
                            color: "#666"
                        } : styles.text
                    }>{product.quantity < 1 ? "Out of stock" : "Add to Cart"}</Text>
                </Pressable>
            </View>
            <StarRatingModal
                product={product}
                setProduct={setProduct}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                star={star}
                setStar={setStar}
            />
        </View>
    )
}
 
export default ActionButton;