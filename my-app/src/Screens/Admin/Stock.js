import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stock = () => {
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');

  const handlePredict = () => {
    // Implement logic to predict based on the entered data
    // For now, we'll just log the values
    console.log('Price:', price);
    console.log('Rating:', rating);
    console.log('Category:', category);
    // You can add your prediction logic here
  };

  return (
    <SafeAreaView>
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Price:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          value={price}
          onChangeText={text => setPrice(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Rating:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          value={rating}
          onChangeText={text => setRating(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Category:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          value={category}
          onChangeText={text => setCategory(text)}
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 20 }}
        onPress={handlePredict}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Predict</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>

  );
}

export default Stock ;
