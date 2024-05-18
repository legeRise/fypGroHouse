import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Alert
} from "react-native";
import React,{useContext, useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { myColors } from "../../Utils/myColors";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch,useSelector  } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import { addToFavourites,removeFromFavourites } from "../../../Redux/FavouriteSlice";
import UserContext from "../../Contexts/UserContext";



LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
const Details = ({ route }) => {
  
  const nav=useNavigation()
  const dispatch = useDispatch();
  const productData = route.params?.main;
  console.log(route)
  console.log(productData)

  const { name, price, image,description,unit } = productData;
  const { baseUrl, authToken }  = useContext(UserContext)
  const [filled, setFilled] = useState(false);
  
  const toggleFilled = () => {
    setFilled(!filled);
    if (!filled) {
      addFavourite(productData.id)
      Alert.alert("Success","Product Added to Favourites")
    } else {
      removeFavourite(productData.id)
      Alert.alert("Success","Product Removed from Favourites")
    }
  
    
  };



  const addFavourite = async (productId) => {
    try {
      const response = await fetch(`${baseUrl}/products/add_to_favourites/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken.access
        },
        body: JSON.stringify({ product: productId }) // Ensure body is JSON string
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        if (response.status === 200) {
          Alert.alert("Success",jsonData.message || "Success");
        }
        console.log(jsonData); // Log the data to the console
      } else {
        const jsonData = await response.json();
        if (response.status === 404) {
          alert(jsonData.message);
        } else if (response.status === 400) {
          alert(jsonData.message || "Bad request");
        } else {
          alert(jsonData.message || "Something went wrong");
        }
      }
  
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  


  const removeFavourite = async (productId) => {
    try {
      const response = await fetch(`${baseUrl}/products/remove_from_favourites/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken.access
        },

      });
  
      if (response.ok) {
        const jsonData = await response.json();
        if (response.status === 200) {
          Alert.alert("Success",jsonData.message || "Success");
        }
        console.log(jsonData); // Log the data to the console
      } else {
        const jsonData = await response.json();
        if (response.status === 404) {
          alert(jsonData.message);
        } else if (response.status === 400) {
          alert(jsonData.message || "Bad request");
        } else {
          alert(jsonData.message || "Something went wrong");
        }
      }
  
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };


  
  useEffect(() => {
    const fetchUserFavourites = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/get_user_favourites`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken.access}` // Assuming authToken is a valid token
          }
        });

        if (response.ok) {
          const jsonData = await response.json();
          const isFavourite = jsonData.some((item) => item.id === productData.id)
          console.log(isFavourite,'from the api 143')
          setFilled(isFavourite)
          
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to fetch favourites');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch favourites');
      }
    };

    fetchUserFavourites();

    // Cleanup function to cancel any pending requests if the component unmounts
    return () => {
      // Add any cleanup code if needed
    };
  }, []);

  




  
  



  
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
            <TouchableOpacity onPress={toggleFilled}>
      <MaterialIcons
        name={filled ? 'favorite' : 'favorite-border'}
        size={26}
        color={filled ? '#ff69b4' : 'black'}
      />
    </TouchableOpacity>
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
            Rs {price}/{unit}
          </Text>
          <Text style={{ fontSize: 20, color: myColors.third, fontWeight: "700",paddingBottom : 10 }}>Description</Text>
          <Text>{description}</Text>
          {/* <Dropbox /> */}
          {/* <Rate/> */}
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
