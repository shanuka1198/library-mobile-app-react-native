import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";
import axios from "axios";
import {awaitExpression} from "@babel/types";


export default  function List(){
    const [isBarrowData, setIsBarrowData] = useState(false);
    const [barrowData, setBarrowData] = useState([]);
    const [decoded, setDecoded] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) {
                    const decodedToken = jwt_decode.jwtDecode(storedToken);  // <-- Fixed the decode
                    setDecoded(decodedToken);
                    setToken(storedToken);  // <-- Save the token to display it
                    console.log("Decoded Token:", decodedToken);
                } else {
                    console.log("No token found");
                }
            } catch (error) {
                console.log("Error fetching token:", error);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        if (decoded && !isBarrowData) {  // <-- Ensure decoded is not null before accessing email
            axios.get(`http://192.168.1.144:3030/barrow/${decoded.email}`)
                .then((res) => {
                    console.log("*********");
                    console.log(res.data);
                    console.log("*********");
                    setBarrowData(res.data);
                    setIsBarrowData(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [decoded, isBarrowData]);  // <-- Add decoded as a dependency




    return(
        <>
            <View style={{backgroundColor:'white', flex:1}}> <ScrollView style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 10,
                marginVertical: 10,
                marginHorizontal: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
                height: "auto"
            }}>


                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                        marginBottom: 15,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: '#eee'
                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Title: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Book ID: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Description: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Author: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Email: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>First Name: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Last Name: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Address: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5, width: '48%' }}>Start Date: <Text style={{ fontWeight: 'normal' }}>shanuka</Text></Text>
                        <Text style={{ fontWeight: 'bold', color: '#083D77', width: '48%' }}>End Date: <Text style={{ fontWeight: 'normal' }}>0</Text></Text>
                    </View>


            </ScrollView>
            </View>
        </>
    )
}