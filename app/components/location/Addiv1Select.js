import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { getAllMyAddiv2, getAllMyAddiv3 } from "../../functions/address";

function Addiv1Select({
    address,
    setAddress,
    countries,
    addiv1s,
    setAddiv2s,
    sourceAddress,
    setAddressSaved,
    pickerStyle
}) {
    let dispatch = useDispatch();

    const { estore, location } = useSelector((state) => ({
        ...state,
    }));

    const handleMyAddiv1Change = (value) => {
        if (value) {
            const addiv1 = addiv1s.filter((addiv1) => addiv1._id === value);
            if (addiv1 && addiv1.length > 0) {
                const country = countries.filter((country) =>
                    country._id === addiv1[0].couid
                );
                if (country && country.length > 0) {
                    if (addiv1.length > 0) {
                        setAddress({
                            ...address,
                            addiv1: addiv1[0],
                            addiv2: {},
                            addiv3: {},
                        });
                        const addiv2s = location.addiv2s.filter((addiv2) =>
                            addiv2.adDivId1 === addiv1[0]._id
                        );
                        if (addiv2s && addiv2s.length > 0) {
                            setAddiv2s(addiv2s.map(
                                addiv2 => { return { ...addiv2, label: addiv2.name, value: addiv2._id } }
                            ));
                        } else {
                            getAllMyAddiv2(
                                country[0]._id,
                                addiv1[0]._id,
                                country[0].countryCode
                            ).then((res) => {
                                setAddiv2s(res.data && res.data.map(
                                    addiv2 => { return { ...addiv2, label: addiv2.name, value: addiv2._id } }
                                ));
                                dispatch({
                                    type: "LOCATION_LIST_II",
                                    payload: { addiv2s: res.data },
                                });
                            });
                        }

                        getAllMyAddiv3(
                            country[0]._id,
                            addiv1[0]._id,
                            "all",
                            country[0].countryCode
                        ).then((res) => {
                            dispatch({
                                type: "LOCATION_LIST_II",
                                payload: { addiv3s: res.data },
                            });
                        });
                    }
                }
            }
        }
        setAddressSaved(false);
    };
    
    return (
        <View>
            <RNPickerSelect
                value={address.addiv1._id || (sourceAddress && sourceAddress.addiv1._id)}
                items={addiv1s}
                placeholder = {{
                    label: `Select ${estore.country.adDivName1} ...`,
                }}
                onValueChange={(value) => handleMyAddiv1Change(value)}
                style={pickerStyle}
            />
        </View>
    );
}

export default Addiv1Select;