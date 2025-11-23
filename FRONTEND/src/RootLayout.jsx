import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import ToastContainer from './components/ToastContainer'
import { ThemeProvider } from './context/ThemeContext'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ToastContainer />
        <Navbar />
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default RootLayout