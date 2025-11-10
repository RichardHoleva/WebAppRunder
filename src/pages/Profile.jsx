import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx' // adjust path
import '../styles/profile.css'
import NavBar from '../components/NavBar.jsx'

export default function Profile() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [busy, setBusy] = useState(false)

  const handleSignOut = async () => {
    try {
      setBusy(true)
      await signOut()              // Supabase sign out from context
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-content">
          <button className="sign-out-button" onClick={handleSignOut} disabled={busy}>
            {busy ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </div>
    </>
  )
}
