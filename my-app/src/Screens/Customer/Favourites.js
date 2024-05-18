import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image,Alert } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch,useSelector } from "react-redux";
import "../../../Redux/FavouriteSlice";
import { addToCart } from  "../../../Redux/CartSlice";



const Favourites = () => {
  const dispatch = useDispatch()
  const { baseUrl,authToken } = useContext(UserContext)
  const [userFavourites,setUserFavourites] = useState([])



  const addItem = (item) => {
    console.log(item,'item from addItem from add to cart')
    dispatch(addToCart(item))
    
  }


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
          // setStoreData(jsonData);
          setUserFavourites(jsonData)
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



  


  

  const renderItem = ({ item }) => (
    <TouchableOpacity >
    <View style={styles.order}>
      <View>
      <View style={styles.orderIdStatus}>
        <Text style={styles.product}>{item.name}</Text>
      </View>
      <View style={styles.dateWeight}>
      <Text style={styles.category}>Category: {item.category}</Text>
      </View>
      <View>
      <TouchableOpacity style={{"flexDirection" : "row",marginTop : 3}} onPress ={() => addItem(item)}>
               <Text style={{ fontSize : 15,fontWeight : "400",color : "yellow", backgroundColor : "#2eb24b",borderRadius : 16,padding  :7}}>Add to Cart</Text>
      </TouchableOpacity>
      </View>
      </View>
      <Image
         style={styles.image}
        source={{ uri: item.image }}
      />
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeIcon />
      <View><Text style={{fontSize: 25,fontWeight:"bold"}}>Your Favourites</Text></View>
      <FlatList
        data={userFavourites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ebeef3",
    gap:10
  },
  order: {
    flexDirection: "row",
    justifyContent : "space-between",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  orderIdStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  product: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom : 5
  },
  category: {
    fontSize: 16,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50, // Makes the image round
    marginLeft: 10,
  },
  status: {
    fontSize: 16,
    color: "#5cb85c",
  },
  dateWeight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
  },
  weight: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
})

export default Favourites;

