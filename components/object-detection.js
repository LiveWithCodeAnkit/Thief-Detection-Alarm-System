'use client'

import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd"
import * as tf from "@tensorflow/tfjs"
import { renderPredictions } from "@/utils/render-predictions"
import { motion } from "framer-motion"
import { Camera, Loader } from "lucide-react"

let detectInterval

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDetecting, setIsDetecting] = useState(false)

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  async function runCoco() {
    setIsLoading(true)
    const net = await cocoSSDLoad()
    setIsLoading(false)

    setIsDetecting(true)
    detectInterval = setInterval(() => {
      runObjectDetection(net)
    }, 10)
  }

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth
      canvasRef.current.height = webcamRef.current.video.videoHeight

      const detectedObjects = await net.detect(
        webcamRef.current.video,
        undefined,
        0.6
      )

      const context = canvasRef.current.getContext("2d")
      renderPredictions(detectedObjects, context)
    }
  }

  const showmyVideo = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webcamRef.current.video.videoWidth
      const myVideoHeight = webcamRef.current.video.videoHeight

      webcamRef.current.video.width = myVideoWidth
      webcamRef.current.video.height = myVideoHeight
    }
  }

  useEffect(() => {
    runCoco()
    showmyVideo()

    return () => {
      clearInterval(detectInterval)
    }
  }, [])

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-lg">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-xl font-semibold text-gray-800">Loading AI Model...</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-75 rounded-full p-2">
            <Camera className={`w-6 h-6 ${isDetecting ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Webcam
              ref={webcamRef}
              className="w-full h-auto"
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <p className="mt-4 text-center text-gray-600">
            {isDetecting ? "Object detection is active" : "Initializing detection..."}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default ObjectDetection