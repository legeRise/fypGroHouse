import React, { useState,useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../../Components/HomeIcon';
import UserContext from '../../Contexts/UserContext';



const Information = ({ route }) => {
  const { customerInfo } = useContext(UserContext)
  console.log(customerInfo,'this is info 11')
  
  const navigation = useNavigation();

  const [name, setName] = useState(customerInfo.username);
  const [phoneNumber, setPhoneNumber] = useState(customerInfo.phone);
  const [email, setEmail] = useState(customerInfo.email);
  const [address, setAddress] = useState(customerInfo.address);

  const handleSubmit = () => {
    navigation.navigate('Payment', {
      name,
      phoneNumber,
      email,
      address,
      order: route.params.order, // Pass order data to Payment screen
    });
  };

  return (
    <View style={styles.container}>
      <HomeIcon />
      <Text style={styles.infoLabel}>Enter Information</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
      />


      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    backgroundColor: 'white',
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop : 15
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Information;
