// hooks
import { useReducer, createContext, useEffect } from 'react'

// firebase auth config
import { projectAuth } from '../config/config'

export const AuthContext = createContext()

// reducer for AuthContextProvider
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload}
        case 'LOGOUT':
            return { ...state, user: null}
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

// using this to wrap the rest of the app in to provide global props
export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {user: null, authIsReady: false})

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            unsub()
        })
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
