import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [baseUrl, setBaseUrl] = React.useState("http://192.168.134.135:9200")
    const [ customerId, setCustomerId] = React.useState("")
    // const [token, setToken] = React.useState("")
    // const [userInfo, setUserInfo] = React.useState("")

    return(
        <UserContext.Provider value={{baseUrl, setBaseUrl,customerId,setCustomerId}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider