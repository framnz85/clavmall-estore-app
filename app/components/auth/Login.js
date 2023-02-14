import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import Joi from 'react-native-joi';
import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../functions/firebase";
import { createOrUpdateUser } from "../../functions/auth";

function Login({ navigation }) {
    let dispatch = useDispatch();
    
    const [email, setEmail] = useState("clavmall.85@gmail.com");
    const [password, setPassword] = useState("Ejccoc@1204");
    const [loading, setLoading] = useState(false);

    const { user: userExist } = useSelector((state) => ({ ...state }));

    const schema = {
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(8).max(1024).required(),
    };
    
    const handleSubmit = async () => {
        const validate = Joi.validate({ email, password }, schema, {
            abortEarly: false,
        });

        if (validate.error) {
            for (let item of validate.error.details)
            Toast.show({
                type: 'error',
                text1: item.message,
                text2: 'Invalid input'
            });
            return;
        }

        setLoading(true);

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token, userExist.address)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER_I",
                        payload: {
                            _id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                            role: res.data.role,
                            address: res.data.address,
                            homeAddress: res.data.homeAddress,
                            token: idTokenResult.token,
                            wishlist: res.data.wishlist,
                        },
                    });
                    navigation.navigate('Home');
                })
                .catch((error) => {
                    Toast.show({
                        type: 'error',
                        text1: error.message,
                        text2: 'No user token accessed'
                    });
                    setLoading(false);
                });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.message,
                text2: 'No user token accessed'
            });
            setLoading(false);
        }
    };

  const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
        },
        loginInput: {
            flex: 1,
            justifyContent: "flex-end"
        },
        loginButton: {
            flex: 1,
            justifyContent: "flex-start",
            paddingTop: 20,
        },
        register: {
            flex: 1,
        },
        button: {
            width: 250,
            height: 50,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            elevation: 3,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
        input: {
            width: 250,
            height: 40,
            margin: 12,
            borderBottomWidth: 1,
            padding: 10,
        },
  });
    
  return (
    <View style={styles.container}>
        <View style={styles.loginInput}>
        <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholder="Enter Email"
        />
        <TextInput
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={true}
        />
        </View>
        <View style={styles.loginButton}>
                <Pressable
                    style={{ ...styles.button, backgroundColor: '#4c8bf5', }}
                    onPress={handleSubmit}
                    disabled={loading || !email || password.length < 3}
                >
                <Text style={styles.text}>Login with Email</Text>
            </Pressable>
                <Pressable style={{...styles.button, backgroundColor: '#ed4337',}} onPress={() => ""}>
            <Text style={styles.text}>Login with Google</Text>
            </Pressable>
        </View>
        <View style={styles.register}>
            <Pressable style={{
            ...styles.button,
            backgroundColor: "#fff",
            borderColor: "#eee",
            borderWidth: 1
            }} onPress={() => ""}>
            <Text style={{...styles.text, color: "#666"}}>Register</Text>
            </Pressable>
        </View>
    </View>
  );
}

export default Login;