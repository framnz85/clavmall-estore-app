import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  Platform
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import StarRating from 'react-native-star-rating-widget';

function MenuContent({
  menus,
  setMenus,
  categoryList,
  subcatList,
  parentList,
  handlePrice,
  handleCategoryCheck,
  handleStarClick,
  handleSubcatCheck,
  handleParentCheck,
  toggleOpenClose,
}) {
  const {
    maxCategories,
    maxSubcats,
    maxParents,
    minPrice,
    maxPrice,
    categoryIds,
    subcatIds,
    parentIds,
  } = menus;

  const { estore } = useSelector(
    (state) => ({
      ...state,
    })
  );

  const showCategories = (maxShow) =>
    categoryList
      .slice(0, maxShow ? maxShow : categoryList.length)
      .map((cat) => (
        <View style={styles.filter} key={cat._id}>
          <CheckBox
            disabled={false}
            value={categoryIds.includes(cat._id)}
            onValueChange={() => handleCategoryCheck(cat._id)}
            style={styles.checkbox}
          />
          <Text style={{ marginLeft: 5 }}>
            {cat.name.length > 28
              ? cat.name.slice(0, 28) + "..."
              : cat.name + Array(10).fill("\xa0").join("")
            }
          </Text>
        </View>
      ));

  const showSubcats = (maxShow) => 
    subcatList
      .slice(0, maxShow ? maxShow : subcatList.length)
      .map((sub) => (
        <View style={styles.filter} key={sub._id}>
          <CheckBox
            disabled={false}
            value={subcatIds.includes(sub._id)}
            onValueChange={() => handleSubcatCheck(sub._id)}
            style={styles.checkbox}
          />
          <Text style={{ marginLeft: 5 }}>
            {sub.name.length > 14
              ? sub.name.slice(0, 14) + "..."
              : sub.name + Array(10).fill("\xa0").join("")
            }
          </Text>
        </View>
    ));

  const showParents = (maxShow) =>
    parentList
      .slice(0, maxShow ? maxShow : parentList.length)
      .map((par) => (
        <View style={styles.filter} key={par._id}>
          <CheckBox
            disabled={false}
            value={parentIds.includes(par._id)}
            onValueChange={() => handleParentCheck(par._id)}
            style={styles.checkbox}
          />
          <Text style={{ marginLeft: 5 }}>
            {par.name.length > 14
              ? par.name.slice(0, 14) + "..."
              : par.name + Array(10).fill("\xa0").join("")
            }
          </Text>
        </View>
    ));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      paddingTop: Platform.OS === "ios" ? 120 : 0,
    },
    priceHeader: {
      flex: 1,
      flexDirection: "row",
      margin: 8,
      justifyContent: "space-between",
    },
    price: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    input: {
      height: 40,
      width: Platform.OS === "ios" ? 90 : 140,
      margin: 8,
      borderWidth: 1,
      padding: 10,
      backgroundColor: "#fff",
      borderColor: estore.headerColor,
    },
    filter: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 5
    },
    checkbox: {
      borderColor: estore.headerColor,
    },
    button: {
      width: "100%",
      height: 40,
      width: 140,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      backgroundColor: '#4c8bf5',
      marginTop: 20,
      marginBottom: 10,
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
    <View style={{alignItems: "center"}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.priceHeader}>
            <View style={{ flex: 1 }}>
              <Text>Price</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableWithoutFeedback onPress={() => toggleOpenClose()}>
                <AntDesign name="closesquare" size={24} color="red" />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.price}>
            <TextInput
              style={styles.input}
              onChangeText={
                (value) => setMenus({
                    ...menus,
                    minPrice: value,
                  })
                }
              value={minPrice}
              placeholder="min"
              keyboardType="numeric"
            />
            <Text style={{fontSize: 16, marginTop: 16}}> - </Text>
            <TextInput
              style={styles.input}
              onChangeText={
                (value) => setMenus({
                    ...menus,
                    maxPrice: value,
                  })
                }
              value={maxPrice}
              placeholder="max"
              keyboardType="numeric"
            />
            <TouchableWithoutFeedback onPress={handlePrice}>
              <AntDesign name="caretright" size={24} color={estore.headerColor} style={{marginTop: 16}} />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ margin: 8 }}>Categories</Text>
          <View style={{backgroundColor: "#fff", padding: 8}}>
            {showCategories(maxCategories)}
            <TouchableWithoutFeedback onPress={() =>
                setMenus({
                    ...menus,
                    maxCategories: undefined,
                })
              }
            >
              <Text>View More...</Text>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ margin: 8 }}>Ratings</Text>
          <View style={{ backgroundColor: "#fff", padding: 8 }}>
            <StarRating maxStars={5} rating={5} onChange={() => handleStarClick(5)} starSize={24} />
            <StarRating maxStars={4} rating={4} onChange={() => handleStarClick(4)} starSize={24} />
            <StarRating maxStars={3} rating={3} onChange={() => handleStarClick(3)} starSize={24} />
            <StarRating maxStars={2} rating={2} onChange={() => handleStarClick(2)} starSize={24} />
            <StarRating maxStars={1} rating={1} onChange={() => handleStarClick(1)} starSize={24} />
            <TouchableWithoutFeedback onPress={() => handleStarClick(0)}>
              <Text>All Ratings</Text>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ margin: 8 }}>Sub Categories</Text>
          <View style={{backgroundColor: "#fff", padding: 8}}>
            {showSubcats(maxSubcats)}
            <TouchableWithoutFeedback onPress={() =>
                setMenus({
                    ...menus,
                    maxSubcats: undefined,
                })
              }
            >
              <Text>View More...</Text>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ margin: 8 }}>Parents / Brands</Text>
          <View style={{backgroundColor: "#fff", padding: 8}}>
            {showParents(maxParents)}
            <TouchableWithoutFeedback onPress={() =>
                setMenus({
                    ...menus,
                    maxParents: undefined,
                })
              }
            >
              <Text>View More...</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
      <Pressable onPress={() => toggleOpenClose()} style={styles.button}>
        <Text style={styles.text}>Done</Text>
      </Pressable>
    </View>
  );
}

export default MenuContent;