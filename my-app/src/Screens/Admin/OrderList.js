import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';

const ORDER_DATA = [
  {
    id: '1',
    orderId: '429242424',
    status: 'Shipped',
    date: 'Mon. July 3rd',
    weight: '2.5 lbs',
    amount: '$1.50',
  },
  {
    id: '2',
    orderId: '429242424',
    status: 'Shipped',
    date: 'Mon. July 3rd',
    weight: '2.5 lbs',
    amount: '$1.50',
  },
  // Add more order data here
]

const OrderList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.order}>
      <View style={styles.orderIdStatus}>
        <Text style={styles.orderId}>Order #: {item.orderId}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.dateWeight}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.weight}>{item.weight}</Text>
      </View>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeIcon />
      <View><Text style={{fontSize: 30,fontWeight:"bold"}}>Orders</Text></View>
      <FlatList
        data={ORDER_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ebeef3",
    gap:10
  },
  order: {
    flexDirection: "column",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  orderIdStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "#5cb85c",
  },
  dateWeight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
  },
  weight: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
})

export default OrderList;
