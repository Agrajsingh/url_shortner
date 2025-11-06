import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import ToastContainer from './components/ToastContainer'

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <ToastContainer/>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout