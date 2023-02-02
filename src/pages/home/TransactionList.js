// styles
import styles from './Home.module.css'

// hooks
import { useFirestore } from '../../hooks/useFirestore'


export default function TransactionList({ transactions }) {

  // retreives the delete document function and a response from the useFirestore hook
  const { deleteDocument, response } = useFirestore('transactions')

console.log(response)
  return (
    <ul className={styles.transactions}>
        {transactions.map((transaction) => (
            <li key={ transaction.id }>
                <p className={ styles.name }>{transaction.name}</p>
                <div className={ styles['time-amount-wrapper']}>
                  <p className={ styles.amount }>${transaction.amount}</p>
                  <p className={ styles.readableCA }>{transaction.readableCreatedAt}</p>
                </div>
                <button onClick={() => deleteDocument(transaction.id)}>x</button>
            </li>
        ))}
    </ul>
  )
}
