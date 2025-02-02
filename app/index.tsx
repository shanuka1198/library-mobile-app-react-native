import { View, Text, Button, TextInput, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import {useContext, useState} from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as jwt_decode from 'jwt-decode';

export default function Index() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");



    const login = async () => {
        setLoading(true);
        setError(""); // Reset error message
        try {
            // Make the POST request to the backend
            const response = await axios.post("http://192.168.1.144:3030/auth/login", {
                email,
                password,
            });

            const token = response.data.token; // Assuming the token is in response.data.token
            await AsyncStorage.setItem("token", token);
            const decoded: string = jwt_decode.jwtDecode(token,{ complete: true });

            if (decoded.role && decoded.role.includes("Client")) {
                router.push("/Book_details"); // Redirect to home if role is 'Client'
            } else {
                setError("You are not authorized to access this page.");
            }
        } catch (err) {
            console.error(err);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <View>
                <View style={{
                    marginTop: 120,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('../assets/images/12.png')} />
                </View>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                        WELCOME TO THE S.I LIBRARY
                    </Text>
                </View>
                <View style={{
                    marginTop: 50,
                    position: 'relative',
                    width: 'auto',
                    height: 500,
                    backgroundColor: '#237c61',
                    borderTopLeftRadius: 550,
                }}>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                    }}>
                        <TextInput
                            onChangeText={text => setEmail(text)}
                            style={{
                                color: 'black',
                                padding: 16,
                                borderWidth: 1,
                                borderColor: 'black',
                                width: 300,
                                borderRadius: 17,
                                fontSize: 14,
                                shadowOpacity: 0.3
                            }}
                            placeholder="Enter Your Email Address"
                        />
                        <TextInput
                            onChangeText={text => setPassword(text)}
                            style={{
                                color: 'black',
                                padding: 16,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderBlockColor: 'black',
                                borderRightColor: 'black',
                                borderLeftColor: 'black',
                                width: 300,
                                borderRadius: 17,
                                marginTop: 30,
                                fontSize: 14,
                                shadowOpacity: 0.3
                            }}
                            placeholder="Enter Your Password"
                        />
                    </View>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            marginTop: 50,
                            width: 150,
                            height: 40,
                            backgroundColor: '#ffffff',
                            padding: 2,
                            borderRadius: 20,
                            shadowOpacity: 0.3
                        }}>
                            <Button onPress={() => { login(); }} color='black' title={'Login'}></Button>
                        </View>
                    </View>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15
                        }}>New to S.I-library?</Text>
                        <Link style={{
                            color: '#3dcae3'
                        }} href="/">Sign Up</Link>
                    </View>
                </View>
            </View>
        </>
    );
}
