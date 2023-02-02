// hooks
import { useEffect, useRef, useState } from 'react'

// firestore config
import { projectFirestore } from '../config/config'

// this is to let query our firestore collection
export const useCollection = (collection, _query, _orderBy) => {

 // set initial error & document values
 const [documents, setDocuments] = useState(null)
 const [error, setError] = useState(null)

 // this avoids the infinite loops which occurs when using arrays as a reference in a useEffect
 // _query is an array and is "different" on every function call when its wrapped in a ref, it is not "different"
 const query = useRef(_query).current
 const orderBy = useRef(_orderBy).current
 
 // this here is envoked for us to collect the documents so that we write them on the home page
 useEffect(() => {
    let ref = projectFirestore.collection(collection)

    // this checks that a second argument has been passed into the hook and if so it adds the following
    // in order to query firestore more specifically
    if (query) {
        ref = ref.where(...query)
    }
    // this checks that a third argument has been passed into the hook and if so it adds the following
    // in order to sort the data
    if (orderBy) {
        ref = ref.orderBy(...orderBy)
    }

    // safety switch incase of unmounting
    const unsubscribe = ref.onSnapshot((snapshot) => {
        
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id })
        })

        setDocuments(results)
        setError(null)

    }, (error) => {
        console.log(error)
        setError('could not fetch data')
    })

    //unsub on unmount
    return () => unsubscribe()

 }, [collection, query, orderBy])

    return { documents, error }
}