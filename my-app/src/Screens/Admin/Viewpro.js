import React from "react";
import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { myColors } from "../../Utils/myColors"; // Adjust the path as needed
import HomeIcon from "../../Components/HomeIcon";
import HomeSearch from "../../Components/HomeSearch";

const Viewpro = ({ route }) => {
  const { productList } = route.params;
  console.log(productList,'this is the list')


  const nav = useNavigation();

  const handleViewDetail = (item) => {
    nav.navigate("ProDetail", { productData: item });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white",paddingHorizontal: 20,gap: 20,marginTop: 20 }}>
      <HomeIcon />
      <HomeSearch />
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleViewDetail(item)}
            activeOpacity={0.7}
            style={{
              flex: 1,
              margin: 8,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "#E3E3E3",
            }}
          >
            <Image
              style={{ height: 100, resizeMode: "contain" }}
              source={{ uri: item.image }}
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
                {item.unit} 
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

export default Viewpro;
