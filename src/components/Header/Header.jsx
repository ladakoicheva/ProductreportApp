import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { logoutUser } from '../../firebase/auth/auth'

export default function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <Link to='/'>Home</Link>
          <Link to='/products'>Products</Link>
          {user && <Link to='/add'>Add Product</Link>}
        </div>
        <div className={styles.userSection}>
          {user ? (
            <>
              <span className={styles.email}>{user.email}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Log Out
              </button>
            </>
          ) : (
            <Link to='/auth' className={styles.loginBtn}>Log In</Link>
          )}
        </div>
      </nav>
    </header>
  )
}
