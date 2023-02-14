import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import Header from "../components/nav/Header";
import ShopMenu from "../components/shop/ShopMenu";
import ProductCard from "../components/card/ProductCard";

import { fetchProductByFilter } from "../functions/product";

const initialState = {
  products: [],
  page: 1,
  showItemCount: 20,
  firstItemLoad: 60,
  nextItemLoad: 20,
  price: [],
  category: "",
  subcategory: "",
  parent: "",
  stars: 0,
};

function Shop({parentNavigation}) {
  let dispatch = useDispatch();
  
  const { inputs, products, user, estore } = useSelector(
    (state) => ({
      ...state,
    })
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(initialState);
  const [page, setPage] = useState(1); 
  const [botReach, setBotReach] = useState(false); 

  const toggleOpenClose = () => {
    setOpen(!open);
  };

  const {
    firstItemLoad,
    nextItemLoad,
    price,
    category,
    stars,
    subcategory,
    parent
  } = search;

  useEffect(() => {
    loadRandomProducts(1, search);
  }, [inputs.searchText, price, category, stars, subcategory, parent]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      if (botReach) {
          loadRandomProducts(page + 1, search);
          setBotReach(false);
      }
  }, [botReach]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const loadRandomProducts = (nextPage, searchArg) => {
    let searchFilter = products;
    let isSearchingStar = false;
    setPage(nextPage);

    const maxRandNum = nextPage === 1
      ? search.firstItemLoad
      : search.firstItemLoad + nextPage * search.nextItemLoad;

    if (inputs.searchText && inputs.searchText.length > 0) {
      searchFilter = searchFilter.filter((product) =>
        product.title.toLowerCase().includes(inputs.searchText.toLowerCase())
      );
    }
    if (price && price.length > 0) {
      searchFilter = searchFilter.filter(
        (product) => product.price >= price[0] && product.price <= price[1]
      );
    }
    if (category && category.length > 0) {
      searchFilter = searchFilter.filter((product) =>
        category.includes(product.category._id)
      );
    }
    if (subcategory && subcategory.length > 0) {
      searchFilter = searchFilter.filter((product) => {
        let isInclude = false;
        for (let i = 0; i < product.subcats.length; i++) {
          if (subcategory.includes(product.subcats[i]._id)) isInclude = true;
        }
        return isInclude;
      });
    }
    if (parent && parent.length > 0) {
      searchFilter = searchFilter.filter((product) =>
        parent.includes(product.parent._id)
      );
    }
    if (stars && stars > 0) {
      isSearchingStar = true;
    }

    setSearch({
      ...search,
      products: searchFilter,
      page: nextPage,
    })

    if (searchFilter.length < maxRandNum || isSearchingStar) {
      fetchProductByFilter(
        searchArg,
        nextPage === 1 ? firstItemLoad : nextItemLoad,
        user.address ? user.address : {}
      )
        .then((res) => {
          let result = [];
          const resultData=shuffleArray(res.data);
          resultData && resultData.map((data) => {
            const existProduct = products.filter(product => product._id === data._id);
            if (!existProduct.length) {
              result.push(data);
              searchFilter.push(data);
            };
            return {result, searchFilter};
          });
          setSearch({
            ...search,
            products: isSearchingStar ? res.data : searchFilter,
            page: nextPage,
          });
          dispatch({
            type: "PRODUCT_LIST_XVIII",
            payload: resultData,
          });
        })
        .catch((error) => {
          Toast.show({
              type: 'error',
              text1: error.message,
              text2: 'Error fetching product data'
          });
        });
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  
  const styles = StyleSheet.create({
    filterButton: {
      backgroundColor: "#fff",
      margin: Platform.OS === "ios" ? 8 : 13,
      padding: 10,
      borderRadius: 5,
      marginRight: Platform.OS === "ios" ? 13 : 15,
    },
    mainContainer: {
      marginLeft: Platform.OS === "ios" ? 5 : 10,
      borderRadius: 5,
      paddingBottom: 300
    },
    menuIos: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 280,
    },
    menuBox: {
      flex: 1,
      backgroundColor: estore.carouselColor ? estore.carouselColor : "#dbefdc",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderWidth: 1,
      borderColor: estore.headerColor,
      borderRadius: Platform.OS === "ios" ? 0 : 6,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      width: Platform.OS === "ios" ? 280 : 365,
      marginLeft: Platform.OS === "ios" ? 0 : 13,
      marginBottom: Platform.OS === "ios" ? 0 : 13,
    },
  })

  return (
    <View>
      <Header navigation={parentNavigation} />
      <View>
          <View style={styles.filterButton}>
            <TouchableWithoutFeedback
              onPress={() => toggleOpenClose()}
            >
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text>Shop</Text>
                <Feather name="filter" size={24} color={estore.headerColor} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                setBotReach(true);
              }
            }}
            scrollEventThrottle={400}
          >
            {Platform.OS === "android" && open && 
              <View style={styles.menuBox}>
                <ShopMenu
                  search={search}
                  setSearch={setSearch}
                  toggleOpenClose={toggleOpenClose}
                  setBotReach={setBotReach}
                />
              </View>
            }
            <View style={styles.mainContainer}>
              <Text>
                {search.products.length > 0
                  && search.products.slice(0, page * 12).map(product => 
                  <ProductCard
                      key={product._id}
                      product={product}
                      navigation={parentNavigation}
                  />
                )}
              </Text>
            </View>
          </ScrollView>
          {Platform.OS === "ios" && <View style={styles.menuIos}>
            <MenuDrawer
              open={open}
              position={'left'}
              drawerContent={
                <View style={styles.menuBox}>
                  <ShopMenu
                    search={search}
                    setSearch={setSearch}
                    toggleOpenClose={toggleOpenClose}
                  />
                </View>
              }
              drawerPercentage={90}
              overlay={true}
            />
          </View>}
        </View>
        <Toast />
      </View>
  );
}

export default Shop;