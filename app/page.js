	
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
  
import { Github, Cpu, Shield } from 'lucide-react'
import ObjectDetection from "@/components/object-detection";

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
   
    <main className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="gradient-title font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tighter text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Thief Detection Alarm
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-center mb-12 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Advanced AI-powered object detection for enhanced security
        </motion.p>

        <div className="mb-16">
          {mounted && <ObjectDetection />}
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-center text-center">
            <Cpu className="w-16 h-16 mb-4 text-blue-600" />
            <h2 className="text-xl font-bold mb-2">Powered by TensorFlow</h2>
            <p className="text-gray-600">Utilizing cutting-edge machine learning models for accurate detection</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="w-16 h-16 mb-4 text-green-600" />
            <h2 className="text-xl font-bold mb-2">Real-time Protection</h2>
            <p className="text-gray-600">Instant alerts and notifications for immediate response</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Github className="w-16 h-16 mb-4 text-purple-600" />
            <h2 className="text-xl font-bold mb-2">Open Source</h2>
            <p className="text-gray-600">Contribute to the project and help improve security for everyone</p>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="https://github.com/yourusername/thief-detection-alarm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
          >
            View on GitHub
          </a>
        </motion.div>
      </div>
    </main>
    </>
  );
}
