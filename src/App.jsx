import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider.jsx'
import Protected from './auth/Protected.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import OnBoarding from './pages/OnBoarding.jsx'
import CreateGeneral from './pages/Create-General.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/404Page.jsx'
import EventPreview from './pages/EventPreview.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/WebAppRunder">
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-general" element={<CreateGeneral />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/:eventId" element={<EventPreview />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
