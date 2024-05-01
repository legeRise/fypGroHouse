import { View, Text ,ScrollView} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import HomeIcon from "./HomeIcon";
import ExclusiveProduct from "../Components/ExclusiveProduct";
import ProductfFatlist from "../Components/ProductfFatlist";
import { fruits } from "../Utils/Data";
import CategoryFlatlist from "./CategoryFlatlist";

const Meat = () => {
  const nav=useNavigation()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
      showsVerticalScrollIndicator={false}
       style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
        <View style={{ gap: 20 ,paddingBottom:20}}>
          <HomeIcon />
          <ExclusiveProduct title="Fruits" />
          <CategoryFlatlist data={fruits}/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Meat ;