import {Stack, Tabs} from "expo-router";
import Book_details from "@/app/(tabs)/Book_details"
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function StackLayout(){
    return(
        <>
            <Tabs>
                <Tabs.Screen  name='Book_details' options={{
                    title:"Book List",
                    tabBarIcon:({color, size})=>(<Entypo name="book" size={size} color={color} />)
                }} />
                <Tabs.Screen name='list' options={{
                    title:"Borrow List",
                    tabBarIcon:({color, size})=>(<Entypo name="open-book" size={size} color={color} />)
                }} />
                <Tabs.Screen name='about_us' options={{
                    title:"About Us",
                    tabBarIcon:({color, size})=>(<Ionicons name="information-circle" size={size} color={color} />)
                }} />
            </Tabs>
        </>
    );
};