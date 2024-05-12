import React, { useContext, useState,useEffect} from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert,BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../Utils/myColors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const { baseUrl,setUserInfo } = useContext(UserContext)

 

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       // Perform any additional logic if needed
  //       return true; // Prevent going back if on the Home screen
  //     }
  //   );
  //   return () => backHandler.remove();
  // }, []);


  const [isVisible, setIsVisible] = useState(true);
  const nav=useNavigation()

  

  const handleSignup = () => {
    // Check if all required fields are filled
    if (!username || !email || !password || !confirm || !phone || !address) {
      // If any of the required fields are missing, display an error message
      showAlert('All fields are required');
      return;
    }
  
    // Check if username is at least 5 characters long
    if (username.length < 5) {
      showAlert('Username must be at least 5 characters');
      return;
    }
  
  
    // Check if password and confirm password match
    if (password !== confirm) {
      showAlert('Password and Confirm Password should be the same');
      return;
    }
  
    // Check if password is at least 5 characters long
    if (password.length < 5) {
      showAlert('Password should contain at least 5 characters');
      return;
    }
  
    // Check if username contains any space
    if (username.includes(" ")) {
      showAlert('Username should not contain any space');
      return;
    }
  
    // Check if password contains any space
    if (password.includes(" ")) {
      showAlert('Password should not contain any space');
      return;
    }
  
    // Check if phone number is valid
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      showAlert('Please enter a valid 10-digit phone number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address');
      return;
    }
  

  
    // Construct object with all fields
    const registrationData = {
      "username": username,
      "password": password,
      "confirm": confirm,
      "email": email,
      "phone": phone,
      "address": address
    };

    console.log(registrationData)
    // Send registration data to the API
    console.log(`${baseUrl}/auth/signup/`)
    fetch(`${baseUrl}/auth/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData)
    })
    .then(response => {
      if (response.ok) {
          return response.json()
      } else {
         return response.json()
      }
    })
    .then(data => {
      if (data.username) {
        console.log('yes it is the username is ')
        Alert.alert("Error","Username Already Registered")
      }
      else if (data.email) {
        Alert.alert("Error","Email Already Registered")
      }
      else if (data.phone) {
        Alert.alert("Error","Mobile No Should be Unique")
      }
      else{
        Alert.alert("Success","Registration Successful");
        nav.navigate("Login"); // Navigate after successful registration
      }
    })
    .catch(error => {
      console.error('Error registering:', error);
      showAlert(error);
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
      <ScrollView style={{ flex: 1, paddingTop: 5 }}>
        <Image
          style={{ height: 150, width: 120, alignSelf: "center" }}
          source={require("../../assets/sign.png")}
        />
        <View style={{ paddingHorizontal: 20, marginTop: 3 }}>
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
            onChangeText={setUsername}
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 3,
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
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 3,
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
              onChangeText={setPassword}
              secureTextEntry={!isVisible}
              style={{
                fontSize: 17,
                marginTop: 3,
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
            Confirm Password
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
              onChangeText={setConfirm}
              secureTextEntry={!isVisible}
              style={{
                fontSize: 17,
                marginTop: 3,
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
            onChangeText={setPhone}
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 3,
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
            onChangeText={setAddress}
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 3,
            }}
          />
          
          
          <TouchableOpacity
            onPress={handleSignup}
            style={{
              backgroundColor: "#2eb24b",
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
              marginTop: 25,
              gap:5,
            }}
          >
            <Text style={{ fontSize: 16, color: "grey", }}>
              Already have an account?
            </Text>
            <TouchableOpacity 
            onPress={() => nav.navigate("Login")}
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
