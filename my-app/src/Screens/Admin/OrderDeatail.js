import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import UserContext from '../../Contexts/UserContext';

const OrderDeatail = ({ route }) => {
  console.log(route.params, 'is 999 route');
  const { orderSummary } = route.params;
  console.log(orderSummary, 'in orderdetail 9');

  const { baseUrl } = useContext(UserContext);

  const expressDeliveryFee = 30.0;

  const getTotalPrice = () => {
    let totalPrice = 0;
    orderSummary.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const totalAmount = parseFloat(getTotalPrice()) + expressDeliveryFee;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>Price: Rs {item.price}</Text>
        <Text style={styles.total}>Total: Rs {(item.price * item.quantity).toFixed(2)}</Text>
        <Text style={styles.total}>{item.customer_info.customer_payment_method}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeIcon />
      <View style={styles.content}>
        <Text style={styles.title}>Order Summary</Text>
        <FlatList
          data={orderSummary}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ backgroundColor: "white" }}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <Text style={styles.sectionText}>Name: {orderSummary[0].customer_info.customer_name}</Text>
          <Text style={styles.sectionText}>Phone Number: {orderSummary[0].customer_info.customer_phone}</Text>
          <Text style={styles.sectionText}>Email: {orderSummary[0].customer_info.customer_email}</Text>
          <Text style={styles.sectionText}>Address: {orderSummary[0].customer_info.customer_address}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <Text style={styles.sectionText}>Payment Method: {orderSummary[0].customer_info.customer_payment_method}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text>Total</Text>
          <Text>Rs {totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Approve Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ebeef3",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    color: 'black',
  },
  price: {
    color: 'black',
  },
  total: {
    color: 'black',
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    marginBottom: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  confirmButtonContainer: {
    marginBottom: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: "#2eb24b",
    height: 40,
    width: '100%',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderDeatail;

