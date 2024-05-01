import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';

const ReConfirm = ({ route, navigation }) => {
  const { order, name, phoneNumber, email, city, address, paymentOption } = route.params;

  const expressDeliveryFee = 30.0;

  const getTotalPrice = () => {
    let totalPrice = 0;
    if (order) {
      order.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
    }
    return totalPrice.toFixed(2);
  };

  const totalAmount = parseFloat(getTotalPrice()) + expressDeliveryFee;

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.img }}
          style={{ width: 50, height: 50, marginRight: 10, resizeMode: 'contain' }}
        />
        <View style={{ flex: 1 }}>
          <ListItem.Title style={{ textTransform: 'capitalize', fontSize: 18, fontWeight: "bold" }}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={{ color: 'black' }}>Quantity: </Text>
            {item.quantity}
            <Text style={{ color: 'black' }}> Each: </Text>
            Rs {item.price.toFixed(2)}
            <Text style={{ color: 'black' }}> Total: </Text>
            Rs {(item.price * item.quantity).toFixed(2)}
          </ListItem.Subtitle>
        </View>
      </ListItem.Content>
    </ListItem>
  );

  // Function to format customer information and payment method
  const formatInfo = (label, value) => {
    return (
      <Text>
        <Text style={{ fontWeight: 'bold' }}>{label}: </Text>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Text>
    );
  };

  // Generate a unique order number
  const generateOrderNumber = () => {
    // Create a unique identifier (e.g., timestamp)
    const timestamp = Date.now().toString();
    return timestamp;
  };

  const orderNumber = generateOrderNumber();

  // Pass all information to the Final screen
  const handleConfirmOrder = () => {
    navigation.navigate('Final', { 
      orderNumber, 
      order, 
      name, 
      phoneNumber, 
      email, 
      city, 
      address, 
      paymentOption 
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, paddingHorizontal: 15, backgroundColor: "#ebeef3" }}>
      <HomeIcon />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Order Summary
        </Text>
        <FlatList
          data={order}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "white", padding: 10, borderRadius: 10, marginTop: 10 }}>
          <Text>Total</Text>
          <Text>Rs {totalAmount.toFixed(2)}</Text>
        </View>
        <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Customer Information</Text>
          {formatInfo('Name', name)}
          {formatInfo('Phone Number', phoneNumber)}
          {formatInfo('Email', email)}
          {formatInfo('City', city)}
          {formatInfo('Address', address)}
        </View>
        <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Payment Information</Text>
          {formatInfo('Payment Method', paymentOption)}
        </View>
      </View>
      <View style={{ marginBottom: 20,paddingTop:20 }}>
        <TouchableOpacity onPress={handleConfirmOrder} style={{ backgroundColor: "#2eb24b", height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>Confirm Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReConfirm;
