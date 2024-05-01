// import React from 'react';
// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Expo's AntDesign and MaterialCommunityIcons
// import { useNavigation } from '@react-navigation/native';
// import HomeIcon from '../../Components/HomeIcon';
// import HomeSearch from '../../Components/HomeSearch';

// const Updatecat = () => {
//   // Sample data for demonstration
//   const storeData = [
//     { id: '1', name: 'Fruits', img: 'https://example.com/apple.jpg' },
//     { id: '2', name: 'Vegetables', img: 'https://example.com/banana.jpg' },
//     // Add more items as needed
//   ];

//   const nav= useNavigation(); // Initialize navigation object

//   return (
//     <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 17, backgroundColor: "white", gap: 20 }}>
//       {/* Back Arrow Icon */}
//       <TouchableOpacity style={{ position: 'absolute', top: 20, }} onPress={() => navigation.goBack()}>
//         <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
//       </TouchableOpacity>

//       <HomeIcon />
//       <HomeSearch />

//       {/* FlatList */}
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         style={{ flex: 0.5, backgroundColor: "white" }}
//         data={storeData}
//         renderItem={({ item, index }) => (
//           <View
//             style={{
//               height: 120,
//               borderBottomColor: "#E3E3E3",
//               borderBottomWidth: 2,
//               flexDirection: "row",
//               alignItems: 'center', // Center align items vertically
//             }}
//           >
//             {/* Image */}
//             <View
//               style={{
//                 flex: 0.3,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Image
//                 style={{ height: 80, width: 80, resizeMode: "contain" }}
//                 source={{ uri: item.img }}
//               />
//             </View>

//             {/* Category Info */}
//             <View
//               style={{
//                 flex: 0.6,
//                 paddingHorizontal: 10,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: "600",
//                   color: 'black', // Change text color to black
//                 }}
//               >
//                 {item.name}
//               </Text>

              

             
//             </View>

//             {/* Edit Icon */}
//             <TouchableOpacity
//               style={{ flex: 0.1, alignItems: 'flex-end' }}
//               onPress={() => nav.navigate('Editcat')} // Navigate to EditProperties screen
//             >
//               <AntDesign name="edit" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={(item) => item.id} // Make sure to provide a unique key
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
  
// });

// export default Updatecat;


import React, {useContext, useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Expo's AntDesign and MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Contexts/UserContext'
import HomeIcon from '../../Components/HomeIcon';
import HomeSearch from '../../Components/HomeSearch';

const Updatecat = () => {
   [categories, setCategories] = useState("")

   const { baseUrl } = useContext(UserContext)
   const nav= useNavigation(); // Initialize navigation object


  
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


  const handleEditCategory = (item) => {
    console.log(item.category)
      nav.navigate("Editcat",{item:item})
   
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
        data={categories}
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

            {/* Category Info */}
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

            {/* Edit Icon */}
            <TouchableOpacity
              style={{ flex: 0.1, alignItems: 'flex-end' }}
              onPress={() => handleEditCategory(item)} // Navigate to EditProperties screen
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

export default Updatecat;
