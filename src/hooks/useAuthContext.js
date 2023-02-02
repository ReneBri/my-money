// hooks
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'


export const useAuthContext = () => {
    // gives us easy access to the useContext hook
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuthContext must be inside of an AuthContextProvider')
    }

    return context
}