import React, {useContext, useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Expo's AntDesign and MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import UserContext from '../../Contexts/UserContext'
import HomeIcon from '../../Components/HomeIcon';
import HomeSearch from '../../Components/HomeSearch';


const Editpro = () => {
   [products, setProducts] = useState("")

   const { baseUrl } = useContext(UserContext)
   const nav= useNavigation(); // Initialize navigation object



  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseUrl}/products/all_products`);
      const data = await response.json();
      const productList = data.map((item) => item);
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching Products:', error);
      // Handle error, show error message, etc.
    }
  };

  useEffect(() => {
    fetchProducts();

    // Clean-up function if needed
    return () => {
      // any clean-up code goes here
    };
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchProducts(); // Call fetchProducts when screen is focused
  //   }, [])
  // );

 







  
  const handleEditProduct = (item) => {
    console.log(item.category)
      nav.navigate("EditProperties",{item:item})
   
  };




  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 17, backgroundColor: "white", gap: 20 }}>
      {/* Back Arrow Icon */}
      <TouchableOpacity style={{ position: 'absolute', top: 20, }} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <HomeIcon />
      <HomeSearch />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 0.5, backgroundColor: "white" }}
        data={products}
        renderItem={({ item, index }) => (
          
          <View

            style={{
              height: 120,
              borderBottomColor: "#E3E3E3",
              borderBottomWidth: 2,
              flexDirection: "row",
              alignItems: 'center', // Center align items vertically
            }}>

            {/* Image View */}
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 80, width: 80, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
            </View>

            {/* Product Info */}
            <View
              style={{
                flex: 0.6,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: 'black', // Change text color to black
                }}
              >
                {item.name}
              </Text>

              <Text style={{ fontSize: 16, fontWeight: "500", color: "#2eb24b" }}>
                Category: {item.category}
              </Text>

              {/* Price */}
              <Text style={{ fontSize: 20, fontWeight: "600", color: "#2eb24b", marginTop: 20 }}>
                Rs {item.price} {/* Format price to 2 decimal places */}
              </Text>
            </View>

            {/* Edit Icon */}
            <TouchableOpacity
              style={{ flex: 0.1, alignItems: 'flex-end' }}
              onPress={() => handleEditProduct(item)} // Navigate to EditProperties screen
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Make sure to provide a unique key
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default Editpro;
