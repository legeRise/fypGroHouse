import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CheckBox from 'expo-checkbox'; // Import CheckBox from expo-checkbox

const RecipeDetail = ({ route, navigation }) => {
  const { recipe } = route.params;
  const { strMeal, strMealThumb, idMeal } = recipe;
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [checkedIngredients, setCheckedIngredients] = useState([]);

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
            checked: false
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
    const newIngredients = [...ingredients];
    newIngredients[index].checked = !newIngredients[index].checked;
    setIngredients(newIngredients);
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
                value={ingredient.checked}
                onValueChange={() => toggleIngredient(index)}
                style={{ alignSelf: 'flex-end' }} // Align CheckBox to the right
              />
            </View>
          ))}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
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
