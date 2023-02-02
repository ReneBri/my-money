// styles 
import styles from './Signup.module.css'

// hooks
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'


export default function Signup() {

  //set initial states for user input form
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // useSignup hook
  const { error, isPending, signup } = useSignup()

  // handle submit event which signs up a new user
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
    console.log(displayName, email, password)
  }

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>

      <label>
        <span>display name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      </label>

      <label>
        <span>email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>

      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      </label>

      {!isPending && <button className='btn'>submit</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <p>{error}</p>}
      
    </form>
  )
}
