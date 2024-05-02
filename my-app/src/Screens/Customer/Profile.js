import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableRipple,
} from "react-native";
import React,{useEffect,useContext} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import HomeIcon from "../../Components/HomeIcon";
import { FontAwesome5 } from '@expo/vector-icons';
import UserContext from "../../Contexts/UserContext";

import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  
  const nav = useNavigation()
  const { setToken,baseUrl } = useContext(UserContext)

  const handleLogout = () => {
    nav.navigate("Login"); // Navigate to the "Login" screen
  }
    
  



  return (
    <SafeAreaView style={styles.container}>
      <HomeIcon />
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "column",
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 999,
              borderColor: "black",
              borderWidth: 2,
              resizeMode: "cover",
            }}
            source={require("../../assets/sign.png")}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
              marginTop: 10,
            }}
          >
            <Text style={styles.title}>Jawad Ahmad</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
        <MaterialCommunityIcons name="map-marker-radius" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Attock, Pakistan
          </Text>
        </View>
        <View style={styles.row}>
        <MaterialCommunityIcons name="phone" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +92-3005398069
          </Text>
        </View>
        <View style={[styles.row, { paddingBottom: 30 }]}>
        <MaterialIcons name="email" size={20} color="#777777" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            jawadahmat351@gmail.com
          </Text>
        </View>
        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              { borderRightColor: "#dddddd", borderRightWidth: 1 },
            ]}
          >
            <Text>RS. 100</Text>
            <Text>Spend</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>12</Text>
            <Text>Orders</Text>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {}}
            style={{ justifyContent: "flex-star" }}
          >
            <View style={[styles.menuItem, { alignItems:"center" }]}>
            <MaterialCommunityIcons name="heart-outline" size={25} color="#FF6347"   style={{marginRight: 15}}/>
              <Text>Your Favourite</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            
          >
            <View style={styles.menuItem}>
            <MaterialCommunityIcons name="credit-card" size={25} color="#FF6347"   style={{marginRight: 15}}/>
              <Text>Payment</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            
          >
            <View style={styles.menuItem}>
            <MaterialCommunityIcons name="account-check-outline" size={25} color="#FF6347"   style={{marginRight: 15}}/>
              <Text>Support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}>
            <View onPress={() => {}} style={styles.menuItem}>
            <FontAwesome5 name="user-edit" size={20} color="#FF6347"  style={{marginRight: 15}} />
              <Text>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}>
            <View  style={styles.menuItem}>
            <FontAwesome5 name="sign-out-alt" size={20} color="#FF6347"  style={{marginRight: 15}} />
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
    
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
