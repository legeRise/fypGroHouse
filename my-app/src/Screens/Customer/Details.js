import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import { myColors } from "../../Utils/myColors";
import { MaterialIcons } from "@expo/vector-icons";
import Dropbox from "../../Components/Dropbox";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import Rating from "../../Components/Rate";
import Rate from "../../Components/Rate";


LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
const Details = ({ route }) => {
  const nav=useNavigation()
  const dispatch = useDispatch();
  const productData = route.params?.products;
  const { name, price, pieces, image } = productData;
  
  return (
    <SafeAreaView style={{ flex: 1, gap: 20, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{}}>
          <Image
            resizeMode="contain"
            style={{
              height: 300,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            source={{
              uri: image,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              width: "100%",
              paddingHorizontal: 15,
              alignItems: "center",
            }}
          >
            <Ionicons
              onPress={() => {
                nav.goBack();
              }}
              name="chevron-back"
              size={24}
              color="black"
            />
          </View>
        </View>
        
        <View style={{ paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, color: myColors.third, fontWeight: "700" }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            <MaterialIcons name="favorite-border" size={26} color="black" />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 22,
              color: myColors.forth,
              fontWeight: "bold",
              paddingTop: 20,
            }}
          >
            Rs {price}/{pieces}
          </Text>
          <Dropbox />
          <Rate/>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          dispatch(addToCart(productData));
          nav.navigate("Cart");
        }}
        style={{
          backgroundColor: "#2eb24b",
          height: 60,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
        }}
      >
        <Text style={{ fontSize: 19, color: "white", fontWeight: "600" }}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Details;
