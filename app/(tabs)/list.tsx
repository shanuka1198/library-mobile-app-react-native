import { ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
    const [barrowData, setBarrowData] = useState([]);
    const [decoded, setDecoded] = useState(null); // Initialize decoded as null
    const [isBarrow, setIsBarrow] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                console.log(storedToken);
                if (storedToken) {
                    const decodedToken = jwt_decode.jwtDecode(storedToken); // Use jwt_decode directly
                    setDecoded(decodedToken);
                    console.log("Decoded Token:", decodedToken);
                } else {
                    console.log("No token found");
                }
            } catch (error) {
                console.log("Error fetching token:", error);
            }
        };

        fetchToken();
    }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        const fetchBarrowData = async () => {
            if (decoded && decoded.email && !isBarrow) {
                try {
                    const response = await axios.get(`http://192.168.1.144:3030/barrow/${decoded.email}`);
                    console.log("*********");
                    console.log(response.data);
                    console.log("*********");
                    setBarrowData(response.data);
                    setIsBarrow(true); // Ensure data is only fetched once
                } catch (err) {
                    console.log("Error fetching barrow data:", err);
                }
            }
        };

        // Fetch data when decoded token is available
        if (decoded) {
            fetchBarrowData();
        }
    }, [decoded, isBarrow]); // Trigger when `decoded` changes or `isBarrow` is updated

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView
                style={{
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
                    height: "auto",
                }}
            >
                {barrowData.length > 0 ? (
                    barrowData.map((data, index) => (
                        <View
                            key={index}
                            style={{
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
                                borderColor: '#eee',
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Title: <Text style={{ fontWeight: 'normal' }}>{data.title}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Book ID: <Text style={{ fontWeight: 'normal' }}>{data.bookId}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Description: <Text style={{ fontWeight: 'normal' }}>{data.description}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Author: <Text style={{ fontWeight: 'normal' }}>{data.author}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Email: <Text style={{ fontWeight: 'normal' }}>{data.email}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                First Name: <Text style={{ fontWeight: 'normal' }}>{data.firstName}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Last Name: <Text style={{ fontWeight: 'normal' }}>{data.lastName}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Address: <Text style={{ fontWeight: 'normal' }}>{data.address}</Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>
                                Start Date: <Text style={{ fontWeight: 'normal' }}>
                                {new Date(data.startDate).toLocaleDateString()}
                            </Text>
                            </Text>
                            <Text style={{ fontWeight: 'bold', color: '#083D77' }}>
                                End Date: <Text style={{ fontWeight: 'normal' }}>
                                {new Date(data.endDate).toLocaleDateString()}
                            </Text>
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text>No barrow data available</Text>
                )}
            </ScrollView>
        </View>
    );
}
