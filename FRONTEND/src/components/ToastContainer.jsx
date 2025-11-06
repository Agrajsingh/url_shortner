import React, { useEffect, useState } from 'react'

const Toast = ({ id, type = 'info', message, onClose }) => {
  const base = 'pointer-events-auto flex items-center gap-2 rounded-lg px-4 py-3 shadow-md border text-sm'
  const styles = {
    success: 'bg-green-600 text-white border-green-700',
    error: 'bg-red-600 text-white border-red-700',
    info: 'bg-gray-900 text-white border-gray-800',
  }
  return (
    <div className={`${base} ${styles[type]}`} role="status">
      <span className="inline-block w-2 h-2 rounded-full bg-white/80" />
      <span>{message}</span>
      <button onClick={() => onClose(id)} className="ml-2/ -mr-1 p-1 text-white/80 hover:text-white">×</button>
    </div>
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
      }, 2500)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])

  const close = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 p-4 sm:p-6">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={close} />
      ))}
    </div>
  )
}

export default ToastContainer
