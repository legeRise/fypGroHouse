import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Dashboard from "../Admin/Dashboard";
import Prodd from "../Admin/Prodd";
import OrderList from "../Admin/OrderList";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Prodd" component={Prodd} />
      <Stack.Screen name="OrderList" component={OrderList} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2eb24b' }, // Light green color
        tabBarLabelStyle: { fontWeight: 'bold', color: 'white', fontSize: 12, marginBottom: 5 }, // Bold, white text, font size 12, and bottom margin
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <Ionicons name="home-outline" size={24} color="white" />
            ),
          tabBarLabel: 'Home', // Add label here
        }}
      />
      <Tab.Screen
        name="Prodd"
        component={Prodd}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
            ) : (
              <MaterialCommunityIcons name="food-turkey" size={24} color="white" />
            ),
          tabBarLabel: 'Product', // Add label here
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderList}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="list" size={24} color="black" />
            ) : (
              <Ionicons name="list-outline" size={24} color="white" />
            ),
          tabBarLabel: 'Orders', // Add label here
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
