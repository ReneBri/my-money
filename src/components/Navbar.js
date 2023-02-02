// components
import { Link } from 'react-router-dom'

// hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import styles from './Navbar.module.css'


export default function Navbar() {
  
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
        <ul>
          <div className={styles.title}>
            <li>My Money</li>
          </div>
          <div className={styles.links}>
            {!user &&
              <>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li> 
              </>}
            {user && 
              <>
                <li className={styles.lists}>Hi {user.displayName}</li>
                <li><button className="btn" onClick={logout}>Logout</button></li>
              </>}
          </div>
          
        </ul>
    </nav>
  )
}
