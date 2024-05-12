import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeIcon from '../../Components/HomeIcon'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../../Contexts/UserContext'

const Crudpro = () => {
   
  const nav=useNavigation()
  const { baseUrl,adminToken } = useContext(UserContext);


  
  

  const handleViewProduct = () => {

    fetch(`${baseUrl}/products/all_products/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization':'Bearer ' + adminToken.access
      },
    })
      .then(response => response.json())
      .then(data => {
        nav.navigate('Viewpro', { productList: data });
        
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
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Addpro')}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Delpro')}>
            <Text style={styles.buttonText}>Delete Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewProduct}>
            <Text style={styles.buttonText}>View Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Editpro')}>
            <Text style={styles.buttonText}>Edit Product</Text>
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

export default Crudpro