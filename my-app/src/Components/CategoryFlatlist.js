import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { myColors } from "../Utils/myColors";
import HomeIcon from "./HomeIcon";

const CategoryFlatlist = ({ route }) => {
  const { products } = route.params

  const nav = useNavigation();

  return (
    <SafeAreaView style={{marginTop:10,gap:10}}>
      <HomeIcon/>
    <FlatList
      numColumns={2} // Set the number of columns to 2
      showsVerticalScrollIndicator={false}
      data={products}
      keyExtractor={(item, index) => index.toString()} // Key extractor for each item
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Details", {
              main: item,
            });
          }}
          activeOpacity={0.7}
          style={{
            flex: 1,
            margin: 8, // Adjust margin as needed
            borderRadius: 15,
            borderWidth: 2,
            borderColor: "#E3E3E3",
          }}
        >
          <Image
            style={{ height: 100, resizeMode: "contain" }}
            source={{ uri: item.image }}
          />
          <View style={{ paddingHorizontal: 10, gap: 3, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: myColors.third,
              }}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <Text style={{ color: "grey", fontWeight: "500", fontSize: 14 }}>
              {item.pieces}
            </Text>
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text
              style={{
                color: myColors.forth,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              PKR {item.price}
            </Text>
          </View>
        </TouchableOpacity>
        
      )}
    />
    </SafeAreaView>
  );
};

export default CategoryFlatlist ;
