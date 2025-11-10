import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import googleIcon from '../assets/google.png'
import facebookIcon from '../assets/facebook.png'
import appleIcon from '../assets/apple.png'

// registration page with form and social login options
export default function Register() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [err, setErr] = useState(null)
  const [busy, setBusy] = useState(false)

  const fieldStyle = {
    display: 'block',
    width: '100%',
    marginBottom: 10,
    padding: '0.6em 1.2em',
    boxSizing: 'border-box',
  }

  // handles registration when form is submitted
  async function onRegister(e) {
    e.preventDefault()
    setBusy(true); setErr(null)

    if (pw !== confirmPw) {
      setErr('Passwords do not match')
      setBusy(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pw,
        options: {
          data: { full_name: name }, // user metadata (like Firebase displayName)
          emailRedirectTo: window.location.origin + '/login', // adjust if you want
        },
      })
      if (error) throw error

      // always go to dashboard after successful registration
      nav('/dashboard', { replace: true })
    } catch (e) {
      setErr(e.message || 'Registration failed')
    } finally {
      setBusy(false)
    }
  }

  // social login with google, apple, facebook
  async function oauth(provider) {
    setErr(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + '/dashboard' },
    })
    if (error) setErr(error.message)
  }

  return (
    <div className="login-container" style={{ maxWidth: 360, margin: '40px auto' }}>
      <h1>Create account</h1>
      <form onSubmit={onRegister}>
        <input
          placeholder="Username"
          value={name}
          onChange={e => setName(e.target.value)}
          style={fieldStyle}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={fieldStyle}
        />
        <input
          placeholder="Password (min 6)"
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          required
          style={fieldStyle}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPw}
          onChange={e => setConfirmPw(e.target.value)}
          required
          style={fieldStyle}
        />
        {err && <p style={{ color: 'crimson' }}>{err}</p>}
        <button
          disabled={busy}
          type="submit"
          style={{ display: 'block', width: '100%', padding: '0.6em 1.2em', marginTop: 36 }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>

      <div className="social-login">
        <p className="terms-of-use">
          By registering, you agree to our <b>Terms of Use</b> and <b>Privacy Policy</b>.
        </p>
        <p className="social-login-label">sign in with</p>
        <div className="social-buttons">
          <img
            src={googleIcon}
            alt="Google"
            onClick={() => oauth('google')}
            style={{ cursor: 'pointer' }}
          />
          <img
            src={appleIcon}
            alt="Apple"
            onClick={() => oauth('apple')}
            style={{ cursor: 'pointer' }}
          />
          <img
            src={facebookIcon}
            alt="Facebook"
            onClick={() => oauth('facebook')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  )
}
