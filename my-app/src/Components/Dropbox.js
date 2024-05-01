import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Dropdown } from "../Utils/Data";
import { AntDesign } from "@expo/vector-icons";

const Dropbox = () => {
  const [myIndex, setmyIndex] = useState(null);

  return (
    <ScrollView style={{ marginTop: 20 }}>
      {Dropdown.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => {
              setmyIndex(myIndex === index ? null : index);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor: "#E3E3E3",
              borderWidth: 2,
              marginBottom: 10,
              paddingVertical: 15,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
            }}
          >
            <Text>{item.title}</Text>
            <AntDesign
              name={myIndex === index ? "up" : "down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {myIndex === index ? (
            <ScrollView style={{ maxHeight: 200 }}>
              <Text style={{ color: "grey" }}>{item.content}</Text>
            </ScrollView>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
};

export default Dropbox;
