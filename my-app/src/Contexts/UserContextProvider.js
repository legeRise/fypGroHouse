import React, {useEffect} from "react";
import UserContext from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const UserContextProvider = ({ children }) => {
//     const [baseUrl, setBaseUrl] = React.useState("http://192.168.59.249:9200")
//     const [customerId, setCustomerId] = React.useState("")
//     const [isLoggedIn, setIsLoggedIn] = React.useState(false)
//     const [authToken, setAuthToken] = React.useState(AsyncStorage.getItem('AuthToken'))
//     const [adminToken, setAdminToken] = React.useState(AsyncStorage.getItem('AdminToken'))
//     const [active, setActive] = React.useState(false);
//     const [customerInfo, setCustomerInfo] = React.useState(false);

   

//         const refreshToken = async (type) => {
//             console.log(type)
//           try {
//             const tokenType = type === 'auth' ? 'AuthToken' : 'AdminToken';
//             console.log(tokenType)
//             const token = JSON.parse(await AsyncStorage.getItem(tokenType)); //in async everything is string so parsing 
//             const refresh_token_data = {"refresh" : token.refresh}
//             const response = await fetch(`${baseUrl}/auth/token/refresh/`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body : JSON.stringify(refresh_token_data)
//             });
//             const data = await response.json();
//             const newAccessToken = data.access;
//             token.access = newAccessToken
//             await AsyncStorage.setItem(tokenType, JSON.stringify(token));  // and while storying to async we need string
//             console.log("token updated ---line 34:------")
//           } catch (error) {
//             // Handle error
//           }
//         };




//     useEffect(() => {
//         const interval = setInterval(() => {
//             console.log('Hello');
//             refreshToken('auth');
//             refreshToken('admin');
//         }, 1*60*1000); // Print "Hello" every 10 seconds

//         // Cleanup function to clear the interval when the component unmounts
//         return () => clearInterval(interval);
//     }, []);



//     return (
//         <UserContext.Provider value={{ adminToken, setAdminToken, authToken, setAuthToken, baseUrl, setBaseUrl, customerId, setCustomerId, active, setActive, isLoggedIn, setIsLoggedIn, customerInfo, setCustomerInfo }}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserContextProvider




const UserContextProvider = ({ children }) => {
    // const [baseUrl, setBaseUrl] = React.useState("http://192.168.59.249:9200");
    const [baseUrl, setBaseUrl] = React.useState("");
    const [customerId, setCustomerId] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [authToken, setAuthToken] = React.useState(null); // Set initial state to null
    const [adminToken, setAdminToken] = React.useState(null); // Set initial state to null
    const [active, setActive] = React.useState(false);
    const [customerInfo, setCustomerInfo] = React.useState(false);

    useEffect(() => {
        // Fetch tokens from AsyncStorage on component mount
        const fetchTokens = async () => {
            const auth = await AsyncStorage.getItem('AuthToken');
            const admin = await AsyncStorage.getItem('AdminToken');
            console.log('the auth token at lien 83 ----')
            console.log('the admin token at lien 84 ----')
            setAuthToken(auth);
            setAdminToken(admin);
        };

        fetchTokens(); // Call the function to fetch tokens
    }, []);

    const refreshToken = async (type) => {
        try {
            const tokenType = type === 'auth' ? 'AuthToken' : 'AdminToken';
            const tokenString = await AsyncStorage.getItem(tokenType);
            const token = JSON.parse(tokenString);
            const refresh_token_data = { "refresh": token.refresh };
            const response = await fetch(`${baseUrl}/auth/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(refresh_token_data)
            });
            const data = await response.json();
            const newAccessToken = data.access;
            console.log("token before",token)
            token.access = newAccessToken;
            await AsyncStorage.setItem(tokenType, JSON.stringify(token));
            if (tokenType === "auth") {
                setAuthToken(token)
            }
            else{
                setAdminToken(token)
            };
            
            console.log("Token updated for", type);
            console.log("Token after", token);
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Hello');
            refreshToken('auth');
            // refreshToken('admin');
        }, 1 * 24 * 60 * 60 * 1000); // Refresh tokens every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <UserContext.Provider value={{ adminToken, setAdminToken, authToken, setAuthToken, baseUrl, setBaseUrl, customerId, setCustomerId, active, setActive, isLoggedIn, setIsLoggedIn, customerInfo, setCustomerInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
