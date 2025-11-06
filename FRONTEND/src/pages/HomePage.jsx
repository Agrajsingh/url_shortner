import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">URL Shortener</h1>
            <p className="mt-2 text-sm text-gray-500">Paste a long link and get a short one you can share.</p>
          </div>
          <UrlForm/>
        </div>
      </div>
    </div>
  )
}

export default HomePage