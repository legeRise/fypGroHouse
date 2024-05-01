import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { myColors } from "../../Utils/myColors";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const Splash = () => {
  const nav = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      nav.replace("Login")
    }, 4000);
  }, []);
  return (
    
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            color: myColors.third,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          GRO
        </Text>
        <Text
          style={{
            color: myColors.forth,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          HOUSE
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 70,
        }}
      >
        <Text
          style={{
            color: myColors.third,
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          All your Kitchen
        </Text>
        <View  style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          
        }} >
        <Text
          style={{
            color: myColors.third,
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Needs, are
        </Text>
        <Text style={{
            color: myColors.forth,
            fontWeight: "bold",
            fontSize: 32,
          }}> Here</Text>
        </View>
       
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",

          flex: 1,
          marginBottom: 20,
        }}
      >
        <Image
          style={{ height: 450, width: 250 }}
          source={require("../../assets/splash2.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
