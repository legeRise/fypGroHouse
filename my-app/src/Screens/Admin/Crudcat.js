import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState,useEffect,useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeIcon from '../../Components/HomeIcon'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../../Contexts/UserContext'
const Crudcat = () => {
  const { baseUrl }  = useContext(UserContext)
  const nav=useNavigation()


  const handleViewCategory = () => {
    fetch(`${baseUrl}/products/all_categories/`)
      .then(response => response.json())
      .then(data => {
        nav.navigate('Viewcat', { categoryList: data });
      })
      .catch(error => {
        console.error('Error fetching product list:', error);
        // Handle error, show error message, etc.
      });
  };





  return (
    <SafeAreaView style={{flex: 1,marginHorizontal:20,marginTop:13}}>
      <HomeIcon />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Addcat')}>
            <Text style={styles.buttonText}>Add Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Delcat')}>
            <Text style={styles.buttonText}>Delete Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewCategory}>
            <Text style={styles.buttonText}>View Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Updatecat')}>
            <Text style={styles.buttonText}>Update Category</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default Crudcat;