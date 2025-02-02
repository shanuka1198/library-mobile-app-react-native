import {View,Text,ScrollView} from "react-native";


export default function About_us(){
    return(
        <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
            <View style={{ backgroundColor: '#083D77', paddingVertical: 20, alignItems: 'center', shadowOpacity: 0.3 }}>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>About S.I library</Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5 }}>A Gateway to Knowledge and Learning</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>Welcome to S.I library</Text>
                    <Text style={{ color: '#4B5563', fontSize: 16, marginTop: 10, textAlign: 'center', lineHeight: 22 }}>
                        At S.I Book Library, we believe that books hold the power to inspire, educate, and transform lives.
                        Our library offers a wide range of books to cater to readers of all ages and interests.
                    </Text>
                </View>

                <View style={{ gap: 15 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, shadowOpacity: 0.2, elevation: 3 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>Our Mission</Text>
                        <Text style={{ color: '#4B5563', fontSize: 16, marginTop: 8, lineHeight: 22 }}>
                            Our mission is to foster a love for reading and learning by providing access to a diverse
                            collection of books and creating a welcoming environment for all book enthusiasts.
                        </Text>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 15, shadowOpacity: 0.2, elevation: 3 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>Our Vision</Text>
                        <Text style={{ color: '#4B5563', fontSize: 16, marginTop: 8, lineHeight: 22 }}>
                            We envision a community enriched by knowledge, where people come together to explore,
                            connect, and grow through the joy of reading.
                        </Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937' }}>Why Choose Us?</Text>
                    <View style={{ marginTop: 10, alignItems: 'flex-start' }}>
                        <Text style={{ color: '#4B5563', fontSize: 16, lineHeight: 22 }}>• A vast collection of books across multiple genres</Text>
                        <Text style={{ color: '#4B5563', fontSize: 16, lineHeight: 22 }}>• Comfortable and serene reading spaces</Text>
                        <Text style={{ color: '#4B5563', fontSize: 16, lineHeight: 22 }}>• Friendly staff passionate about books and knowledge</Text>
                        <Text style={{ color: '#4B5563', fontSize: 16, lineHeight: 22 }}>• Regular workshops, book clubs, and community events</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={{ backgroundColor: '#1F2937', paddingVertical: 15, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14 }}>© 2025 S.I Book Library. All rights reserved.</Text>
            </View>
        </View>
    )
}