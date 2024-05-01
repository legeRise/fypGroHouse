// 


import React,{useContext,useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Expo's AntDesign and MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../../Components/HomeIcon';
import HomeSearch from '../../Components/HomeSearch';
import UserContext from '../../Contexts/UserContext'

const Delcat = () => {
  // Sample data for demonstration
  [categories, setCategories] = useState("")

  const { baseUrl } = useContext(UserContext)


  const nav = useNavigation() 


  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/all_categories`);
        const data = await response.json();
        const categoriesList = data.map((item) => item);
        console.log(categoriesList);
        setCategories(categoriesList)
      } catch (error) {
        console.error('Error fetching Categories:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchCategories(); 
  }, []);

 
  const handleDeleteCategory = (item) => {
    console.log('what is the id of the category?',item.id,"category name is ",item.name)


    fetch(`${baseUrl}/products/delete_category/${item.id}`, {
      method: 'Delete',
    })
    .then(response => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to Delete Category');
      }
      return response.json();
    })
    .then(data => {
      console.log('Category Deleted successfully:', data);
      // Optionally, you can perform any additional actions here after successful addition
    })
    .catch(error => {
      console.error( error);
      // Handle errors or display error message to the user
    });
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
        data={categories}
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

            {/* category Info */}
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
            </View>

            {/* Delete Icon */}
            <TouchableOpacity
              style={{ flex: 0.1, alignItems: 'flex-end' }}
              onPress={() => handleDeleteCategory(item)} // Navigate to EditProperties screen
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

export default Delcat;
