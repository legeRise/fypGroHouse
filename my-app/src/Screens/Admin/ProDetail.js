import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import { myColors } from "../../Utils/myColors";
import DropDownPicker from "react-native-dropdown-picker";
import { PieChart } from "react-native-chart-kit";
import UserContext from "../../Contexts/UserContext";

const ProDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();
  console.log("i am proDetail.js")
  const { productData } = route.params;
  const { id, name, price, stock, image, description, category } = productData;
  const { baseUrl,adminToken} = useContext(UserContext);

  console.log("this is the productData in ProDetail", productData);
  // State variables for selected year and month
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("Monthly");
  const [predictedStock, setPredictedStock] = useState(0);
  console.log(productData.stock_sold)
  const [actualStock, setActualStock] = useState(productData.stock_sold);
   console.log("hmmm 34 ")
  useEffect(() => {
    // Do nothing if price or selectedMonth is not set yet
    if (!price || !selectedMonth) return;

    const data = {
      price,
      time_period: selectedMonth.toLowerCase(),
    };

    // Make the POST request
    fetch(`${baseUrl}/products/model/${name}_model/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':'Bearer ' + adminToken.access
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data,'i am the data 54')
        if (data.expected_sales) {
        // Set the predicted sales in state
        
        console.log(data, "the response from model");

        setPredictedStock(data.expected_sales);
        }
        else{
          console.log("Model not trained yet")

        }
        // Assuming you have actual stock data coming from somewhere, update actual stock here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [price, selectedMonth]);
 console.log(' hmm 71')
  // Data for the pie chart
  console.log(predictedStock," this is the predicted stock required")
  const pieChartData = [
    {
      name: "Predicted Stock",
      value: predictedStock,
      color: "#2eb24b", // Green color for predicted stock
    },
    {
      name: "Actual Stock",
      value: actualStock,
      color: "#ff6347", // Red color for actual stock
    },
  ];
  console.log("this ")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 15 }}>
          <Image
            resizeMode="contain"
            style={{ height: 300 }}
            source={{ uri: image }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, left: 15 }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: myColors.third,
              fontWeight: "700",
              marginTop: 15,
              marginBottom: 10,
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 10,marginTop:10}}>Price: {price}PKR</Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 10,marginTop:10 }}>Description</Text>
          <Text style={{ fontSize: 16, color: "grey", marginBottom: 10 }}>
            {description}
          </Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 10 }}>
            Category: {category}
          </Text>


          <View style={{ marginTop: 50 }}>
            {/* Year Dropdown */}
            {/* <DropDownPicker
              items={[
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
              ]}
              defaultValue={selectedYear}
              containerStyle={{ height: 40, marginBottom: 10 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setSelectedYear(item.value)}
            /> */}
            {/* Month Dropdown */}
            <DropDownPicker
              items={[
                { label: "Weekly", value: "Weekly" },
                { label: "Monthly", value: "Monthly" },
              ]}
              defaultValue={selectedMonth}
              containerStyle={{ height: 40, marginBottom: 20 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setSelectedMonth(item.value)}
            />
            {/* Pie Chart */}
            <PieChart
  data={pieChartData}
  width={300}
  height={220}
  chartConfig={{
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  accessor="value" // Change this to "value"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
  renderLabel={({ data, dataIndex }) => {
    return `${data[dataIndex].name}: ${data[dataIndex].value}`;
  }}
/>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProDetail;

const styles = StyleSheet.create({});
