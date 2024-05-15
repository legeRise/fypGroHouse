
import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../Utils/myColors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../Contexts/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from "react-native";


const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { baseUrl, setAuthToken } = useContext(UserContext);

  const nav = useNavigation();


  const handleLogin = async () => {
    console.log(baseUrl,'is the base url from login')
    // Check if username and password are provided
    if (!username || !password) {
      Alert.alert("Error",'Username and password are required');
      return;
    }
  
    // Construct object with user credentials
    const userCredentials = {
      username: username,
      password: password
    };
  
    try {
      // Send login data to the API
      const response = await fetch(`${baseUrl}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Verify the received data
  
        // Store the authentication token in AsyncStorage
        await AsyncStorage.setItem("AuthToken", JSON.stringify(data));
        setAuthToken(data)

  
        Alert.alert("Success", "Login Successful");
        nav.navigate("Tabs");
      } else {
        Alert.alert("Error", "Invalid Username or Password");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  }
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: myColors.primary }}>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1, paddingTop: 15 }}>
        <Image
          style={{ height: 150, width: 120, alignSelf: "center" }}
          source={require("../../assets/sign.png")}
        />
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <Text
            style={{
              color: myColors.secondary,
              fontSize: 26,
              fontWeight: "600",
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 10,
            }}
          >
            Enter your Email and password
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 30,
            }}
          >
             Username
          </Text>
          <TextInput
            onChangeText={setUsername}
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
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
              onChangeText={setPassword}
              keyboardType="ascii-capable"
              style={{
                fontSize: 17,
                marginTop: 15,
                flex: 0.9,
              }}
            />
            <Ionicons
              onPress={() => {
                setIsVisible(!isVisible);
              }}
              style={{ marginTop: 10 }}
              name={isVisible === true ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="black"
            />
          </View>


          
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#2eb24b",
              marginTop: 30,
              height: 60,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 19, color: "white", fontWeight: "600" }}>
              Login
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
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={()=>{
              nav.navigate('Signup')
            }}>
              <Text
                style={{
                  fontSize: 15,
                  color: myColors.secondary,
                  fontWeight: "600",
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
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
              Login as Admin
            </Text>
            <TouchableOpacity onPress={()=>{
              nav.navigate('AdminLogin')
            }}>
              <Text
                style={{
                  fontSize: 15,
                  color: myColors.secondary,
                  fontWeight: "600",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>


          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end"  }}>
          <TouchableOpacity
            onPress={() => nav.navigate("ApiUrl")}
            style={{
              backgroundColor: "#2eb24b",
              width : 80,
              marginTop: 30,
              height: 30,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 19, color: "white", fontWeight: "600" }}>
              Set Url
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login;