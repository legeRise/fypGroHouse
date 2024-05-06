import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Contexts/UserContext';

const Prodd = () => {
  const nav=useNavigation()

  const { baseUrl } = useContext(UserContext)


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Crudpro')}>
        <Text style={styles.buttonText }>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Crudcat')} >
        <Text style={styles.buttonText}>Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Prodd;
