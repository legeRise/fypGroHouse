import React from "react";
import UserContext from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UserContextProvider = ({children}) => {
    const [baseUrl, setBaseUrl] = React.useState("http://192.168.43.249:9200")
    const [ customerId, setCustomerId] = React.useState("")
    const [ isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [ authToken,setAuthToken ] =   React.useState( AsyncStorage.getItem('AuthToken') )
    const [ adminToken,setAdminToken ] =   React.useState( AsyncStorage.getItem('AdminToken') )
    const [active, setActive] = React.useState(false);
    const [customerInfo, setCustomerInfo] = React.useState(false);

    return(
        <UserContext.Provider value={{adminToken,setAdminToken, authToken,setAuthToken, baseUrl, setBaseUrl,customerId,setCustomerId,active, setActive,isLoggedIn,setIsLoggedIn,customerInfo, setCustomerInfo}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider