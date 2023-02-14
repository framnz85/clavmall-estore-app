import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';

import showAverage from "../../functions/rating";

const noImage = "../../images/noimage.jpg";

const SingleProduct = ({product}) => {
    const { _id, slug, title, images, price, variants, category, subcats, parent, quantity, sold } = product;
    const SLIDER_WIDTH = Dimensions.get('window').width - 28;
    const SLIDER_HEIGHT = SLIDER_WIDTH;

    const renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <Image source={item.url !== ""
                    ? { uri: item.url }
                    : require(noImage)}
                    style={styles.image}
                />
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 12,
            marginRight: 13,
            marginLeft: 13,
        },
        carousel: {
            borderRadius: 8,
            overflow: "hidden"
        },
        image: {
            width: SLIDER_WIDTH,
            height: SLIDER_HEIGHT
        },
        body: {
            backgroundColor: "#fff",
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#666"
        },
        price: {
            fontSize: 26,
            color: "#ff8c00",
            marginTop: 10,
        },
        details: {
            flex: 1,
            backgroundColor: "#fff",
            padding: 5,
            marginTop: 10,
            borderRadius: 8,
        },
        detailsContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
            paddingTop: 10
        },
        detailsLeft: {
            flex: 1,
            alignItems: "flex-start"
        },
        detailsRight: {
            flex: 1,
            alignItems: "flex-end"
        }
    });

    const details = [
        { id: "1", name: "Category", value: category.name },
        { id: "2", name: "Sub Category", value: subcats.map((sub) => sub.name + ", ") },
        { id: "3", name: "Parent / Brand", value: parent.name },
        { id: "4", name: "Available", value: quantity },
        { id: "5", name: "Sold", value: sold },
    ]
    
    return ( 
        <View style={styles.container}>
            <View style={styles.carousel}>
                <Carousel
                    layout={"default"}
                    data={images && images.length > 0 ? images : [{url: ""}]}
                    renderItem={renderItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={SLIDER_WIDTH}
                    autoplay={true}
                    loop={true}
                />
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text>
                    {showAverage(product, 20)}
                </Text>
                <Text style={styles.price}>
                    &#8369; {parseFloat(price).toFixed(2)}
                </Text>
            </View>
            <View style={styles.details}>
                {details.map(det =>
                    <View key={det.id} style={styles.detailsContainer}>
                        <View style={styles.detailsLeft}>
                            <Text>
                                {det.name}
                            </Text>
                        </View>
                        <View style={styles.detailsRight}>
                            <Text>
                                {det.value}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}
 
export default SingleProduct;