import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState,useEffect } from "react";
import { myColors } from "../../Utils/myColors";
import Fruits from "../../Components/Fruits";
import { useNavigation } from "@react-navigation/native";
import HomeSearch from "../../Components/HomeSearch";
import CatLayout from "../../Components/CatLayout";

const Category = () => {
  const navigation = useNavigation();
  const [selected, setselected] = useState();
  const [cat, setCat] = useState([])
  const [products, setProducts] = useState([])



  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.221.249:9200/products/all_categories/'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json(); // Parse response JSON
        console.log(jsonData,'is the list of categories')
        setCat(jsonData); // Set data state with response data

      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code goes here
    };
  }, []);


  const handleCategoryPress = (item) => {
     
    fetch(`http://192.168.221.249:9200/products/list_category_products/${item.id}`) // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response body as JSON
      })
      .then(data => {
        console.log('Data:', data); // Log the response data
        navigation.navigate('CategoryFlatlist', { products: data });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
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
            onPress={() => handleCategoryPress(item)}
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
                source={{ uri: item.image }}
              />
            </View>
            <Text style={{ marginTop: 5, textAlign: "center" }}>{item.name}</Text>
            {/* <Text style={{ marginTop: 5, textAlign: "center" }}>{item.image}</Text> */}
          </TouchableOpacity>
        )}
      />

      {/* Render the selected category screen */}
      {selected !== undefined && <Text>{cat[selected]} selected!</Text>}
    </View>
  );
};

export default Category;
