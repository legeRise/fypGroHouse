import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { BarChart } from 'react-native-chart-kit';

const Chart = () => {
  const [selectedInterval, setSelectedInterval] = useState('Today');

  const data = {
    labels:
      selectedInterval === 'Today'
        ? ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm']
        : selectedInterval === 'Weekly'
        ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        : selectedInterval === 'Monthly'
        ? ['1st', '5th', '10th', '15th', '20th', '25th', '30th']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data:
          selectedInterval === 'Today'
            ? [1, 2, 3, 4, 5, 6, 7, 8]
            : selectedInterval === 'Weekly'
            ? [10, 20, 15, 25, 30, 35]
            : selectedInterval === 'Monthly'
            ? [50, 70, 60, 80, 90, 85, 75]
            : [100, 200, 150, 120, 220, 200, 150, 170, 140, 200, 220, 190],
        color: () => 'blue', // Set the color directly to 'blue' for simplicity
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for both x-axis and y-axis labels
    barPercentage: 0.5, // Adjust bar width
    propsForDots: {
      r: '8',
      strokeWidth: '2',
      stroke: '#007aff',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          items={[
            { label: 'Today', value: 'Today' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Yearly', value: 'Yearly' },
          ]}
          defaultValue={selectedInterval}
          containerStyle={{ height: 40, width: 150 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedInterval(item.value)}
        />
      </View>
      <Text style={styles.title}>Sales Statistics</Text>

      <ScrollView horizontal={true} style={{ marginHorizontal: 10 }}>
        <BarChart
          data={data}
          width={350} // Adjust width based on your data
          height={220}
          chartConfig={chartConfig}
          style={[styles.chart, { borderWidth: 2, borderColor: '#ccc' }]} // Add border
          yAxisSuffix="k" // Add k for thousands
          fromZero={true} // Start y-axis from 0
          yAxisInterval={10} // Interval of y-axis labels
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    width: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black', // Black color for text
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
});

export default Chart;
