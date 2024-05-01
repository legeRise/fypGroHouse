import { View, Text ,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import { myColors } from '../../Utils/myColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Forgotpass = () => {
  const nav=useNavigation()
  return (
    <SafeAreaView
       style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20
      }}
    >
      <StatusBar style="dark" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            color: myColors.third,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          GRO
        </Text>
        <Text
          style={{
            color: myColors.forth,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          HOUSE
        </Text>
      </View>
      <View style={{marginTop:60}}>
        <Text style={{color: "black",fontSize:16,fontWeight: "bold"}}>Enter your Mobile Number for OTT :</Text>
      </View>
      <View>
      <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "grey",
              marginTop: 30,
            }}
          >
            Mobile Number :
          </Text>
          <TextInput
            keyboardType="phone-pad"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
          />
      </View>
      <TouchableOpacity
            onPress={() => {
              nav.navigate('Ott');
            }}
            style={{
              backgroundColor: "#2eb24b",
              height: 50,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 19, color: "white", fontWeight: "600" }}>
              Next
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
             marginTop: 60,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Ionicons
              onPress={() => {
                nav.goBack("Login");
              }}
              name="chevron-back"
              size={26}
              color="black"
              style={{fontWeight:"bold"}}
            />
            <Text style={{color:"black",fontSize: 16, fontWeight:"bold"}}>Go Back</Text>
          </View>
    </SafeAreaView>
  )
}

export default Forgotpass;