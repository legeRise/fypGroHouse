import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../Utils/myColors";
import {Feather} from '@expo/vector-icons'

const HomeIcon = () => {
  return (
    <View style={{flexDirection: "row",alignItems: "center",justifyContent: "center",marginStart: 50,marginRight:50,}} >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        
        
        }}
      >
        <Text
          style={{
            color: myColors.third,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          GRO
        </Text>
        <Text
          style={{
            color: myColors.forth,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          HOUSE
        </Text>
      </View>
    </View>
  );
};

export default HomeIcon;
