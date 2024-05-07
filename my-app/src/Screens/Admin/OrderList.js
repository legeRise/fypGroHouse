import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeIcon from '../../Components/HomeIcon';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';




const OrderList = () => {
  
  const [orderSummary, SetOrderSummary] = useState([])
  // const [allOrderData, setAllOrderData] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const { baseUrl } = useContext(UserContext)

  const nav = useNavigation()



    const fetchData = async () => {
      try {
        console.log(`${baseUrl}/products/all_orders/`)
        const response = await fetch(`${baseUrl}/products/all_orders/`); // Replace with your API endpoint
        // console.log("i am in ordelist",response.json())
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json(); // Parse response JSON
        console.log(jsonData,'is the list of categories')
        setAllOrders(jsonData); // Set data state with response data
        
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };


    useEffect(() => {
      fetchData();
  
      // Clean-up function if needed
      return () => {
        // any clean-up code goes here
      };
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts
  
    useFocusEffect(
      React.useCallback(() => {
        fetchData(); // Call fetchProducts when screen is focused
      }, [])
    );


const handleOrderDetailView = async (item) => {
    try {
        const response = await fetch(`${baseUrl}/products/single_order_detail/${item.id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parse response JSON
        const orderSummary = await response.json();
        console.log(orderSummary, 'is the orderSummary');

        orderSummary["order_id"] = item.id
        // Set the orderSummary state variable with fetched data
        SetOrderSummary(orderSummary);
        
        // Navigate to the OrderDetail screen with orderSummary
        nav.navigate("OrderDeatail", { orderSummary,orderId: item.id });
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
  };

  

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderDetailView(item)}>
    <View style={styles.order}>
      <View style={styles.orderIdStatus}>
        <Text style={styles.orderId}>Order #: {item.id}</Text>
        <Text style={styles.status}>
        {/* {item.city.charAt(0).toLocaleUpperCase() + item.city.slice(1).toLocaleLowerCase()} */}
        {item.approved ? "Approved" : "Pending"}
        </Text>
      </View>
      <View style={styles.dateWeight}>
       <Text>  {item.order_date} </Text>
        <Text style={styles.weight}>{item.weight}</Text>
      </View>
      <Text style={styles.amount}> {item.customer_name}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeIcon />
      <View><Text style={{fontSize: 30,fontWeight:"bold"}}>Orders</Text></View>
      <FlatList
        data={allOrders}
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

