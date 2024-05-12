import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RecipSearch = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(2); // Initialize numColumns state

  const fetchRecipes = async () => {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
      if (searchTerm.trim() !== '') {
        url += searchTerm;
      }
      const response = await axios.get(url);
      setRecipes(response.data.meals);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      if (recipes != null) {
      setFilteredRecipes(recipes.filter(recipe => recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())));
      }
    }
  }, [recipes, searchTerm]);

  const navigateToRecipeDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToRecipeDetail(item)} style={styles.recipeItem}>
      <View style={styles.recipeContainer}>
        <Image
          resizeMode="cover"
          style={styles.recipeImage}
          source={{ uri: item.strMealThumb }}
        />
        <Text style={styles.recipeTitle}>{item.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns} // Update key prop when numColumns changes
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  recipeItem: {
    flex: 1,
    margin: 5,
  },
  recipeContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#E3E3E3",
    width: (Dimensions.get('window').width - 30) / 2, // Set width for 2 columns
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  recipeTitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    
  },
});

export default RecipSearch;
