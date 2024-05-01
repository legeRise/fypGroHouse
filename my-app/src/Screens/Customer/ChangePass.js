import React, { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChangePass = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
  };
const nav=useNavigation()
  return (
    <SafeAreaView style={styles.container}>
     <HomeIcon />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={{
          borderColor: "#E3E3E3",
          borderBottomWidth: 2,
          fontSize: 16,
          marginTop: 15,
        }}
        secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={{ borderColor: "#E3E3E3",
        borderBottomWidth: 2,
        fontSize: 16,
        marginTop: 15,}}
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />

      <TouchableOpacity 
       onPress={() => {
        nav.navigate('Login');
        }}
        style={{
          backgroundColor: "#2eb24b",
          marginTop: 30,
          height: 60,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Text style={{color: "white"}}>Submit</Text>
        </TouchableOpacity>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
  },
  subLabel: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
});

export default ChangePass ;