import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const Toast = ({ id, type = 'info', message, onClose }) => {
  const styles = {
    success: 'bg-white dark:bg-gray-800 border-green-100 dark:border-green-900/30 text-green-800 dark:text-green-400 shadow-green-100 dark:shadow-none',
    error: 'bg-white dark:bg-gray-800 border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-400 shadow-red-100 dark:shadow-none',
    info: 'bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900/30 text-blue-800 dark:text-blue-400 shadow-blue-100 dark:shadow-none',
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />,
    error: <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg border ${styles[type]} min-w-[300px] max-w-md backdrop-blur-sm`}
      role="status"
    >
      <div className="shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      const { type = 'info', message = '' } = e.detail || {}
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, type, message }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])

  const close = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex flex-col items-end gap-2 p-4 sm:p-6">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={close} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
