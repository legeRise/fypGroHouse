import 'react-native-gesture-handler';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/Screens/Customer/Splash";
import Signup from "./src/Screens/Customer/Signup";
import Login from "./src/Screens/Customer/Login";
import Home from "./src/Screens/Customer/Home";
import Details from "./src/Screens/Customer/Details";
import UserContextProvider from './src/Contexts/UserContextProvider';
import Cart from "./src/Screens/Customer/Cart";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store";
import Complete from "./src/Screens/Customer/Complete";
import Tabs from "./src/Screens/Customer/Tabs";
import Recipe from "./src/Screens/Customer/Recipe";
import Profile from "./src/Screens/Customer/Profile";
import Category from "./src/Screens/Customer/Category";
import Fruits from "./src/Components/Fruits";
import Vegetables from "./src/Components/Vegetables";
import Meat from "./src/Components/Meat";
import Dairy from "./src/Components/Dairy";
import CategoryFlatlist from "./src/Components/CategoryFlatlist";
import Products from "./src/Screens/Customer/Products";


import { useContext,useEffect,useState } from 'react';
import Forgotpass from "./src/Screens/Customer/Forgotpass";
import ConfirmEmail from "./src/Screens/Customer/ConfirmEmail";
import Ott from "./src/Screens/Customer/Ott";
import Reset from "./src/Screens/Customer/Reset";
import Editscreen from "./src/Screens/Customer/Editscreen";
import Dashboard from "./src/Screens/Admin/Dashboard";
import Crudpro from "./src/Screens/Admin/Crudpro";
import ChangePass from "./src/Screens/Customer/ChangePass";
import RecipeDetail from "./src/Screens/Customer/RecipeDetail";
import Addpro from "./src/Screens/Admin/Addpro";
import Delpro from "./src/Screens/Admin/Delpro";
import Editpro from "./src/Screens/Admin/Editpro";
import EditProperties from "./src/Screens/Admin/EditProperties";
import Viewpro from "./src/Screens/Admin/Viewpro";
import Crudcat from "./src/Screens/Admin/Crudcat";
import Addcat from "./src/Screens/Admin/Addcat";
import Updatecat from "./src/Screens/Admin/Updatecat";
import Delcat from "./src/Screens/Admin/Delcat";
import Editcat from "./src/Screens/Admin/Editcat";
import ProDetail from "./src/Screens/Admin/ProDetail";
import Viewcat from "./src/Screens/Admin/Viewcat";
import Tabb from "./src/Screens/Admin/Tabb";
import Prodd from "./src/Screens/Admin/Prodd";
import Chatbot from "./src/Screens/Customer/Chatbot";
import SearchResult from "./src/Screens/Customer/SearchResult";
import Information from "./src/Screens/Customer/Information";
import Payment from "./src/Screens/Customer/Payment";
import ReConfirm from "./src/Screens/Customer/ReConfirm";
import Final from "./src/Screens/Customer/Final";
import OrderList from "./src/Screens/Admin/OrderList";
import OrderDeatail from "./src/Screens/Admin/OrderDeatail";
import AdminLogin from "./src/Screens/Admin/AdminLogin";
import UserContext from './src/Contexts/UserContext';




const Stack = createNativeStackNavigator();






const AppNavigator = () => {



  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={Splash}  />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Forgotpass" component={Forgotpass} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Complete" component={Complete} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Fruits" component={Fruits} />
          <Stack.Screen name="Vegetables" component={Vegetables} />
          <Stack.Screen name="Meat" component={Meat} />
          <Stack.Screen name="Dairy" component={Dairy} />
          <Stack.Screen name="CategoryFlatlist" component={CategoryFlatlist} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Ott" component={Ott}/>
          <Stack.Screen name="Reset" component={Reset}/>
          <Stack.Screen name="Editscreen" component={Editscreen}/>
          <Stack.Screen name="Dashboard" component={Dashboard}/>
          <Stack.Screen name="Crudpro" component={Crudpro} />
          <Stack.Screen name="ChangePass" component={ChangePass} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetail}/>
          <Stack.Screen name="Addpro" component={Addpro} />
          <Stack.Screen name="Delpro" component={Delpro} />
          <Stack.Screen name="Editpro" component={Editpro} />
          <Stack.Screen name="EditProperties" component={EditProperties} />
          <Stack.Screen name="Viewpro" component={Viewpro} />
          <Stack.Screen name="Crudcat" component={Crudcat} />
          <Stack.Screen name="Addcat" component={Addcat} />
          <Stack.Screen name="Updatecat" component={Updatecat} />
          <Stack.Screen name="Delcat" component={Delcat} />
          <Stack.Screen name="Editcat" component={Editcat} />
          <Stack.Screen name="ProDetail" component={ProDetail} />
          <Stack.Screen name="Viewcat" component={Viewcat} />
          <Stack.Screen name="Tabb" component={Tabb} />
          <Stack.Screen name="Prodd" component={Prodd} />  
          <Stack.Screen name="Chatbot" component={Chatbot} />
          <Stack.Screen name="SearchResult" component={SearchResult} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="ReConfirm" component={ReConfirm} />
          <Stack.Screen name="Final" component={Final} />
          <Stack.Screen name="OrderList" component={OrderList} />
          <Stack.Screen name="OrderDeatail" component={OrderDeatail} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


const App = () => {
    return (
      <UserContextProvider>
        <AppNavigator/>
      </UserContextProvider>
    )
}



export default App;
