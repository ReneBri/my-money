import styles from './Login.module.css'
//hooks
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {

  //set initial states for user input form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // useLogin hook
  const { error, isPending, login } = useLogin()

  // handle Login as guest
  const handleLoginAsGuest = (email, password) => {
    setEmail(email)
    setPassword(password)
    login(email, password)
  }
  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  
  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['header-container']}>
        <h2>Login</h2>
        <button 
          className={styles.guest + " btn"} 
          onClick={() => {handleLoginAsGuest('guest1@guest.com', 'Guest1')}}
          >Guest 1
        </button>
        <button 
          className={styles.guest + " btn"} 
          onClick={() => {handleLoginAsGuest('guest2@guest.com', 'guest2')}}
          >Guest 2
        </button>
      </div>
      <form className={styles['login-form']} onSubmit={handleSubmit}>

        
        <label>
          <span>email:</span>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <span>password:</span>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="btn" disabled>loading</button>}
        {error && <p>{error}</p>}

      </form>
    </div>
  )
}
