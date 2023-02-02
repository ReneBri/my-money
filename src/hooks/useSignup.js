// hooks
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

//config from firebase
import { projectAuth } from '../config/config'


export const useSignup = () => {

    // set initial states
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // deconstruct the dispatch method 
    const { dispatch } = useAuthContext()

    // declares an async function which we can call from other pages
    const signup = async (email, password, displayName) => {

        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res) {
                throw new Error('could not complete signup')
            }

            // add display name to user
            await res.user.updateProfile({ displayName: displayName })

            // dispatch login function
            dispatch({type: "LOGIN", payload: res.user})

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }catch (err){
            console.log(err.message)
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    // cleanup functino
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}