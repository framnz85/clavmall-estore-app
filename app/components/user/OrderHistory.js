import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import NumberFormat from "react-number-format";
import { AntDesign } from '@expo/vector-icons';

import TableHeader from "../common/table/TableHeader";
import TableBody from "../common/table/TableBody";

import { auth } from "../../functions/firebase";
import { getEstoreInfo } from "../../functions/estore";
import { storeData } from "../../functions/asyncstorage";
import { getUserOrders } from "../../functions/user";

const initialState = {
  orders: [],
  itemsCount: 0,
  pageSize: 20,
  currentPage: 1,
  sortkey: "createdAt",
  sort: -1,
  searchQuery: "",
  minPrice: 0,
  maxPrice: 0,
  dateFrom: "",
  dateTo: "",
  status: "",
  statusOption: [
    "Not Processed",
    "Waiting Payment",
    "Processing",
    "Delivering",
    "Cancelled",
    "Completed",
  ],
  payment: "",
//   paymentOption: paymentCategories,
};

function OrderHistory({ navigation }) {
    let dispatch = useDispatch();

    const [values, setValues] = useState(initialState);
    const [keyword, setKeyword] = useState("");

    const { user, orders, estore } = useSelector((state) => ({
        ...state,
    }));

  useEffect(() => {
    loadOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadOrders = () => {
        const {
        sortkey,
        sort,
        currentPage,
        pageSize,
        minPrice,
        maxPrice,
        dateFrom,
        dateTo,
        status,
        payment,
        } = values;
        getUserOrders(
        sortkey,
        sort,
        currentPage,
        pageSize,
        keyword,
        minPrice,
        maxPrice,
        dateFrom,
        dateTo,
        status,
        payment,
        user.token
        ).then((res) => {
            let result = [];
            res.data.orders && res.data.orders.map((data) => {
                const existOrder = orders.values.filter(order => order._id === data._id);
                if (!existOrder.length || res.data.query) {
                result.push({
                    ...data, page: values.currentPage
                })
                }
                return result;
            });
            setValues({
                ...values,
                orders: res.data.query ? result : [...orders.values, ...result],
                itemsCount: res.data.query ? parseInt(res.data.count)
                : orders.itemsCount > 0
                    ? orders.itemsCount
                    : parseInt(res.data.count),
            });
            !res.data.query && dispatch({
                type: "ORDER_LIST_I",
                payload: {
                values: [...orders.values, ...result],
                pages: !orders.pages.includes(currentPage)
                    ? [...orders.pages, currentPage]
                    : orders.pages,
                itemsCount: orders.itemsCount > 0
                    ? orders.itemsCount
                    : parseInt(res.data.count),
                }
            });
        })
        .catch((error) => {
            Toast.show({
                type: 'error',
                text1: error.message,
                text2: 'Fetching order data failed'
            });
        });
    };
    
    const logout = () => {
        auth.signOut();
        dispatch({
            type: "USER_LOGOUT",
            payload: {},
        });
        dispatch({
            type: "LOCATION_LOGOUT",
            payload: {},
        });
        getEstoreInfo().then((estore) => {
            dispatch({
                type: "ESTORE_LOGOUT",
                payload: estore.data[0],
            });
            storeData("estore", estore.data[0]);
            navigation.navigate('User');
        });
    };

    const columns = [
        {
            key: "image",
            label: `Orders`,
            content: (order) =>
                <View>
                    <Pressable
                        onPress={() => navigation.navigate("OrderDetails", {
                            orderId: order._id
                        })}
                        style={styles.viewButton}
                    >
                        <NumberFormat
                            value={order.grandTotal.toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={estore.country.currency}
                            renderText={(value) => <Text style={{ fontSize: 10 }}>{value}</Text>}
                        />
                            <AntDesign name="eye" size={24} color="black" />
                    
                    </Pressable>
                </View>,
            row: 1,
        },
        {
            key: "_id",
            path: "_id",
            label: "Order Code",
            content: (order) => order.orderCode,
            row: 1,
        },
        {
            key: "createdAt",
            path: "createdAt",
            label: "Date Created",
            content: (order) => new Date(order.createdAt).toLocaleDateString(),
            row: 1,
        },
        {
            key: "orderStatus",
            path: "orderStatus",
            label: "Status",
            content: (order) => order.orderStatus,
            row: 2,
        },
        {
            key: "paymentOption",
            path: "paymentOption",
            label: "Payment",
            content: (order) => order.paymentOption.category + " - " + order.paymentOption.name,
            row: 2,
        },
    ];
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        historyContainer: {
            margin: 10,
            backgroundColor: "#fff",
        },
        viewButton: {
            width: 80,
            height: 70,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            elevation: 3,
        },
        register: {
            alignItems: "center",
            justifyContent: "center",
        },
        button: {
            width: 250,
            height: 50,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            elevation: 3,
        },
  });
    
  return (
    <View style={styles.container}>
        <ScrollView style={{width: "100%"}}>
            <View style={styles.historyContainer}>
                {!values.orders.length ? (
                <Text style={{margin: 10}}>
                    No products in cart. <Text style={{color: 'blue'}} onPress={() => navigation.navigate("Shop")}>Continue Shopping.</Text>
                </Text>
                ) : (
                    <DataTable>
                        <TableHeader columns={columns} />
                        <TableBody
                            columns={columns}
                            data={values.orders}
                        />
                    </DataTable>
                )}
            </View>
            <View style={styles.register}>
                <Pressable style={{
                    ...styles.button,
                    backgroundColor: "#fff",
                    borderColor: "#eee",
                    borderWidth: 1
                }} onPress={() => logout()}>
                <Text style={{...styles.text, color: "#666"}}>Logout</Text>
                </Pressable>
            </View>
        </ScrollView>
        <Toast />
    </View>
  );
}

export default OrderHistory;