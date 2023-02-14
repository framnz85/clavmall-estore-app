import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';

import ProductCard from "../card/ProductCard";

import { getRelated } from "../../functions/product";

const RelatedProduct = ({ navigation, product }) => {
    let dispatch = useDispatch();
    const { slug } = product;

    const { products } = useSelector((state) => ({ ...state }));

    const [related, setRelated] = useState([]);
    
    useEffect(() => {
        loadRelatedProducts(product._id, product.category._id);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadRelatedProducts = (prodId, catId) => {
        const relProducts = [...products].filter(
            (product) => product.category._id === catId && product.slug !== slug
        );
        if (relProducts.length < 60) {
            getRelated(prodId).then((res) => {
                setRelated(res.data);
                dispatch({
                    type: "PRODUCT_LIST_IV",
                    payload: [...res.data],
                });
            });
        } else {
            setRelated(relProducts);
        }
    };

    return (
        <View>
            <View style={styles.heading}>
                <Text style={styles.text}>Related Products</Text>
            </View>
            <View style={styles.container}>
                <Text>
                    {related && related.map(product => 
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
 
export default RelatedProduct;