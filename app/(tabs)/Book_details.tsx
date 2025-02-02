import { Image, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

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
                                Borrow List
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
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>Book ID: <Text style={{ fontWeight: 'normal' }}>{data.bookId}</Text></Text>
                                <Text style={{ fontWeight: 'bold', color: '#083D77', marginBottom: 5 }}>Title: <Text style={{ fontWeight: 'normal' }}>{data.title}</Text></Text>
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
