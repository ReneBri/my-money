// hooks
import { useReducer, useEffect, useState } from 'react'

// config firestore
import { projectFirestore, timestamp } from "../config/config"

// creating an initial object in our desired structure
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

// reducer function to set states for our CRUD functions
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: null, error: null}
        case 'ADDED_DOCUMENT':
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'DELETE_DOCUMENT':
            return {isPending: false, document: null, success: true, error: false}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    
    // useReducer hook
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    // set state for manual dismounting
    const [isCancelled, setIsCancelled] = useState(false)

    // collection string ref
    const ref = projectFirestore.collection(collection)

    // function to only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled){
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING', isPending: true })

        try{
            // setting a createdAt var to both order and read times in our list
            const createdAt = timestamp.fromDate(new Date())
            const readableCreatedAt = new Date().toLocaleDateString()
            const addedDocument = await ref.add({...doc, createdAt, readableCreatedAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
            
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }

    }

    // delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try{
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' })
            
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // cleanup function sets isCancelled to true
    useEffect(() => {
        return () => {setIsCancelled(true)}
    }, [])

    return { addDocument, deleteDocument, response }
}

