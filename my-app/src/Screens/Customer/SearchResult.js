import React, { useState,useEffect,useContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../Utils/myColors";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Feather } from "@expo/vector-icons"; // Import Feather icon
import HomeIcon from "../../Components/HomeIcon";
import UserContext from "../../Contexts/UserContext";




const SearchResult = () => {

  const nav = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const { baseUrl,authToken }  = useContext(UserContext)
  
  console.log(filteredProducts,'are the filtered products')
  console.log(searchQuery,'is line 26 --------------alll serached prodducs')
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const response = await fetch(`${baseUrl}/products/all_products`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization':'Bearer ' + authToken.access
        },
      });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Clean-up function
    return () => {
      // Any clean-up code here
    };
  }, []);
  


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("this is the item\n\n",item)
        nav.navigate("Details", { main: item });
      }}
      activeOpacity={0.7}
      style={{
        flex: 1,
        margin: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#E3E3E3",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 100,
          width: responsiveWidth(40),
          resizeMode: "contain",
        }}
        source={{ uri: item.image }}
      />
      <View
        style={{ paddingHorizontal: 10, marginTop: 5, alignItems: "center" }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: myColors.third }}
        >
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={{ color: "grey", fontWeight: "500", fontSize: 14 }}>
          {item.pieces}
        </Text>
      </View>
      <View style={{ marginTop: 5, alignItems: "center" }}>
        <Text
          style={{ color: myColors.forth, fontSize: 20, fontWeight: "bold" }}
        >
          PKR {item.price}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(addToCart(item)); // Dispatch addToCart action with item
          
        }}
        style={{
          marginTop: 5,
          alignItems: "center",
          backgroundColor: "#2eb24b",
          marginLeft: 30,
          marginRight: 30,
          borderRadius: 10,
          paddingRight:5,
          paddingLeft:5,
          marginBottom:5
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredItems = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filteredItems);
  };
  
  

  return (
    <SafeAreaView style={{flex: 1,marginTop:13,gap:10,paddingHorizontal:15,backgroundColor:"white"}}>
      <HomeIcon />
      <View style={styles.container}>
        <Feather name="search" size={24} color="black" style={styles.icon} /> 
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={handleSearch}
        />
      </View>
      {searchQuery ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    backgroundColor: '#ebf0f4',
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
};

export default SearchResult;
