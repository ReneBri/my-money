// styles
import styles from './Home.module.css'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Home() {

  // gets user prop auth token
  const { user } = useAuthContext()

  // retreives documents where the user id matches the document id
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
    )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{ error }</p>}
        {documents && <TransactionList transactions={ documents }/>}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}
