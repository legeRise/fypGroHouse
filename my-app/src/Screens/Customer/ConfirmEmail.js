import { View, Text ,TextInput,TouchableOpacity,Alert} from 'react-native'
import React,{ useState,useContext} from 'react'
import { StatusBar } from "expo-status-bar";
import { myColors } from '../../Utils/myColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UserContext from '../../Contexts/UserContext';

const ConfirmEmail = ( {route} ) => {
  const { email }  = route.params
  const { baseUrl,authToken } = useContext(UserContext)
  const [code,setCode] = useState("")

  const data = {
    'email' : email,
    'code' : code
  }

  console.log(data)
    
  const handleCheckCode = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/match_otp/`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + authToken.access

          },
          body : JSON.stringify(data)
      });
        if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData)
        Alert.alert("Success",jsonData.message)
        nav.navigate("Login")
        }
        else{
          Alert.alert("Error",jsonData.message)
        }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  






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
        <Text style={{color: "black",fontSize:16,fontWeight: "bold"}}>Enter the code you recieved to Login :</Text>
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
            Confirmation Code
          </Text>
          <TextInput
            keyboardType="phone-pad"
            style={{
              borderColor: "#E3E3E3",
              borderBottomWidth: 2,
              fontSize: 16,
              marginTop: 15,
            }}
            value={code}
            onChangeText={setCode}
          />
      </View>
      <TouchableOpacity
            onPress={handleCheckCode}
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
              Confirm
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
                nav.goBack("Signup");
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

export default ConfirmEmail;