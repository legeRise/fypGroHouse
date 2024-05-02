import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [baseUrl, setBaseUrl] = React.useState("http://192.168.221.249:9200")
    const [token, setToken] = React.useState("")
    const [userInfo, setUserInfo] = React.useState("")

    return(
        <UserContext.Provider value={{baseUrl, setBaseUrl,token,setToken, userInfo, setUserInfo}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider