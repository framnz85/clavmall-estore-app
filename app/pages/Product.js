import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import Header from "../components/nav/Header";
import SingleProduct from "../components/product/SingleProduct";
import ActionButton from "../components/product/ActionButton";
import ParentProduct from "../components/product/ParentProducts";
import RelatedProduct from "../components/product/RelatedProducts";

import { getProduct } from "../functions/product";

const initialState = {
  _id: "",
  title: "",
  description: "",
  supplierPrice: "",
  markup: "",
  price: "",
  category: "",
  subcats: [],
  parent: "",
  quantity: "",
  variants: [],
  images: [],
  ratings: [],
};

function Product({ route, navigation }) {
    const { slug } = route.params;
    const ref = React.useRef();

    const { products, user } = useSelector((state) => ({ ...state }));

    const [product, setProduct] = useState(initialState);
    const [star, setStar] = useState(0);
    
    useEffect(() => {
        loadSingleProduct();
        ref.current.scrollTo({y: 0});
    }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadSingleProduct = () => {
        const thisProduct = products.filter((product) => product.slug === slug);
        if (thisProduct[0]) {
            setProduct({ ...initialState, ...thisProduct[0] });
            loadRatingDefault(thisProduct[0]);

            if (checkNoAvail(thisProduct[0].noAvail)) {
                // history.push("/");
            }
        } else {
            getProduct(slug).then((res) => {
                setProduct({ ...initialState, ...res.data });
                loadRatingDefault(res.data);

                if (checkNoAvail(res.data.noAvail)) {
                    // history.push("/");
                } else {
                    products.push(res.data);
                }
            });
        }
    };

    const checkNoAvail = (address) => {
        let noAvailTrue = false;

        if (user.address) {
            const { country, addiv1, addiv2, addiv3 } = user.address;
            const locationExist = address.filter(
                (loc) =>
                (loc.couid === country._id &&
                    loc.addiv1 === addiv1._id &&
                    loc.addiv2 === addiv2._id &&
                    loc.addiv3 === addiv3._id) ||
                (loc.couid === country._id &&
                    loc.addiv1 === addiv1._id &&
                    loc.addiv2 === addiv2._id &&
                    loc.addiv3 === undefined) ||
                (loc.couid === country._id &&
                    loc.addiv1 === addiv1._id &&
                    loc.addiv2 === undefined &&
                    loc.addiv3 === undefined)
            );
            if (locationExist.length) noAvailTrue = true;
        }
        return noAvailTrue;
    }; 

    const loadRatingDefault = (thisProduct) => {
        if (thisProduct.ratings && user) {
            let existingRatingObject = thisProduct.ratings.find(
                (ele) => ele.postedBy === user._id
            );
            setStar(existingRatingObject ? existingRatingObject.star : 0);
        }
    };
    
    return (
        <View style={{
            flex: 1,
        }}>
            <Header navigation={navigation} goBack={true} />
            <ScrollView ref={ref}>
                <SingleProduct
                    navigation={navigation}
                    product={product}
                />
                {product && product.slug &&
                    <View>
                        <ParentProduct navigation={navigation} product={product} />
                        <RelatedProduct navigation={navigation} product={product} />
                    </View>
                }
            </ScrollView>
            <ActionButton
                navigation={navigation}
                product={product}
                setProduct={setProduct}
                star={star}
                setStar={setStar}
            />
            <Toast />
        </View>
    );
}

export default Product;