import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ProfileUpdatePage from './pages/profile/ProfileUpdatePage';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<LandingPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />} >
          <Route path="/profile-update" element={<ProfileUpdatePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
