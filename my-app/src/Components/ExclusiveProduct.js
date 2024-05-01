import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../Utils/myColors";

const ExclusiveProduct = ({ title }) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: -8 }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700", color: myColors.third }}>
        {title}
      </Text>
    </View>
  );
};

export default ExclusiveProduct;
