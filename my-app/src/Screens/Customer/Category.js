import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { myColors } from "../../Utils/myColors";
import Fruits from "../../Components/Fruits";
import { useNavigation } from "@react-navigation/native";
import HomeSearch from "../../Components/HomeSearch";
import CatLayout from "../../Components/CatLayout";

const Category = () => {
  const navigation = useNavigation();
  const [selected, setselected] = useState();
  const cat = ["Fruits", "Vegetables", "Meat", "Dairy"];

  const handleCategoryPress = (index) => {
    setselected(index);

    if (index === 0) {
      navigation.navigate("Fruits");
    } else if (index === 1) {
      navigation.navigate("Vegetables");
    } else if (index === 2) {
      navigation.navigate("Meat");
    } else if (index === 3) {
      navigation.navigate("Dairy");
    }
  };
  const CategoryLayout = ({ category, children }) => {
    return (
      <View style={styles.container}>
        <SearchBar onSearch={searchText => handleSearch(searchText, category)} category={category} />
        <View style={styles.content}>{children}</View>
      </View>
    );
  };
  return (
    <View>
    
      {/* Render the list of categories */}
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={cat}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(index)}
            style={{ margin: 10 }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: "#E3E3E3",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
                source={require("../../assets/fruit.png")}
              />
            </View>
            <Text style={{ marginTop: 5, textAlign: "center" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Render the selected category screen */}
      {selected !== undefined && <Text>{cat[selected]} selected!</Text>}
    </View>
  );
};

export default Category;
