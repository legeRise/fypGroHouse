import React from "react";

import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../Utils/myColors"; // Adjust the path as needed
import HomeIcon from "../../Components/HomeIcon";
import HomeSearch from "../../Components/HomeSearch";


const Viewcat = ({ route }) => {

  const  { categoryList } = route.params
  console.log("cat",categoryList)



  const handleViewDetail = (item) => {
    // Do nothing when a category is clicked, since there's no navigation
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, gap: 20, marginTop: 20 }}>
      <HomeIcon />
      <HomeSearch />
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={categoryList}
        keyExtractor={(item) => item.id}
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
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Viewcat ;
