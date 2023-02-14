import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import NumberFormat from "react-number-format";

function OrderSummary({ values }) {
    const { order } = values;

    const {  estore } = useSelector((state) => ({
        ...state,
    }));
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            margin: 10,
            padding: 10,
            flexDirection: "row",
        },
        leftContainer: {
            flex: 1,
        },
        rightContainer: {
            flex: 1,
        }
    });

  return (
    <View style={styles.container}>
        <View style={styles.leftContainer}>
            <Text style={{fontWeight: "bold"}}>Status: </Text>
            <Text style={{fontWeight: "bold", marginBottom: 20}}>Payment: </Text>
            <Text style={{fontWeight: "bold"}}>Sub Total: </Text>
            <Text style={{fontWeight: "bold"}}>Delivery Fee: </Text>
            <Text style={{fontWeight: "bold"}}>Service Fee: </Text>
            <Text style={{fontWeight: "bold"}}>Discount: </Text>
            <Text style={{fontWeight: "bold", marginTop: 20, fontSize: 20}}>Grand Total: </Text>
        </View>
        <View style={styles.rightContainer}>
            <Text style={{marginRight: 20}}>{order.orderStatus}</Text>
            <Text style={{ marginRight: 20, marginBottom: 20 }}>
                {order.paymentOption &&
                    (order.paymentOption.category + " - " + order.paymentOption.name)}
            </Text>
            <Text style={{ marginRight: 20 }}>
                <NumberFormat
                    value={order.cartTotal && order.cartTotal.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text>{value}</Text>}
                />
            </Text>
            <Text style={{ marginRight: 20 }}>
                <NumberFormat
                    value={order.delfee && order.delfee.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text>{value}</Text>}
                />
              </Text>
            <Text style={{ marginRight: 20 }}>
                <NumberFormat
                    value={order.servefee && order.servefee.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text>{value}</Text>}
                />
            </Text>
            <Text style={{ marginRight: 20 }}>
                <NumberFormat
                    value={order.discount && order.discount.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text>{value}</Text>}
                />
            </Text>
            <Text style={{ marginRight: 20, marginTop: 20, fontSize: 20 }}>
                <NumberFormat
                    value={order.grandTotal && order.grandTotal.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={estore.country.currency}
                    renderText={(value) => <Text>{value}</Text>}
                />
            </Text>
        </View>
    </View>
  );
}

export default OrderSummary;