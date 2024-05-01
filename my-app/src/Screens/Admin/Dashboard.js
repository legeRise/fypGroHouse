import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Chart from "../../Components/Chart";
import HomeIcon from "../../Components/HomeIcon";
import ExclusiveProduct from "../../Components/ExclusiveProduct";
import ProductfFatlist from "../../Components/ProductfFatlist";
import { fruits } from "../../Utils/Data";
import Bestsell from "../../Components/Bestsell";
const Dashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15, paddingTop: 40 ,gap: 20}}>
      <HomeIcon />
      <ScrollView 
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* First Row */}
          <View style={styles.row}>
            {/* First Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'purple', borderWidth: 2}]}>
              <Text style={styles.title}>Total Sale</Text>
              <Text style={styles.value}>$20,000</Text>
            </View>
            {/* Second Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'red', borderWidth: 2}]}>
              <Text style={styles.title}>Total Expense</Text>
              <Text style={styles.value}>$15,000</Text>
            </View>
          </View>
          {/* Second Row */}
          <View style={styles.row}>
            {/* Third Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'green', borderWidth: 2}]}>
              <Text style={styles.title}>Total Orders</Text>
              <Text style={styles.value}>100</Text>
            </View>
            {/* Fourth Column */}
            <View style={[styles.column, {backgroundColor: 'white', borderColor: 'blue', borderWidth: 2}]}>
              <Text style={styles.title}>Total Customers</Text>
              <Text style={styles.value}>50</Text>
            </View>
          </View>
        </View>
        <Chart />
        <View style={{marginTop:40,gap:25,paddingBottom:20}}>
        <ExclusiveProduct title="Best Selling" />
        <Bestsell data={fruits} />
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
});
