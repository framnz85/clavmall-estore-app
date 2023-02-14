import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { getAllMyAddiv3 } from "../../functions/address";

function Addiv2Select({
  address,
  setAddress,
  countries,
  addiv1s,
  addiv2s,
  setAddiv3s,
  sourceAddress,
  setAddressSaved,
  pickerStyle
}) {
  let dispatch = useDispatch();

  const { estore, location } = useSelector((state) => ({
      ...state,
  }));

  const handleMyAddiv2Change = (value) => {
    if (value) {
      const addiv2 = addiv2s.filter((addiv2) => addiv2._id === value);
      if (addiv2 && addiv2.length > 0) {
        const addiv1 = addiv1s.filter(
          (addiv1) => addiv1._id === addiv2[0].adDivId1
        );
        if (addiv1 && addiv1.length > 0) {
          const country = countries.filter((country) => country._id === addiv1[0].couid);
          if (country && country.length > 0) {
            setAddress({
              ...address,
              addiv2: addiv2[0],
              addiv3: {},
            });
            const addiv3s =
              location.addiv3s &&
              location.addiv3s.filter((addiv3) => addiv3.adDivId2 === addiv2[0]._id);

            if (addiv3s && addiv3s.length > 0) {
              setAddiv3s(addiv3s.map(
                addiv3 => { return { ...addiv3, label: addiv3.name, value: addiv3._id } }
              ));
            } else {
              getAllMyAddiv3(
                country[0]._id,
                addiv1[0]._id,
                addiv2[0]._id,
                country[0].countryCode
              ).then((res) => {
                setAddiv3s(res.data && res.data.map(
                  addiv3 => { return { ...addiv3, label: addiv3.name, value: addiv3._id } }
                ));
                dispatch({
                  type: "LOCATION_LIST_III",
                  payload: { addiv3s: res.data },
                });
              });
            }
          }
        }
      }
    }
    setAddressSaved(false);
  };
    
  return (
    <View>
        <RNPickerSelect
            value={address.addiv2._id || (sourceAddress && sourceAddress.addiv2._id)}
            items={addiv2s}
            placeholder = {{
                label: `Select ${estore.country.adDivName2} ...`,
            }}
            onValueChange={(value) => handleMyAddiv2Change(value)}
                style={pickerStyle}
        />
    </View>
  );
}

export default Addiv2Select;