import { View, Text, ScrollView } from "react-native";
import React,{useEffect,useContext,useState} from "react";
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
import UserContext from "../../Contexts/UserContext";




const Home = () => {

  const { baseUrl,customerId } = useContext(UserContext)
  const [ recommendedProducts,setRecommendedProducts ] = useState("")
  const nav=useNavigation()

  
  useEffect(() => {
    const recommendedProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/show_recommendations/${customerId}`);
        if (!response.ok) {
          console.log("not ok");   
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData.recommended_products)
        setRecommendedProducts(jsonData.recommended_products);
        // setTotalOrders(jsonData.total_orders);
        console.log(jsonData); // Log the data to the console
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    recommendedProducts(); // Call the function here
  }, []); // Empty dependency array since this effect runs only once
  


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
          <ProductfFatlist data={recommendedProducts}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;