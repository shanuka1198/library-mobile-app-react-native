import {Stack, Tabs} from "expo-router";
import Book_details from "@/app/(tabs)/Book_details"
import Entypo from '@expo/vector-icons/Entypo';


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
            </Tabs>
        </>
    );
};