import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';

import ProductCard from "../card/ProductCard";

import { getParent } from "../../functions/product";

const ParentProduct = ({ navigation, product }) => {
    let dispatch = useDispatch();
    const { slug } = product;

    const { products } = useSelector((state) => ({ ...state }));

    const [parent, setParent] = useState([]);
    
    useEffect(() => {
        loadParentProducts(product._id, product.parent._id);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadParentProducts = (prodId, parId) => {
        const parProducts = [...products].filter(
            (product) => product.parent._id === parId && product.slug !== slug
        );
        if (parProducts.length < 60) {
            getParent(prodId).then((res) => {
                setParent(res.data);
                dispatch({
                    type: "PRODUCT_LIST_III",
                    payload: [...res.data],
                });
            });
        } else {
            setParent(parProducts);
        }
    };

    return (
        <View>
            <View style={styles.heading}>
                <Text style={styles.text}>Other Variant</Text>
            </View>
            <View style={styles.container}>
                <Text>
                    {parent && parent.map(product => 
                        <ProductCard
                            key={product._id}
                            product={product}
                            navigation={navigation}
                        />
                    )}  
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 6,
    },
    heading: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 10,
        marginRight: 13,
        marginLeft: 13,
        borderRadius: 8
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#666"
    },
});
 
export default ParentProduct;