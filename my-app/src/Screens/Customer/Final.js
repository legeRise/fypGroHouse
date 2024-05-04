import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Final = ({ route, navigation }) => {
  const { orderNumber } = route.params;

  const handleBackToHomePress = () => {
    clearCart(); // Clear cart data
    console.log("Cart Cleared"); // Debugging
    navigation.navigate('Tabs'); // Navigate to the Home screen
  };

  const clearCart = () => {
    // Implement logic to clear cart data here
    // For example:
    // dispatch({ type: 'CLEAR_CART' });
    console.log("Clearing Cart..."); // Debugging
  };

  const passDataToOrderList = () => {
    // Constructing the data object to pass to the OrderList screen
    const orderData = {
      orderNumber,
      order,
      name,
      phoneNumber,
      email,
      city,
      address,
      paymentOption
    };
    // Navigate to the OrderList screen and pass the data
    navigation.navigate('OrderList', orderData);
  };

  useEffect(() => {
    // Ensure cart is cleared when component unmounts (when navigating away)
    return () => {
      clearCart();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank You!</Text>
      <Text style={styles.orderNumberText}>Your Order Number:</Text>
      <Text style={styles.orderNumber}>{orderNumber}</Text>

      {/* No need to display customer and payment information */}



      <TouchableOpacity style={styles.button} onPress={handleBackToHomePress}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Final;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderNumberText: {
    fontSize: 18,
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange', // Adjust color as needed
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
