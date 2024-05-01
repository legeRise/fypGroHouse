import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../Utils/myColors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

 

    


  const [isVisible, setIsVisible] = useState(true);
  const nav=useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        <Image
          style={{ height: 150, width: 120, alignSelf: "center" }}
          source={require("../../assets/sign.png")}
        />
        <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
          <Text
            style={{
              color: myColors.secondary,
              fontSize: 26,
              fontWeight: "600",
            }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 10,
            }}
          >
            Enter your credentials to continue
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 25,
            }}
          >
            Username
          </Text>
          <TextInput
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 5,
            }}
          />
          
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 25,
            }}
          >
            Email
          </Text>
          <TextInput
            keyboardType="email-address"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 5,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 25,
            }}
          >
            Password
          </Text>
          <View
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              secureTextEntry={!isVisible}
              maxLength={7}
              style={{
                fontSize: 17,
                marginTop: 5,
                flex: 0.9,
              }}
            />
            <Ionicons
              onPress={() => {
                setIsVisible(!isVisible);
              }}
              style={{ marginTop: 10 }}
              name={isVisible == true ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="black"
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 25,
            }}
          >
            Mobile Number
          </Text>
          <TextInput
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 5,
            }}
          />
          
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 25,
            }}
          >
            Address
          </Text>
          <TextInput
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 5,
            }}
          />
          
          
          <TouchableOpacity
            onPress={() => {
            nav.navigate('Login');
            }}
            style={{
              backgroundColor: "#2eb24b",
              marginTop: 30,
              height: 60,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25,
            }}
          >
            <Text style={{ fontSize: 19, color: "white", fontWeight: "600" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              gap:5,
            }}
          >
            <Text style={{ fontSize: 16, color: "grey" }}>
              Already have an account?
            </Text>
            <TouchableOpacity 
            onPress={{}}
            >
              
            <Text
              style={{
                fontSize: 15,
                color: myColors.secondary,
                fontWeight: "600",
              }}
            >
              Login Now
            </Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup
