import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import NumberFormat from "react-number-format";
import { AntDesign, Entypo } from '@expo/vector-icons';

import Header from "../nav/Header";
import TableHeader from "../common/table/TableHeader";
import TableBody from "../common/table/TableBody";
import OrderSummary from "./OrderSummary";

import { getUserOrder } from "../../functions/user";

const noImage = "../../images/noimage.jpg";

const initialState = {
  order: {
    history: [],
  },
  status: "",
  statusOption: [
    "Not Processed",
    "Waiting Payment",
    "Processing",
    "Delivering",
    "Cancelled",
    "Completed",
  ],
  historyDate: "",
  historyDesc: "",
  historyMess: "",
};

function OrderDetails({ route, navigation }) {
    const { orderId } = route.params;

    const [values, setValues] = useState(initialState);

    const { user, orders, estore } = useSelector((state) => ({
        ...state,
    }));

    useEffect(() => {
        loadProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadProducts = () => {
        const orderedProducts = orders &&
            orders.values.filter((order) => order._id === orderId);
        if (orderedProducts && orderedProducts.length > 0) {
            setValues({
                ...values,
                order: { ...values.order, ...orderedProducts[0] },
                status: orderedProducts[0].orderStatus,
                historyDesc: orderedProducts[0].orderStatus,
            });
        } else {
            getUserOrder(orderId, user.token).then((res) => {
                setValues({
                    ...values,
                    order: { ...values.order, ...res.data[0] },
                    status: res.data[0].orderStatus,
                    historyDesc: res.data[0].orderStatus,
                });
            });
        }
    };
    
    const columns = [
        {
            key: "image",
            label: `Order Code ${values.order.orderCode}`,
            content: (p) =>
                <Image source={
                    p.product.images.length
                        ? { uri: p.product.images[0].url }
                        : require(noImage)
                    }
                    style={{ width: 60, height: 60, margin: 10, marginTop:18 }}
                />,
            row: 1,
        },
        {
            key: "title",
            path: "title",
            label: "Product",
            content: (p) => p.product.title,
            row: 1,
        },
        {
            key: "variant",
            path: "variant",
            label: "Variant",
            content: (p) => p.product.variants.filter(v => v._id === p.variant)[0].name,
            row: 1,
        },
        {
            key: "price",
            path: "price",
            label: "Price",
            content: (p) => 
                <NumberFormat
                    value={p.price.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text style={{ fontSize: 10 }}>{value}</Text>}
                />,
            row: 2,
        },
        {
            key: "quantity",
            path: "quantity",
            label: "Qty",
            content: (p) => `x ${p.count}`,
            row: 2,
        },
        {
            key: "total",
            path: "total",
            label: "Total",
            content: (p) => 
                <NumberFormat
                    value={(p.price * p.count).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text style={{ fontSize: 10 }}>{value}</Text>}
                />,
            row: 2,
        },
    ];

    
    const styles = StyleSheet.create({
        container: {
            margin: 10,
            backgroundColor: "#fff",
        },
        action: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        button: {
            flexDirection: "row",
            width: 150,
            height: 40,
            margin: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            elevation: 3,
            backgroundColor: "#fff",
            borderColor: "#eee",
            borderWidth: 1,
        },
    });

    return (
        <View style={{flex: 1}}>
            <Header navigation={navigation} goBack={true} />
            <ScrollView style={styles.container}>
                <DataTable>
                    <TableHeader columns={columns} />
                    <TableBody
                        columns={columns}
                        data={values.order.products ? values.order.products : []}
                    />
                </DataTable>
            </ScrollView>
            <OrderSummary values={values} />
            <View style={styles.action}>
                <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                    <AntDesign name="back" size={24} color="black" />
                    <Text style={{...styles.text, color: "#666", marginLeft: 10}}>Go Back</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => console.log("Go to website")}>
                    <Entypo name="print" size={24} color="black" />
                    <Text style={{ ...styles.text, color: "#666", marginLeft: 10 }}>Print PDF</Text>
                </Pressable>
            </View>
            <Toast />
        </View>
    );
}

export default OrderDetails;