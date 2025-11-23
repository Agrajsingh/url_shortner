import React from 'react'
import UrlForm from '../components/UrlForm'
import { useSelector } from 'react-redux'
import { Link } from '@tanstack/react-router'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import TypewriterText from '../components/TypewriterText'
import { Link2, Globe, Zap, Cloud } from 'lucide-react'

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Floating Icons Configuration
  const floatingIcons = [
    { Icon: Link2, delay: 0, x: -40, y: -20, size: 24, color: "text-blue-400" },
    { Icon: Globe, delay: 2, x: 40, y: 30, size: 32, color: "text-indigo-400" },
    { Icon: Zap, delay: 4, x: -30, y: 40, size: 20, color: "text-yellow-400" },
    { Icon: Cloud, delay: 1, x: 30, y: -40, size: 28, color: "text-sky-400" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6 overflow-hidden relative transition-colors duration-300 perspective-1000">
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

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y, size, color }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
            className={`absolute ${color} opacity-30 dark:opacity-20`}
            style={{
              left: `${50 + x}%`,
              top: `${50 + y}%`,
            }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl relative z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-8 sm:p-10 ring-1 ring-gray-900/5 dark:ring-white/5 transition-colors duration-300"
        >
          <div className="text-center mb-8 transform translate-z-10">
            <div className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 min-h-[3rem]">
              <TypewriterText text="URL Shortener" delay={0.5} />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-gray-500 dark:text-gray-400 text-lg"
            >
              Paste a long link and get a short one you can share.
            </motion.p>
          </div>

          {isAuthenticated ? (
            <div className="transform translate-z-20">
              <UrlForm />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-center py-6 transform translate-z-20"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">Please login to shorten URLs.</p>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Login / Register
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomePage