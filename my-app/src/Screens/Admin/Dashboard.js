import React,{ useContext, useEffect,useState } from "react";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Chart from "../../Components/Chart";
import HomeIcon from "../../Components/HomeIcon";
import ExclusiveProduct from "../../Components/ExclusiveProduct";
import ProductfFatlist from "../../Components/ProductfFatlist";
import { fruits } from "../../Utils/Data";
import Bestsell from "../../Components/Bestsell";
import UserContext from "../../Contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Dashboard = () => {
  const { baseUrl,adminToken,setAdminToken } = useContext(UserContext)
  const [totalCustomers, setTotalCustomers ] = useState("")
  const [totalOrders, setTotalOrders ] = useState("")
  const [totalSales, setTotalSales ] = useState("")
  const [dailySales, setDailySales ] = useState("")
  const [weeklySales, setWeeklySales ] = useState("")
  const [monthlySales, setMonthlySales ] = useState("")
  const [approvedOrders, setApprovedOrders ] = useState("")

  const [ bestSelling,setBestSellingProducts ] = useState("")

  const nav = useNavigation()



  const handleAdminLogout = async () => {
    setAdminToken("")
    await AsyncStorage.setItem("AdminToken","")
    nav.navigate("AdminLogin")
  }



  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/dashboard/`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + adminToken.access
        }
    });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setTotalCustomers(jsonData.total_customers);
      setTotalOrders(jsonData.total_orders);
      setTotalSales(jsonData.total_sales);
      setDailySales(jsonData.time_sales.daily_sales);
      setWeeklySales(jsonData.time_sales.weekly_sales);
      setMonthlySales(jsonData.time_sales.monthly_sales);
      setApprovedOrders(jsonData.approved_orders)
      
    } catch (error) {
      console.error('Error fetching data:', error);
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
      fetchData(); // Call fetchData when screen is focused
    }, [])
  );




  useEffect(() => {
    const bestSelling = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/best_sellings/`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization':'Bearer ' + adminToken.access
          },
        });
        if (!response.ok) {
          console.log("not ok");   
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData.best_selling_products,'this is the best_selling_products')
        setBestSellingProducts(jsonData.best_selling_products);
        // setTotalOrders(jsonData.total_orders);
        console.log(jsonData,'this is the jsondata'); // Log the data to the console
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    bestSelling(); // Call the function here
  }, []); // Empty dependency array since this effect runs only once
  








  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15, paddingTop: 40 ,gap: 20}}>
          <TouchableOpacity
            onPress={handleAdminLogout}>
            <View  style={styles.menuItem}>
            <FontAwesome5 name="sign-out-alt" size={20} color="#FF6347"  style={{marginRight: 5}} />
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      >
      <HomeIcon />
        <View style={styles.container}>
          {/* First Row */}
          <View style={styles.row}>
            {/* First Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'purple', borderWidth: 2}]}>
              <Text style={styles.title}>Total Sale</Text>
              <Text style={styles.value}>{totalSales? totalSales : "..."}</Text>
            </View>
            {/* Second Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'red', borderWidth: 2}]}>
              <Text style={styles.title}>Total Orders</Text>
              <Text style={styles.value}>{totalOrders? totalOrders : "..."}</Text>
            </View>
          </View>
          {/* Second Row */}
          <View style={styles.row}>
          <View style={[styles.column, {backgroundColor: 'white', borderColor: 'green', borderWidth: 2}]}>
              <Text style={styles.title}>Approved Orders</Text>
              <Text style={styles.value}>{approvedOrders? approvedOrders : "..."}</Text>
            </View>
            {/* Third Column */}

            {/* Fourth Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'blue', borderWidth: 2}]}>
              <Text style={styles.title}>Total Customers</Text>
              <Text style={styles.value}>{totalCustomers? totalCustomers : "..."}</Text>
            </View>
          </View>
        </View>
        <Chart dailySales={dailySales} weeklySales={weeklySales} monthlySales={monthlySales}/>
        <View style={{marginTop:40,gap:25,paddingBottom:20}}>
        <ExclusiveProduct title="Best Selling" />
        <Bestsell data={bestSelling} />
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: 'grey',
    marginBottom: 5,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
    menuItem: {
    flexDirection: "row",
    justifyContent : 'flex-end',
    paddingVertical: 6,
    alignItems: "center",
    
  }
});
