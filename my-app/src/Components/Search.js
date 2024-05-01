import { View, Text, TextInput } from "react-native";
import React, {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Feather } from "@expo/vector-icons";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <View
      style={{
        backgroundColor: "#ebf0f4",
        height: responsiveHeight(6.5),
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        gap: 10,
      }}
    >
      <Feather name="search" size={24} color="black" />
      <TextInput
        style={{flex:1}}
        placeholder="Search Here"
        value={searchTerm}
        onChangeText={(text) => handleSearch(text)}
      />
    </View>
  );
};

export default Search;
