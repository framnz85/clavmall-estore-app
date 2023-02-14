import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import ProductCard from '../card/ProductCard';
import { getRandomProducts } from '../../functions/product';
import { getData } from '../../functions/asyncstorage';

import getUnique from '../common/getUnique';

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

function ItemsForYou({navigation, botReach, setBotReach, refresh}) {
    let dispatch = useDispatch();

    const { products, user } = useSelector((state) => ({ ...state }));
    
    const [page, setPage] = useState(1); 
    const [ifyProducts, setIfyProducts] = useState([]);

    useEffect(() => {
        getData("products").then(prods => {
            if (prods && prods.langth > 0) {
                setIfyProducts([...shuffleArray(prods)]);
                if (products) {
                    dispatch({
                        type: "PRODUCT_LIST_II",
                        payload: prods,
                    });
                }
                secondRandomProducts(1);
            } else {
                loadRandomProducts(1);
            }
        });
    }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (botReach) {
            loadRandomProducts(page + 1);
            setBotReach(false);
        }
    }, [botReach]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const loadRandomProducts = (nextPage) => {
        setPage(nextPage);
        const maxRandNum = nextPage === 1 ? 36 : 36 + nextPage * 12;
        if (products.length < maxRandNum) {
            getRandomProducts(
                nextPage === 1 ? 36 : 12,
                user.address ? user.address : {}
            ).then(res => {
                const unique = getUnique(products, res.data);
                setIfyProducts(unique.all);
                dispatch({
                    type: "PRODUCT_LIST_II",
                    payload: res.data,
                });
            }).catch(error =>
                {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: error.message
                    });
                }
            )
        }
    };

    const secondRandomProducts = (nextPage) => {
        if (products.length > 0) loadRandomProducts(nextPage);
    }
    
    return (
        <View>
            <View style={styles.container}>
                <Text>
                    {ifyProducts.length > 0
                        && ifyProducts.slice(0, page * 12).map(product => 
                        <ProductCard
                            key={product._id}
                            product={product}
                            navigation={navigation}
                        />
                    )}  
                </Text>
                <Toast />
            </View>
            <View style={{paddingBottom: 120, alignItems: "center"}}>
                <Text>
                    Loading...
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
});

export default ItemsForYou;