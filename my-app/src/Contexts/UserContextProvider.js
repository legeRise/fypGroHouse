import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [baseUrl, setBaseUrl] = React.useState("http://192.168.68.249:9200")
    const [ customerId, setCustomerId] = React.useState("")
    const [ isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [active, setActive] = React.useState(false);
    const [customerInfo, setCustomerInfo] = React.useState(false);

    return(
        <UserContext.Provider value={{baseUrl, setBaseUrl,customerId,setCustomerId,active, setActive,isLoggedIn,setIsLoggedIn,customerInfo, setCustomerInfo}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider