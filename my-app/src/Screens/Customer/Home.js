import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeIcon from "../../Components/HomeIcon";
import HomeSearch from "../../Components/HomeSearch";
import { responsiveHeight } from "react-native-responsive-dimensions";
import HomeBanner from "../../Components/HomeBanner";
import ExclusiveProduct from "../../Components/ExclusiveProduct";
import ProductfFatlist from "../../Components/ProductfFatlist";
import { fruits } from "../../Utils/Data";
import { useNavigation } from "@react-navigation/native";
import Category from "./Category";

const Home = () => {
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
          <HomeSearch />
          <HomeBanner />
          <Category />
          <ExclusiveProduct title="Exclusive Offer" />
          <ProductfFatlist data={fruits} />
          <ExclusiveProduct title="Best Selling" />
          <ProductfFatlist data={fruits}/>
          <ExclusiveProduct title="Recommended" />
          <ProductfFatlist data={fruits}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;