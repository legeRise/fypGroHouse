import React,{useState,useContext} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import UserContext from '../../Contexts/UserContext';
import { useDispatch } from "react-redux";
import { clearCart } from "../../../Redux/CartSlice";




const ReConfirm = ({ route, navigation }) => {
  const { authToken,baseUrl } = useContext(UserContext)
  const { order, name, phoneNumber, email, address, paymentOption } = route.params;
  console.log(route.params)
  console.log("is the order ---> ",order,"---- at 17 in reconfirm.js")

  const dispatch =  useDispatch();

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




const handleConfirmOrder = () => {
  const apiUrl = `${baseUrl}/products/store_order/`;

  let order_data = [];
  order.forEach(product => {
      const productId = product.id;
      const quantity = product.quantity;
      console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
      order_data.push({ "id": productId, "quantity": quantity });
  });

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + authToken.access
      },
      body: JSON.stringify({
          order_data: order_data
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to place order.');
      }
      // Parse response body as JSON
      return response.json();
  })
  .then(data => {
      // Assuming the order ID is returned in the response
      const orderId = data.order_id;
      console.log('Order placed successfully! Order ID:', orderId);

  //_______________________________________________Record Interaction________________________________________
      // Record interactions
      const my_interactions = order.map(product => ({
          "product": product.id,   // the error was due to wrong field name  i had set it to 'id' before
          "purchased": true
      }));


      const interactionsApiUrl = `${baseUrl}/products/record_interactions/`;
      console.log("interaction url",interactionsApiUrl)
      fetch(interactionsApiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + authToken.access
          },
          body: JSON.stringify(my_interactions)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to record interactions.');
          }
          return response.json();
      })
      .then(data => {
          console.log('Interactions recorded successfully!');
          dispatch(clearCart());
          navigation.navigate("Final", { orderNumber: orderId });
      })
      .catch(error => {
          console.error('Error recording interactions:', error);
      });
  })
  .catch(error => {
      console.error('Error placing order:', error);
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
