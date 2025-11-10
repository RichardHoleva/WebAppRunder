import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx' 
import '../styles/login.css'

// login form with email and password fields
export default function LoginFields() {
  const nav = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [showPassword, setShowPassword] = useState(false) 
  const [err, setErr] = useState(null)
  const [busy, setBusy] = useState(false) 

  // handles login when form is submitted
  async function onLogin(e) {
    e.preventDefault()
    setBusy(true)
    setErr(null)
    try {
      await signIn(email, pw)             // Supabase: from AuthProvider
      nav('/dashboard', { replace: true }) // go to dashboard if login works
    } catch (e) {
      setErr(e.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onLogin}>
      <input
        placeholder="Username or Email"
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
      />
      <div className="password-container">
        <input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'} // changes input type based on toggle
          value={pw}
          onChange={(e)=>setPw(e.target.value)}
          required
        />
        {/* click to show/hide password */}
        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      {/* show error message if login fails */}
      {err && <p className="error-message">{err}</p>}
      <button disabled={busy} type="submit">Log in</button>
      <p className="signup-link">
        <Link to="/register">Forgot password</Link>
      </p>
    </form>
  )
}
