import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';

const OrderDetail = () => {
  // Dummy data for order details
  const order = [
    { name: 'Product 1', quantity: 2, price: 10, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 2', quantity: 1, price: 15, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 1', quantity: 2, price: 10, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 2', quantity: 1, price: 15, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 1', quantity: 2, price: 10, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 2', quantity: 1, price: 15, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 1', quantity: 2, price: 10, img: 'https://dummyimage.com/100x100/000/fff' },
    { name: 'Product 2', quantity: 1, price: 15, img: 'https://dummyimage.com/100x100/000/fff' },
    // Add more dummy data if needed
  ];

  const expressDeliveryFee = 30.0;

  const getTotalPrice = () => {
    let totalPrice = 0;
    order.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const totalAmount = parseFloat(getTotalPrice()) + expressDeliveryFee;

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.img }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>Price: Rs {item.price.toFixed(2)}</Text>
        <Text style={styles.total}>Total: Rs {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeIcon />
      <View style={styles.content}>
        <Text style={styles.title}>Order Summary</Text>
        <FlatList
          data={order}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{backgroundColor:"white"}}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          {/* Dummy customer information */}
          <Text style={styles.sectionText}>Name: John Doe</Text>
          <Text style={styles.sectionText}>Phone Number: 123-456-7890</Text>
          <Text style={styles.sectionText}>Email: john@example.com</Text>
          <Text style={styles.sectionText}>City: New York</Text>
          <Text style={styles.sectionText}>Address: 123 Main St</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          {/* Dummy payment information */}
          <Text style={styles.sectionText}>Payment Method: Credit Card</Text>
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

export default OrderDetail;
