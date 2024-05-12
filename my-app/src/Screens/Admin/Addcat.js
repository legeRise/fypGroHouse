import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions,Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import UserContext from '../../Contexts/UserContext';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

export default function Addcat() {

  const { baseUrl,adminToken } = useContext(UserContext)

  // const [id, setId] = useState(new Date().getTime());
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  
  const handleAddCategory = () => {

    // Create a new FormData object
    const formData = new FormData();
  
    // Append the data fields to the FormData object
    formData.append('name', name);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg', // Adjust the type based on the image format
      name: 'category_image.jpg' // You can specify any file name here
    });


  
    // Make the POST request to the endpoint
    fetch(`${baseUrl}/products/add_category/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
        'Authorization':'Bearer ' + adminToken.access
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      return response.json();
    })
    .then(data => {
      console.log('Category added successfully:', data);
      Alert.alert("Success","Category Added Successfully")
  
      // Optionally, you can perform any additional actions here after successful addition
    })
    .catch(error => {
      console.error('Error adding category:', error);
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
  
      console.log('Selected image URI:', result["assets"][0].uri);
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
      
      
       
      <View style={styles.cameraContainer}>
        <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
          <Feather name="camera" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.galleryIcon} onPress={pickImage}>
          <Feather name="image" size={24} color="gray" />
        </TouchableOpacity>
        {/* {image && <Image source={{ uri: image }} style={styles.previewImage} />} */}
      </View>
      {/* {image && <View style={styles.imageBox}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>} */}
      <View style={styles.borderBox}>
        {image && <Image source={{ uri: image }} style={styles.imageInBorder} />}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
        <Text style={styles.buttonText}>Add Category</Text>
      </TouchableOpacity>
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
    marginTop: 10

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
