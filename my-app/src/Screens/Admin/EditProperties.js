import React, { useState,useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import UserContext from '../../Contexts/UserContext';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

export default function EditProperties( {route} ) {
 const nav = useNavigation()
  const { item } = route.params
  const { baseUrl } = useContext(UserContext)
  // const [id, setId] = useState(new Date().getTime());
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(item.price.toString())
  const [stock, setStock] = useState(item.stock.toString());
  const [image, setImage] = useState(item.image);
  const [categories, setCategories ]= useState(['']);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/all_categories`);
        const data = await response.json();
        const categoryNames = data.map((item) => item.name);
        console.log(categoryNames);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchCategories(); // Call the fetchCategories function when the component mounts
  }, []);

  const handleCategoryChange = (item) => {
    setSelectedCategory(item.value);
  };

  const handleUpdateProduct = () => {
    console.log('what is the id of the product?',item.id)

    // Create a new FormData object
    const formData = new FormData();
  
    // Append the data fields to the FormData object
    formData.append('name', name);
    formData.append('description', description);
    // console.log("this is the selectedCategory",selectedCategory,"nd this is ",item.category)
    formData.append('category', selectedCategory ? selectedCategory : item.category)
    formData.append('price', price);
    formData.append('stock', stock);
    
    // Append the image file to the FormData object
    formData.append('image', {
      uri: image,
      type: 'image/jpeg', // Adjust the type based on the image format
      name: 'product_image.jpg' // You can specify any file name here
    });
    console.log('the form data',formData)
    // Make the POST request to the endpoint
  //   console.log(`${baseUrl}/products/update_product/${item.id}`)
    fetch(`${baseUrl}/products/update_product/${item.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
      },
      body: formData
    })
    .then(response => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      return response.json();
    })
    .then(data => {
      console.log('Product updated successfully:', data);
      navigator.navi
      // Optionally, you can perform any additional actions here after successful addition
    })
    .catch(error => {
      console.error('Error updating product:', error);
      // Handle errors or display error message to the user
    });
   };
  

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.cancelled) {
        console.log('Image selection cancelled');
        return;
      }
  
      // console.log('Selected image URI:', result["assets"][0].uri);
      setImage(result["assets"][0].uri);
    } catch (error) {
      console.error('Error selecting image:', error);
      alert('Error selecting image. Please try again.'); 
    }
  };
  

  const takePhoto = async () => {
    requestCameraPermission();

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setImage(result["assets"][0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom:50 }}>
        <HomeIcon />
      </View>
      
      {/* <TextInput
        style={styles.input}
        placeholder="ID"
        value={id.toString()}
        onChangeText={setId}
      /> */}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

<DropDownPicker
  items={categories.map((category) => ({ label: category, value: category }))}
  defaultValue={categories.find((category) => category === item.category)}
  containerStyle={styles.categoryDropdown}
  style={styles.dropDown}
  placeholder="Select category"
  onChangeItem={handleCategoryChange}
/>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Available Stock"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />
      <View style={styles.cameraContainer}>
        <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
          <Feather name="camera" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galleryIcon} onPress={pickImage}>
          <Feather name="image" size={24} color="gray" />
        </TouchableOpacity>
        {/* {image && <Image source={{ uri: image }} style={styles.previewImage} />} */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>
      {/* {image && <View style={styles.imageBox}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>} */}
      <View style={styles.borderBox}>
        {image && <Image source={{ uri: image }} style={styles.imageInBorder} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cameraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraIcon: {
    marginRight: 20,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'gray',
    marginLeft: 20,
  },
  categoryDropdown: {
    height: 50,
    marginBottom: 20,
  },
  dropDown: {
    backgroundColor: '#fafafa',
  },
  imageBox: {
    borderWidth: 2,
    borderColor: 'gray',
    marginTop: 20,
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  borderBox: {
    borderWidth: 2,
    borderColor: 'gray',
    height: 200,
    alignSelf: 'center',
    width: windowWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageInBorder: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
