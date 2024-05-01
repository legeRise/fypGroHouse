import React, { useState } from "react";
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
import Rating from "../../Components/Rate";
import DropDownPicker from "react-native-dropdown-picker";
import { PieChart } from "react-native-chart-kit";

const ProDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { productData } = route.params;
  const { name, price, stock, image,description,category } = productData;

  // State variables for selected year and month
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("January");

  // Data for the pie chart
  const pieChartData = [
    {
      name: "Predicted Stock",
      predicted: 500,
      actual: 300,
      color: "#2eb24b", // Green color for predicted stock
    },
    {
      name: "Actual Stock",
      actual: 300,
      predicted: 500,
      color: "#ff6347", // Red color for actual stock
    },
  ];

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
              marginTop : 15,
              marginBottom: 1,
            }}
          >
             {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <Text
            style={{
              fontSize: 22,
              color: myColors.forth,
              fontWeight: "bold",
              paddingTop: 20,
              marginBottom: 10,
            }}
          >
            Price: {price} PKR {'\n'}Available Stock: {stock}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 10 }}>Description</Text>
          <Text style={{ fontSize: 16, color: "grey", marginBottom: 10 }}>
            {description}
          </Text>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 10 }}>
            Category: {category}
          </Text>
          <Rating />
          
          <View style={{ marginTop: 50 }}>
            {/* Year Dropdown */}
            <DropDownPicker
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
            />
            {/* Month Dropdown */}
            <DropDownPicker
              items={[
                { label: "January", value: "January" },
                { label: "February", value: "February" },
                { label: "March", value: "March" },
                { label: "April", value: "April" },
                { label: "May", value: "May" },
                { label: "June", value: "June" },
                { label: "July", value: "July" },
                { label: "August", value: "August" },
                { label: "September", value: "September" },
                { label: "October", value: "October" },
                { label: "November", value: "November" },
                { label: "December", value: "December" },
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
  accessor="actual"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
  // Add renderLabel prop for custom labels
  renderLabel={({ data, dataIndex }) => {
    return `${data[dataIndex].name}: ${data[dataIndex].actual}`;
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
