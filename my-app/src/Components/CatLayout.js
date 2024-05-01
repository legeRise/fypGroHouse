import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeSearch from './HomeSearch';

const CatLayout = ({ category, children }) => {
  return (
    <View style={styles.container}>
      <HomeSearch onSearch={searchText => handleSearch(searchText, category)} category={category} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

const handleSearch = (searchText, category) => {
  // Handle the search request
};

export default CatLayout;