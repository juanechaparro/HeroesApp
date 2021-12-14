import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/authContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'
const init =() =>{
    // con esto le ponemos el || para ver que no existe
    return JSON.parse(localStorage.getItem('user')) || {logged:false};
    
}
export const HeroesApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init)
    useEffect(() => {
        if( user){
         localStorage.setItem('user', JSON.stringify(user));   
        }
        
    }, [user])
    return (
        <div>
            <AuthContext.Provider value={
                {
                    user,
                    dispatch
                }
            } >
           <AppRouter/>
           </AuthContext.Provider>
        </div>
    )
}
