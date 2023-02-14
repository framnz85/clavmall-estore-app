import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        return {err: 'Error storing async storage data'}
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        return {err: 'Error fetching async storage data'}
    }
}

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch(e) {
        return {err: 'Error removing async storage data'}
    }
}

// Delete on production
export const getAllData = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
            // console.log({ [store[i][0]]: store[i][1] });
            console.log(store[i][0]);
            return true;
            });
        });
    });
}