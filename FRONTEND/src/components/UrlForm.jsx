import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'

const UrlForm = () => {
  
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const {isAuthenticated} = useSelector((state) => state.auth)

  const showToast = (type, message) => {
    window.dispatchEvent(new CustomEvent('toast', { detail: { type, message } }))
  }

  const handleSubmit = async () => {
    try{
      // Basic URL validation
      if (!url || !url.trim()) {
        setError("URL cannot be empty");
        showToast('error', 'URL cannot be empty')
        return;
      }
      
      // Check if URL has proper format
      try {
        new URL(url);
      } catch (e) {
        setError("Please enter a valid URL (e.g., https://www.example.com)");
        showToast('error', 'Enter a valid URL (e.g., https://example.com)')
        return;
      }
      
      setLoading(true)
      setError(null)
      const shortUrl = await createShortUrl(url,customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError(null)
      showToast('success', 'Short URL created successfully')
    }catch(err){
      console.error("Error creating short URL:", err);
      setError(err.message || "Failed to create short URL. Please try again.");
      showToast('error', err.message || 'Failed to create short URL')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    showToast('success', 'Copied to clipboard')
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event)=>setUrl(event.target.value)}
          onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); handleSubmit(); } }}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <p className="mt-1 text-xs text-gray-500">We support https/http links. Make sure your URL is reachable.</p>
      </div>

      {isAuthenticated && (
        <div>
          <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <p className="mt-1 text-xs text-gray-500">Example: my-link → {`http://localhost:3000/my-link`}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        type="submit"
        disabled={loading}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2.5 px-4 font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed ${loading ? 'animate-pulse' : ''}`}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        {loading ? 'Shortening…' : 'Shorten URL'}
      </button>

      {error && (
        <div className="mt-2 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-4">
          <h2 className="text-base font-semibold mb-2 text-gray-800">Your shortened URL</h2>
          <div className="flex items-stretch rounded-xl overflow-hidden border border-gray-200 bg-white">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2.5 bg-gray-50 text-gray-800"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                copied ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlForm