import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Products = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = () => {
    // Implement logic to add the product with the entered data
    // For now, we'll just log the values
    console.log('Product Name:', productName);
    console.log('Price:', price);
    console.log('Quantity:', quantity);
  };

  return (
    <SafeAreaView>
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Product Name:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          value={productName}
          onChangeText={text => setProductName(text)}
        />
      </View>

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
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Quantity:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          value={quantity}
          onChangeText={text => setQuantity(text)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 10, marginTop: 20 }}
        onPress={handleAddProduct}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Add Product</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

export default Products ;
