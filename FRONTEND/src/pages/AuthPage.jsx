import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

const AuthPage = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">
            {/* Alive Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 dark:bg-blue-500/20 blur-3xl mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 20, 0],
                        y: [0, 40, -30, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 dark:bg-indigo-500/20 blur-3xl mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        x: [0, 20, -40, 0],
                        y: [0, -20, 50, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 5
                    }}
                    className="absolute -bottom-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-200/30 dark:bg-purple-500/20 blur-3xl mix-blend-multiply dark:mix-blend-screen"
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                <Link to="/" className="absolute -top-12 left-0 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-8 ring-1 ring-gray-900/5 dark:ring-white/5 transition-colors duration-300"
                >
                    <div className="flex justify-center mb-8 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl">
                        <button
                            onClick={() => setLogin(true)}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${login
                                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setLogin(false)}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${!login
                                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
                </motion.div>
            </div>
        </div>
    )
}

export default AuthPage