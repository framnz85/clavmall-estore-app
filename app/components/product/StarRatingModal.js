import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import StarRating from 'react-native-star-rating-widget';

import { productStar } from "../../functions/product";

const StarRatingModal = ({
  product,
  setProduct,
  modalVisible,
  setModalVisible,
  star,
  setStar
}) => {
  let dispatch = useDispatch();
  const { products, user } = useSelector((state) => ({ ...state }));

  const onStarClick = (newRating) => {
    setStar(newRating);
    productStar(product._id, newRating, user.token).then((res) => {
      const newProducts = products.map((product) =>
        product._id === res.data._id ? res.data : product
      );
      setProduct(res.data);
      dispatch({
        type: "PRODUCT_LIST_VI",
        payload: newProducts,
      });
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Rate this product!</Text>
            <StarRating
              maxStars={5}
              rating={star}
              starSize={36}
              enableHalfStar={false}
              onChange={(value) => onStarClick(value)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default StarRatingModal;