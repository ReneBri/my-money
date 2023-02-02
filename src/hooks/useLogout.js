// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

//config from firebase
import { projectAuth } from '../config/config'

export const useLogout = () => {

    // set initial states
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // deconstruct the dispatch method 
    const { dispatch } = useAuthContext()

    // declares an async function which we can call from other pages
    const logout = async () => {

        setError(null)
        setIsPending(true)

        //sign user out
        try {
            await projectAuth.signOut()
            dispatch({type: 'LOGOUT'})
            //update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }catch(err) {
            console.log(err.message)
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
        
        
    }

    // cleaup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return { logout, error, isPending }
}