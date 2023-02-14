import { Platform } from 'react-native';

export const apiURL = Platform.OS === "ios"
    ? "http://192.168.50.81:8000/api"
    : "http://10.0.2.2:8000/api";

export const estoreID = '613216389261e003d696cc65';