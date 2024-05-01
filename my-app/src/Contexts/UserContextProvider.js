import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [baseUrl, setBaseUrl] = React.useState("http://192.168.155.249:9200")
    return(
        <UserContext.Provider value={{baseUrl, setBaseUrl}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider