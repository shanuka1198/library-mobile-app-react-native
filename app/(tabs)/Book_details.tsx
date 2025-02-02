import {Image, ScrollView, Text, View, ActivityIndicator, Button, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Sliders from "@/slider/slider";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

type Data = {
    bookId : string
    title: string
    description: string
    author: string
    category:string
    quantity:number
}

export default function Book_details() {
    const [bookDetails, setBookDetails] = useState([]);
    const [loading, setLoading] = useState(true); // To show loading state

    useEffect(() => {
       axios.get("http://192.168.1.144:3030/books")
            .then((res) => {
                setBookDetails(res.data);
                setLoading(false);

            })
            .catch((err) => {
                console.error(err);
                alert("Failed to fetch book details.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <View style={{
                flex:1
            }}>
            <View>
                    <Image
                        style={{
                            width: '100%', // Ensure the image stretches across the screen
                            height: 250,
                            borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30,
                            position: 'relative'
                        }}
                        source={require('../../assets/images/2.jpg')}
                    />
                <View style={{
                    position:'absolute',
                    right:10,
                    width:50,
                    height:30,
                    padding:0.3,
                    backgroundColor:'#225d68',
                    top:4,
                    borderRadius:25,
                    borderColor:'white',
                    borderWidth:1

                }}>
                    <TouchableOpacity
                        onPress={()=>{
                            AsyncStorage.clear;
                            router.push('/');
                            alert("You have been logged out successfully")
                        }}
                    ><Text style={{
                       textAlign:'center',
                        marginTop:4,
                        fontWeight:'bold'
                    }}><Ionicons name="log-out" size={24} color="white" /></Text></TouchableOpacity>
                </View>

                    <View style={{
                        position: 'absolute',
                        top: 50,
                        left: 70
                    }}>
                        <View style={{
                            width: 250,
                            height: 100,
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: 0.7,
                            borderRadius: 30
                        }}>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: 'black'
                            }}>
                                Book List
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{
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
                    height:"auto"
                }}>

                        {bookDetails.map((data: Data, index) => (
                            <View key={index} style={{
                                marginBottom: 15,
                                borderWidth:1,
                                padding:20,
                                borderRadius:5
                            }}>
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5,fontSize:20 }}>Title: <Text style={{ fontWeight: 'bold',fontSize:20 }}>{data.title}</Text></Text>
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>Book ID: <Text style={{ fontWeight: 'normal' }}>{data.bookId}</Text></Text>
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>Description: <Text style={{ fontWeight: 'normal' }}>{data.description}</Text></Text>
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>Author: <Text style={{ fontWeight: 'normal' }}>{data.author}</Text></Text>
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>Category: <Text style={{ fontWeight: 'normal' }}>{data.category}</Text></Text>
                                <Text style={{ fontWeight: 'bold', color: '#083D77' }}>Quantity: <Text style={{ fontWeight: 'normal' }}>{data.quantity}</Text></Text>
                            </View>
                        ))}
                </ScrollView>
            </View>

    );
}
