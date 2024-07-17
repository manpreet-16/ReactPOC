import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

// export const AuthProvider = AuthContext.Provider

export const AuthProvider = ({children}) =>{
    const [ userState,setUserState] = useState('')

    // useEffect(()=>{
    //     let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
    //     setUserState(user)
    //     console.log("state is set in AUTH PROVIDER !!")
    // },[])

    return (
        <AuthContext.Provider value={{userState,setUserState}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}