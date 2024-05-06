import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [baseUrl, setBaseUrl] = React.useState("http://192.168.134.135:9200")
    const [ customerId, setCustomerId] = React.useState("")
    const [active, setActive] = React.useState(false);

    return(
        <UserContext.Provider value={{baseUrl, setBaseUrl,customerId,setCustomerId,active, setActive}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider