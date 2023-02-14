import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {
    getAllMyAddiv1, getAllMyAddiv2, getAllMyAddiv3
} from "../../functions/address";

function CountrySelect({
    address,
    setAddress,
    countries,
    setAddiv1s,
    setAddiv2s,
    setAddiv3s,
    sourceAddress,
    setAddressSaved,
    pickerStyle
}) {
    let dispatch = useDispatch();

    const { location } = useSelector((state) => ({
        ...state,
    }));

    useEffect(() => {
        if (sourceAddress) {
            loadAllMyAddress();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadAllMyAddress = () => {
        const country = sourceAddress.country ? sourceAddress.country : {};
        const addiv1 = sourceAddress.addiv1 ? sourceAddress.addiv1 : {};
        const addiv2 = sourceAddress.addiv2 ? sourceAddress.addiv2 : {};
        const addiv3 = sourceAddress.addiv3 ? sourceAddress.addiv3 : {};
        const details = sourceAddress.details ? sourceAddress.details : "";

        const addiv1s = location.addiv1s && location.addiv1s.filter(
                (addiv1) => addiv1.couid === country._id
            );
        
        if (addiv1s && addiv1s.length > 0) {
            setAddiv1s(addiv1s.map(
                addiv1 => {return { ...addiv1, label: addiv1.name, value: addiv1._id}}
            ));
        } else {
            getAllMyAddiv1(country._id, country.countryCode).then((res) => {
                setAddiv1s(res.data.map(
                    addiv1 => {return { ...addiv1, label: addiv1.name, value: addiv1._id}}
                ));
                dispatch({
                    type: "LOCATION_LIST_IV",
                    payload: { addiv1s: res.data },
                });
            });
        }

        const addiv2s = location.addiv2s && location.addiv2s.filter((addiv2) =>
            addiv2.adDivId1 === addiv1._id
        );

        if (addiv2s && addiv2s.length > 0) {
            setAddiv2s(addiv2s.map(
                addiv2 => {return { ...addiv2, label: addiv2.name, value: addiv2._id}}
            ));
        } else {
            getAllMyAddiv2(country._id, addiv1._id, country.countryCode).then(
                (res) => {
                    setAddiv2s(res.data.map(
                        addiv2 => {return { ...addiv2, label: addiv2.name, value: addiv2._id}}
                    ));
                    dispatch({
                        type: "LOCATION_LIST_IV",
                        payload: { addiv2s: res.data },
                    });
                }
            );
        }

        const addiv3s = location.addiv3s && location.addiv3s.filter((addiv3) =>
            addiv3.adDivId2 === addiv2._id
        );

        if (addiv3s && addiv3s.length > 0) {
            setAddiv3s(addiv3s.map(
                addiv3 => {return { ...addiv3, label: addiv3.name, value: addiv3._id}}
            ));
            const newAddiv3 = addiv3s.filter((newAdd) => newAdd._id === addiv3._id);
            setAddress({
                ...address,
                country,
                addiv1,
                addiv2,
                addiv3: newAddiv3[0],
                details,
            });
        } else {
            getAllMyAddiv3(
                country._id,
                addiv1._id,
                addiv2._id,
                country.countryCode
            ).then((res) => {
                const newAddiv3 = res.data.filter((newAdd) => newAdd._id === addiv3._id);
                setAddress({
                    ...address,
                    country,
                    addiv1,
                    addiv2,
                    addiv3: newAddiv3[0],
                    details,
                });
                setAddiv3s(res.data.map(
                    addiv3 => {return { ...addiv3, label: addiv3.name, value: addiv3._id}}
                ));
                dispatch({
                    type: "LOCATION_LIST_IV",
                    payload: { addiv3s: res.data },
                });
            });
        }
    };
    
    const handleMyCountryChange = (value) => {
        const country = countries.filter((country) =>
            country._id === value
        );
        if (country && country.length > 0) {
            setAddress({
                ...address,
                country: country[0],
                addiv1: {},
                addiv2: {},
                addiv3: {},
            });
            const addiv1s = location.addiv1s && location.addiv1s.filter((addiv1) =>
                addiv1.couid === country[0]._id
            );
            if (addiv1s && addiv1s.length > 0) {
                setAddiv1s(addiv1s.map(
                    addiv1 => {return { ...addiv1, label: addiv1.name, value: addiv1._id}}
                ));
            } else {
                getAllMyAddiv1(country[0]._id, country[0].countryCode).then((res) => {
                    setAddiv1s(res.data && res.data.map(
                        addiv1 => {return { ...addiv1, label: addiv1.name, value: addiv1._id}}
                    ));
                    dispatch({
                        type: "LOCATION_LIST_IV",
                        payload: { addiv1s: res.data },
                    });
                });
            }

            getAllMyAddiv2(country[0]._id, "all", country[0].countryCode).then((res) => {
                dispatch({
                    type: "LOCATION_LIST_IV",
                    payload: { addiv2s: res.data },
                });
            });
        }
        setAddressSaved(false);
    };
    
    return (
        <View>
            <RNPickerSelect
                value={address.country._id || (sourceAddress && sourceAddress.country._id)}
                items={countries}
                placeholder = {{
                    label: 'Select Country...',
                }}
                onValueChange={(value) => handleMyCountryChange(value)}
                style={pickerStyle}
            />
        </View>
    );
}

export default CountrySelect;