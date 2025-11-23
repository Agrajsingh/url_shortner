import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'
import { motion, AnimatePresence } from 'framer-motion'
import { Link as LinkIcon, Copy, Check, ArrowRight, Loader2, Globe } from 'lucide-react'
import confetti from 'canvas-confetti'
import MagneticButton from './MagneticButton'

const UrlForm = () => {

  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const showToast = (type, message) => {
    window.dispatchEvent(new CustomEvent('toast', { detail: { type, message } }))
  }

  const handleSubmit = async () => {
    try {
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
      const shortUrl = await createShortUrl(url, customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
      showToast('success', 'Short URL created successfully')

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
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
    <div className="space-y-6">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
          Enter your long URL
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event) => setUrl(event.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); } }}
            placeholder="https://example.com/very/long/url..."
            required
            className="block w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 ml-1">We support https/http links. Make sure your URL is reachable.</p>
      </div>

      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
            Custom alias (optional)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="custom-name"
              className="block w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-200"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 ml-1">Example: {`http://localhost:3000/custom-name`}</p>
        </motion.div>
      )}

      <MagneticButton
        onClick={handleSubmit}
        type="submit"
        disabled={loading}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-4 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Shortening...</span>
          </>
        ) : (
          <>
            <span>Shorten URL</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </MagneticButton>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pt-2"
          >
            <div className="p-1 rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Your shortened URL is ready!
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-2.5">
                    <p className="text-gray-800 dark:text-gray-200 font-medium truncate pr-2">{shortUrl}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className={`shrink-0 p-2.5 rounded-lg border transition-all duration-200 ${copied
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UrlForm