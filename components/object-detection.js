"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-predictions";
import { motion } from "framer-motion";
import { Camera, Loader, RotateCcw } from "lucide-react";
import PropTypes from "prop-types";

let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  async function runCoco() {
    try {
      setIsLoading(true);
      const net = await cocoSSDLoad();
      setIsLoading(false);
      setIsDetecting(true);

      detectInterval = setInterval(() => {
        runObjectDetection(net);
      }, 10);
    } catch (error) {
      console.error("Error loading COCO-SSD model:", error);
      setIsLoading(false);
    }
  }

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webcamRef.current?.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      try {
        const detectedObjects = await net.detect(video, undefined, 0.6);

        const context = canvasRef.current.getContext("2d");
        if (context) {
          renderPredictions(detectedObjects, context);
        }
      } catch (error) {
        console.error("Error during object detection:", error);
      }
    }
  }

  const showMyVideo = () => {
    if (webcamRef.current?.video && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      video.width = video.videoWidth;
      video.height = video.videoHeight;
    }
  };

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    runCoco();
    showMyVideo();

    return () => {
      if (detectInterval) {
        clearInterval(detectInterval);
      }
    };
  }, []);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-lg">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-xl font-semibold text-gray-800">
            Loading AI Model...
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-75 rounded-full p-2">
            <Camera
              className={`w-6 h-6 ${
                isDetecting ? "text-green-600" : "text-red-600"
              }`}
            />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleCamera}
              className="bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all duration-300"
              aria-label={`Switch to ${
                facingMode === "user" ? "back" : "front"
              } camera`}
            >
              <RotateCcw className="w-6 h-6 text-blue-600" />
            </button>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Webcam
              ref={webcamRef}
              className="w-full h-auto"
              videoConstraints={{
                facingMode: facingMode,
                width: 1280,
                height: 720,
              }}
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <p className="mt-4 text-center text-gray-600">
            {isDetecting
              ? "Object detection is active"
              : "Initializing detection..."}
          </p>
        </div>
      )}
    </motion.div>
  );
};

ObjectDetection.propTypes = {
  // Add any props and their types here if needed
};

export default ObjectDetection;
