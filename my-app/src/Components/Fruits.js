import { View, Text ,ScrollView} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import HomeIcon from "./HomeIcon";
import ExclusiveProduct from "../Components/ExclusiveProduct";
import ProductfFatlist from "../Components/ProductfFatlist";
import { fruits } from "../Utils/Data";
import CategoryFlatlist from "./CategoryFlatlist";
import BackIcon from "./BackIcon";

const Fruits = () => {
  const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
      showsVerticalScrollIndicator={false}
       style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
        <View style={{ gap: 20 ,paddingBottom:20}}>
          <BackIcon />
          <HomeIcon />
          <ExclusiveProduct title="Fruits" />
          <CategoryFlatlist data={fruits}/>
          
        </View>
      </ScrollView>
    </View>
  );
};

export default Fruits;
