import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const HomeSearch = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the SearchResult screen when the component is clicked
    navigation.navigate('SearchResult');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Feather name="search" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search Here"
          editable={false} // Make the input non-editable
          selectTextOnFocus={false} // Don't select text on focus
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebf0f4',
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default HomeSearch;
