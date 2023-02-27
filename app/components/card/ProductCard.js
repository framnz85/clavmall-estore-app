import React from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import showAverage from '../../functions/rating';
import { clavmallImg, estoreID } from '../../functions/env';

const noImage = "../../images/noimage.jpg";

function ProductCard({product, navigation}) {
    const { title, slug, price, variants, images } = product;
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigation.navigate('Product', {
                slug: product.slug
            })}>
                <View>
                    <Image source={
                        images && images.length > 0
                            ? { uri: clavmallImg + "/estore_images/estore" + estoreID + "/thumb/" + images[0].url }
                            : require(noImage)
                    } style={styles.image} />
                    <Text numberOfLines={2} style={styles.details}>
                        {product.title}
                    </Text>
                    <Text>
                        {showAverage(product, 14)}
                    </Text>
                    <Text style={styles.price}>
                        &#8369; {parseFloat(price).toFixed(2)}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Platform.OS === "ios" ? 200 : 186,
        height: Platform.OS === "ios" ? 300 : 310,
        padding: 10,
        borderWidth: 4,
        borderColor: "#efefef",
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: "center",
    },
    image: {
        width: 180,
        height: 180,
    },
    details: {
        padding: 8,
        color: "#666"
    },
    price: {
        padding: 8,
        color: "#ff8c00",
    },
});

export default ProductCard;