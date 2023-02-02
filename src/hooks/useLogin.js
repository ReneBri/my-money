// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

//config from firebase
import { projectAuth } from '../config/config'


export const useLogin = () => {

    // set initial states
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // deconstruct the dispatch method 
    const { dispatch } = useAuthContext()

    // declares an async function which we can call from other pages
    const login = async (email, password) => {

        setError(null)
        setIsPending(true)

        //sign user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            dispatch({type: 'LOGIN', payload: res.user})
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

    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return { login, error, isPending }
}