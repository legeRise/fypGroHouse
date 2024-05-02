import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../../Components/HomeIcon';

const Payment = ({ route }) => {
  const navigation = useNavigation();

  // Extracting data from route params
  const { name, phoneNumber, email, city, address, order } = route.params;

  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [mobileNumber, setMobileNumber] = useState(phoneNumber);

  const handleConfirmPayment = () => {
    console.log('Payment confirmed!');
    navigation.navigate('ReConfirm', {
      order,
      name,
      phoneNumber,
      email,
      city,
      address,
      paymentOption,
    });
  };

  const renderPaymentOptionInput = () => {
    // Render payment option input fields based on selected payment method
    switch (paymentOption) {
      case 'creditCard':
        return (
          <>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              placeholder="Enter card number"
            />
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
            />
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCVV}
              keyboardType="numeric"
              placeholder="CVV"
            />
          </>
        );
      case 'jazzCash':
        return (
          <>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="numeric"
              placeholder="Enter mobile number"
            />
          </>
        );
      case 'cashOnDelivery':
        return null; // No additional input fields required for cash on delivery
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", gap: 10, marginTop: 10, paddingHorizontal: 15 }}>
      <HomeIcon />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.infoLabel}>Select Payment Method</Text>

        <TouchableOpacity
          style={[styles.paymentOptionButton, paymentOption === 'creditCard' && styles.selectedPaymentOption]}
          onPress={() => setPaymentOption('creditCard')}
        >
          <Text>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOptionButton, paymentOption === 'jazzCash' && styles.selectedPaymentOption]}
          onPress={() => setPaymentOption('jazzCash')}
        >
          <Text>JazzCash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOptionButton, paymentOption === 'cashOnDelivery' && styles.selectedPaymentOption]}
          onPress={() => setPaymentOption('cashOnDelivery')}
        >
          <Text>Cash on Delivery</Text>
        </TouchableOpacity>

        {renderPaymentOptionInput()}

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentOptionButton: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedPaymentOption: {
    backgroundColor: '#e6e6e6',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Payment;
