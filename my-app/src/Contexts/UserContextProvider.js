import React, {useEffect} from "react";
import UserContext from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";




const UserContextProvider = ({ children }) => {

    const [baseUrl, setBaseUrl] = React.useState("");
    // const [customerId, setCustomerId] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [authToken, setAuthToken] = React.useState(null); // Set initial state to null
    const [adminToken, setAdminToken] = React.useState(null); // Set initial state to null
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
            refreshToken('admin');
        },1 * 24 * 60 * 60 * 1000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <UserContext.Provider value={{ adminToken, setAdminToken, authToken, setAuthToken, baseUrl, setBaseUrl, isLoggedIn, setIsLoggedIn, customerInfo, setCustomerInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
