import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'

export default function Protected() {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading…</div>
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
