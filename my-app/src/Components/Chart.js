import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { BarChart } from 'react-native-chart-kit';

const Chart = ({ dailySales, weeklySales, monthlySales }) => {
  const [selectedInterval, setSelectedInterval] = useState('Daily');

  const data = {
    labels: selectedInterval === 'Daily' ? ['Today'] :
            selectedInterval === 'Weekly' ? Object.keys(weeklySales) : 
            selectedInterval === 'Monthly' ? Object.keys(monthlySales) : [],
    datasets: [
      {
        data: selectedInterval === 'Daily' ? [dailySales] : 
              selectedInterval === 'Weekly' ? Object.values(weeklySales) : 
              selectedInterval === 'Monthly' ? Object.values(monthlySales) : [],
        color: () => 'blue',
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
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
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Monthly', value: 'Monthly' },
          ]}
          defaultValue={selectedInterval}
          containerStyle={{ height: 40, width: 150 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{ justifyContent: 'flex-start' }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedInterval(item.value)}
        />
      </View>
      <Text style={styles.title}>Sales Statistics</Text>

      <ScrollView horizontal={true} style={{ marginHorizontal: 10 }}>
        <BarChart
          data={data}
          width={350}
          height={220}
          chartConfig={chartConfig}
          style={[styles.chart, { borderWidth: 2, borderColor: '#ccc' }]}
          yAxisSuffix="Rs"
          fromZero={true}
          yAxisInterval={10}
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
    color: 'black',
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
});

export default Chart;

