import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import CheckBox from 'expo-checkbox'; // Import CheckBox from expo-checkbox
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Contexts/UserContext';
 
const RecipeDetail = ({ route, navigation }) => {
  const { recipe } = route.params;
  const { strMeal, strMealThumb, idMeal } = recipe;
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { baseUrl,authToken } = useContext(UserContext)

  const dispatch = useDispatch();
  const nav = useNavigation();


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


  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const meal = response.data.meals[0];
      const ingredientsData = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredientsData.push({
            name: meal[`strIngredient${i}`],
            measurement: meal[`strMeasure${i}`],
          });
        }
      }
      setIngredients(ingredientsData);
      setInstructions(meal.strInstructions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const toggleIngredient = (index) => {
    const newIngredients = [...selectedIngredients];
    const ingredient = ingredients[index];
    const selectedIndex = newIngredients.findIndex(item => item.name === ingredient.name);
    if (selectedIndex === -1) {
      newIngredients.push(ingredient);
    } else {
      newIngredients.splice(selectedIndex, 1);
    }
    setSelectedIngredients(newIngredients);
  };



  const searchIngredient = (text) => {
    // console.log(products,'are the products to search from')
    const filteredItems = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    // console.log("are the searched ingrdients",filteredItems)
    return filteredItems;
  };

  const handleRecipeSearch = (recipeIngredients) => {
    recipeIngredients.forEach((item) => {
      const ingredient = searchIngredient(item);
      if (ingredient.length > 0) { 
        dispatch(addToCart(ingredient[0]));
      }
       else {
        console.log(item,"is not available in store");
      }
    });
    nav.navigate("Cart")
  };
  

  const handleBuy = () => {
    const recipeIngredients = selectedIngredients.map(item => item.name);
    console.log(recipeIngredients)
    handleRecipeSearch(recipeIngredients)
    // nav.navigate("SearchRecipe",{ recipeIngredients })

  };

  return (
    <SafeAreaView style={{ flex: 1, gap: 20, backgroundColor: "#ffffff",marginTop: 20 }}>
      <View
        style={{
          flex: 0.3,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
      >
        <View style={{ flex: 1, marginTop: 10, justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{
              height: 200,
              width: 200,
              borderRadius: 999,
              borderWidth: 2,
              resizeMode: "cover",
            }}
            source={{ uri: strMealThumb }}
          />
        </View>
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
              navigation.goBack();
            }}
            name="chevron-back"
            size={24}
            color="black"
          />
        </View>
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{flex: 1,backgroundColor:"#eaf3d0",borderTopLeftRadius:35,borderTopRightRadius:35}}
      >
        <View
          style={{
            paddingHorizontal: 15,
            flex: 0.7,
            backgroundColor: "#eaf3d0",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 20 }}>{strMeal}</Text>
          <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 10, fontWeight: "bold", color: "black" }}>Ingredients:</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16 }}>{`${ingredient.name} - ${ingredient.measurement}`}</Text>
              <CheckBox
                value={selectedIngredients.some(item => item.name === ingredient.name)}
                onValueChange={() => toggleIngredient(index)}
                style={{ alignSelf: 'flex-end' }} // Align CheckBox to the right
              />
            </View>
          ))}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }} onPress={handleBuy}>
              <Text style={{ color: 'white', fontSize: 16 }}>Buy</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10, color: "black",fontWeight:"bold" }}>Instructions:</Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>{instructions}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default RecipeDetail;
