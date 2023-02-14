import React from "react";
import { useSelector } from "react-redux";
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Addiv3Select = ({
    address,
    setAddress,
    addiv3s,
    sourceAddress,
    setAddressSaved,
    pickerStyle
}) => {
    const { estore } = useSelector((state) => ({
        ...state,
    }));
    
    const handleMyAddiv3Change = (value) => {
        if (value) {
            const addiv3 = addiv3s.filter((addiv3) => addiv3._id === value);

            if (addiv3 && addiv3.length > 0) {
                setAddress({
                    ...address,
                    addiv3: addiv3[0],
                });
            }
        };
        setAddressSaved(false);
    }

  return (
    <View>
        <RNPickerSelect
            value={address.addiv3._id || (sourceAddress && sourceAddress.addiv3._id)}
            items={addiv3s}
            placeholder = {{
                label: `Select ${estore.country.adDivName3} ...`,
            }}
            onValueChange={(value) => handleMyAddiv3Change(value)}
                style={pickerStyle}
        />
    </View>
  );
};

export default Addiv3Select;
