import './App.css'

import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import AddTransaction from './components/AddTransaction'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Logout from './components/Logout'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile'
import UpdateTransaction from './components/UpdateTransaction'



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/update-transaction/:id" element={<UpdateTransaction />} />
      </Routes>

          </>
  )
}

export default App
