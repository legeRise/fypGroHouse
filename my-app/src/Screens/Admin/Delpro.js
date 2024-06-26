import React,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Expo's AntDesign and MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../../Components/HomeIcon';
import HomeSearch from '../../Components/HomeSearch';
import UserContext from '../../Contexts/UserContext'

const Delpro = () => {
  // Sample data for demonstration
  [products, setProducts] = useState("")

  const { baseUrl,adminToken } = useContext(UserContext)


  const nav = useNavigation() 


  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/all_products`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization':'Bearer ' + adminToken.access
          },
        });
        const data = await response.json();
        const productList = data.map((item) => item);
        console.log(productList);
        setProducts(productList)
      } catch (error) {
        console.error('Error fetching Products:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchProducts(); 
  }, []);

  const handleDeleteProduct = async (item) => {
    console.log('What is the ID of the product?', item.id, "Product name is ", item.name);
  
    try {
      const response = await fetch(`${baseUrl}/products/delete_product/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + adminToken.access
        }
      });
  
      const data = await response.json();
      console.log(response.status,'is the ersposne .status')
  
      if (response.status === 204) {
        console.log('Product Deleted successfully:', data);
        Alert.alert("Success", "Product Deleted Successfully");
      } else {
        console.log(response.status);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      // Handle errors or display error message to the user
    }
  };
  


  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 17, backgroundColor: "white", gap: 20 }}>
      {/* Back Arrow Icon */}
      <TouchableOpacity style={{ position: 'absolute', top: 20, }} onPress={() => nav.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <HomeIcon />
      <HomeSearch />

      {/* FlatList */}
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
             
            }}
          >
            {/* Image */}
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
                Category: Fruits
              </Text>

              {/* Price */}
              <Text style={{ fontSize: 20, fontWeight: "600", color: "#2eb24b", marginTop: 20 }}>
                Rs {item.price} {/* Format price to 2 decimal places */}
              </Text>
            </View>

            {/* Delete Icon */}
            <TouchableOpacity
              style={{ flex: 0.1, alignItems: 'flex-end' }}
              onPress={() => handleDeleteProduct(item)} // Navigate to EditProperties screen
            >
              <AntDesign name="delete" size={24} color="black" />
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

export default Delpro;
