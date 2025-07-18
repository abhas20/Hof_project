import { createContext, useEffect, useState } from "react";


const AuthContext =createContext({});

export const AuthProvider = ({ children }) => {

    const [auth,setAuth]=useState({
        user:null,
    })

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if (user) {
            setAuth({ user: JSON.parse(user) });
        }
    },[]);

    return (
        <AuthContext.Provider value={ {auth, setAuth} }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;