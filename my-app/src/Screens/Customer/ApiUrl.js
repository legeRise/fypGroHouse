

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UserContext from '../../Contexts/UserContext';

const ApiUrl = () => {
  const { baseUrl, setBaseUrl } = useContext(UserContext);
  const [newUrl, setNewUrl] = useState('');
  const navigation = useNavigation();

  const handleConfirm = () => {
    setBaseUrl(newUrl);
    navigation.navigate('Login'); // Replace 'NextScreen' with your actual screen name
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GRO</Text>
        <Text style={[styles.logoText, { color: "#2eb24b" }]}>HOUSE</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Enter API URL:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter URL"
            value={newUrl}
            onChangeText={setNewUrl}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  formContainer: {
    marginTop: 60,
  },
  heading: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "grey",
  },
  input: {
    borderColor: "#E3E3E3",
    borderBottomWidth: 2,
    fontSize: 16,
    marginTop: 15,
  },
  button: {
    backgroundColor: "#2eb24b",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    fontSize: 19,
    color: "white",
    fontWeight: "600",
  },
});

export default ApiUrl;
