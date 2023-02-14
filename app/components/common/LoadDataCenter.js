import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storeData, getData, removeData } from "../../functions/asyncstorage";
import { getEstoreInfo, getEstoreChanges } from "../../functions/estore";
import { auth } from "../../functions/firebase";
import { currentUser } from "../../functions/auth";

function LoadDataCenter() {
    let dispatch = useDispatch();

    let { user: userExist } = useSelector((state) => ({ ...state }));
    
    useEffect(() => {
        loadEstoreInfo();
        loadAllData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const usubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER_II",
                            payload: {
                                _id: res.data._id,
                                name: res.data.name,
                                email: res.data.email,
                                role: res.data.role,
                                address: userExist.address
                                    ? {
                                        ...userExist.address,
                                        details: res.data.address.details
                                    }
                                    : res.data.address,
                                homeAddress: res.data.homeAddress,
                                token: idTokenResult.token,
                                wishlist: res.data.wishlist,
                            },
                        });
                    });
            } else {
                getData("estore").then(estore => {
                    if (estore.userAddress) {
                        dispatch({
                            type: "LOGGED_IN_USER_V",
                            payload: {
                                address: estore.userAddress
                            },
                        });
                    }
                });
            }
        });

        return () => usubscribe();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
        
    const loadEstoreInfo = () => {
        getData("estore").then(estore => {
            if (estore) {
                dispatch({
                    type: "ESTORE_INFO_I",
                    payload: estore,
                });
                getData("estoreCounters").then(counters => {
                    const {
                        categoryChange,
                        parentChange,
                        subcatChange,
                        productChange,
                        locationChange,
                        estoreChange
                    } = counters;
                    getEstoreChanges().then((newEstore) => {
                        dispatch({
                            type: "ESTORE_INFO_I",
                            payload: newEstore.data[0],
                        });
                        if (Number(categoryChange) !== newEstore.data[0].categoryChange) {
                            dispatch({
                                type: "CATEGORY_LIST_I",
                                payload: [],
                            });
                            storeData("estoreCounters", {
                                ...counters,
                                categoryChange: newEstore.data[0].categoryChange
                            });
                        }
                        if (Number(parentChange) !== newEstore.data[0].parentChange) {
                            dispatch({
                                type: "PARENT_LIST_I",
                                payload: [],
                            });
                            storeData("estoreCounters", {
                                ...counters,
                                parentChange: newEstore.data[0].parentChange
                            });
                        }
                        if (Number(subcatChange) !== newEstore.data[0].subcatChange) {
                            dispatch({
                                type: "SUBCAT_LIST_I",
                                payload: [],
                            });
                            storeData("estoreCounters", {
                                ...counters,
                                subcatChange: newEstore.data[0].subcatChange
                            });
                        }
                        if (Number(productChange) !== newEstore.data[0].productChange) {
                            dispatch({
                                type: "PRODUCT_LIST_I",
                                payload: [],
                            });
                            storeData("estoreCounters", {
                                ...counters,
                                productChange: newEstore.data[0].productChange
                            });
                        }
                        if (Number(locationChange) !== newEstore.data[0].locationChange) {
                            dispatch({
                                type: "LOCATION_LIST_I",
                                payload: [],
                            });
                            storeData("estoreCounters", {
                                ...counters,
                                locationChange: newEstore.data[0].locationChange
                            });
                        }
                        if (Number(estoreChange) !== newEstore.data[0].estoreChange) {
                            dispatch({
                                type: "ESTORE_INFO_I",
                                payload: {},
                            });
                            removeData("estore");
                            storeData("estoreCounters", {
                                ...counters,
                                estoreChange: newEstore.data[0].estoreChange
                            });
                            loadEstoreInfo();
                        }
                    });
                    
                });
            } else {
                getEstoreInfo().then((estore) => {
                    dispatch({
                        type: "ESTORE_INFO_I",
                        payload: estore.data[0],
                    });                
                    storeData("estore", estore.data[0]);
                    storeData("estoreCounters", {
                        categoryChange: estore.data[0].categoryChange,
                        parentChange: estore.data[0].parentChange,
                        subcatChange: estore.data[0].subcatChange,
                        productChange: estore.data[0].productChange,
                        locationChange: estore.data[0].locationChange,
                        estoreChange: estore.data[0].estoreChange,
                    });
                });
            }
        });
    };

    const loadAllData = () => {
        getData("products").then(products => {
            if (products) {
                dispatch({
                    type: "PRODUCT_LIST_I",
                    payload: products,
                });
            }
        });
        getData("cart").then(cart => {
            if (cart) {
                dispatch({
                    type: "INPUTS_OBJECT_I",
                    payload: {cart},
                });
            }
        });
        getData("location").then(location => {
            if (location) {
                dispatch({
                    type: "LOCATION_LIST_I",
                    payload: location,
                });
            }
        });
        getData("categories").then(categories => {
            if (categories) {
                dispatch({
                    type: "CATEGORY_LIST_IV",
                    payload: categories,
                });
            }
        });
        getData("subcats").then(subcats => {
            if (subcats) {
                dispatch({
                    type: "SUBCAT_LIST_III",
                    payload: subcats,
                });
            }
        });
        getData("parents").then(parents => {
            if (parents) {
                dispatch({
                    type: "PARENT_LIST_III",
                    payload: parents,
                });
            }
        });
    }
    
    return ( <></> );
}
 
export default LoadDataCenter;