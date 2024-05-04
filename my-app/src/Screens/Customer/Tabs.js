import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Cart from "./Cart";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Profile from "./Profile";
import Recipe from "./Recipe";
import Details from "./Details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fruits from "../../Components/Fruits";
import Dairy from "../../Components/Dairy";
import Vegetables from "../../Components/Vegetables";
import Meat from "../../Components/Meat";
import Products from "./Products";
import Stock from "../Admin/Stock";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Fruits" component={Fruits} />
      <Stack.Screen name="Dairy" component={Dairy} />
      <Stack.Screen name="Vegetables" component={Vegetables} />
      <Stack.Screen name="Meat" component={Meat} />
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Stock" component={Stock}/>
      <Stack.Screen name="Products" component={Products}/>
    

      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};


const Tabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#2eb24b' }, // Light green color
        tabBarLabelStyle: { fontWeight: 'bold', color: 'white', fontSize: 12, marginBottom: 5 },
    }} 
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => 
          focused ?(
            <Entypo name="home" size={24} color="black" />
          ):(
            <Ionicons name="home-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
          focused ? (
            <Entypo name="shopping-cart" size={24} color="black" />
          ):(
            <EvilIcons name="cart" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen name="Recipe" component={Recipe} 
      options={{
        tabBarIcon: ({ focused }) => 
        focused ? (
          <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
        ):(
          <MaterialCommunityIcons name="food-turkey" size={24} color="white" />
        )
      }}
      />
      
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        tabBarIcon: ({ focused }) => 
        focused ?(
          <Ionicons name="man" size={24} color="black" />
        ):(
          <Ionicons name="man-outline" size={24} color="white" />
          )
      }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
