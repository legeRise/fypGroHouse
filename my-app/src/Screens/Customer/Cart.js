import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Complete from "./Complete";

import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { myColors } from "../../Utils/myColors";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../Redux/CartSlice";

import BackIcon from "../../Components/BackIcon";

const Cart = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.CartSlice);
  const nav = useNavigation();
  const totalPrice = storeData.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    
    
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
        gap: 15,
        paddingTop: 30,
      }}
    >
      <StatusBar barStyle="default" />
      <BackIcon />
      
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "600"}}>
        My Cart
      </Text>
      <View style={{ flex: 0.8, }}>
        <FlatList
        showsVerticalScrollIndicator={false}
          style={{ flex: 0.5, backgroundColor: "white" }}
          data={storeData}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: responsiveHeight(18),

                borderBottomColor: "#E3E3E3",
                borderBottomWidth: 2,
                flexDirection: "row",
              }}
            >
              {/*///child 1 */}
              <View
                style={{
                  flex: 0.35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 80, width: 80, resizeMode: "contain" }}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              {/*///child 2 */}
              <View
                style={{
                  flex: 0.7,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: myColors.third,
                    }}
                  >
                    {item.name}
                  </Text>
                  <AntDesign
                    name="close"
                    size={24}
                    color="grey"
                    onPress={() => {
                      dispatch(removeFromCart(item));
                    }}
                  />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#2eb24b" }}
                >
                  {item.category}
                </Text>
                <View
                  style={{
                    alignContent: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  {/*///Quantity container*/}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <AntDesign
                      name="minuscircleo"
                      size={28}
                      color="black"
                      onPress={() => {
                        dispatch(decrementQuantity(item));
                      }}
                    />
                    <Text style={{ fontSize: 17 }}>{item.quantity}</Text>
                    <AntDesign
                      name="pluscircleo"
                      size={28}
                      color="black"
                      onPress={() => {
                        if (item.quantity == 7) {
                        } else {
                          dispatch(incrementQuantity(item));
                        }
                      }}
                    />
                  </View>
                  {/*///Quantity container*/}
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    Rs {item.price * item.quantity}
                  </Text>
                </View>
              </View>
              {/*///child 2 */}
            </View>
          )}
        />
      </View>
      <View  style={{flexDirection:'row',backgroundColor:'white',marginTop:20,justifyContent:'space-between',alignItems:'center'}}>
        <Text style={{fontSize: 23, fontWeight: "600"}}>Total:</Text>
        <Text style={{fontSize: 23, fontWeight: "600",color: myColors.forth}}>PKR {totalPrice.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
  onPress={() => {
    if (storeData.length > 0) {
    nav.navigate("Complete", { order: storeData.map(item => ({ ...item, img: item.image })) });
    }
    else {
      Alert.alert("Error","Cart Cannot be Empty")
    }
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
    Checkout
  </Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

export default Cart;
