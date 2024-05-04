import {
  Alert,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState,useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../Utils/myColors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Tabs from "./Tabs";
import UserContext from "../../Contexts/UserContext";

const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { baseUrl,token,setUserInfo,setCustomerId }  = useContext(UserContext)





  const nav=useNavigation()



const handleLogin = () => {
  // Check if username and password are provided
  if (!username || !password) {
    showAlert('Username and password are required');
    return;
  }

  // Construct object with user credentials
  const userCredentials = {
    "username": username,
    "password": password
  };

  // Send login data to the API
  fetch(`${baseUrl}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Login failed'); // Throw an error if response is not okay
    }
    return response.json(); // Parse response body as JSON
  })
  .then(data => {
    console.log('Login successful:', data);
    console.log('user logged in with id: ',data.customer_id)
    setCustomerId(data.customer_id)

    showAlert('Login successful');
    // setUserInfo(data.info);
    nav.navigate("Tabs"); // Navigate after successful login
  })
  .catch(error => {
    // console.error('Error logging in:', error);
    showAlert('Invalid Credentials');
  });
}

// Function to display styled alert
const showAlert = (message) => {
  Alert.alert(
    'Message',
    message,
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ],
    { cancelable: false }
  );
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
              name={isVisible == true ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="black"
            />
          </View>
          <TouchableOpacity
          onPress={() => {
            nav.navigate('Forgotpass');
          }}
            numberOfLines={2}
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "black",
              marginTop: 15,
              letterSpacing: 0.7,
              lineHeight: 25,
              marginLeft:215,
              opacity: 0.9,
            }}
          ><Text  style={{color:"black",fontWeight:"bold",fontSize:14}}>Forgot Password?</Text>
            
          </TouchableOpacity>
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
              nav.navigate('Tabb')
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login;