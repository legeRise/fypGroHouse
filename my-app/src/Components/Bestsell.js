import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fruits } from "../Utils/Data";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { myColors } from "../Utils/myColors";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";



const Bestsell = ({data}) => {
  const nav = useNavigation();
 
 
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
         
          activeOpacity={0.7} 
            style={{
              height: responsiveHeight(28),

              width: responsiveWidth(45),
              marginRight: 15,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#E3E3E3",
            }}
          >
            <Image
              style={{ height: 100, resizeMode: "contain" }}
              source={{ uri: item.img }}
            />
            <View
              style={{ paddingHorizontal: 10, gap: 3, alignItems: "center" }}
            >
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
            <View style={{ marginTop: 5, alignItems: "center" }}>
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
    </View>
  );
};

export default Bestsell;
