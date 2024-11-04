"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-predictions";
import { motion } from "framer-motion";
import { Camera, Loader, RotateCcw } from "lucide-react";

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

      // Adjusted interval for detection to reduce strain and stabilize video
      detectInterval = setInterval(() => {
        runObjectDetection(net);
      }, 100);
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
        // Lowered detection threshold for improved object detection
        const detectedObjects = await net.detect(video, undefined, 0.5);

        const context = canvasRef.current.getContext("2d");
        if (context) {
          renderPredictions(detectedObjects, context);
        }
      } catch (error) {
        console.error("Error during object detection:", error);
      }
    }
  }

  const toggleAndSetCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    setTimeout(() => {
      setFacingMode("environment"); // Helps refocus when switching to back camera
    }, 100);
  };

  useEffect(() => {
    runCoco();

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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Loader
            className="animate-spin"
            style={{ width: "3rem", height: "3rem", color: "#3b82f6", marginBottom: "1rem" }}
          />
          <p style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1f2937" }}>
            Loading AI Model...
          </p>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              zIndex: 10,
              backgroundColor: "#ffffffcc",
              borderRadius: "50%",
              padding: "0.5rem",
            }}
          >
            <Camera
              style={{
                width: "1.5rem",
                height: "1.5rem",
                color: isDetecting ? "#10b981" : "#ef4444",
              }}
            />
          </div>
          <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}>
            <button
              onClick={toggleAndSetCamera}
              style={{
                backgroundColor: "#ffffffcc",
                borderRadius: "50%",
                padding: "0.5rem",
                transition: "background-color 0.3s",
              }}
              aria-label={`Switch to ${facingMode === "user" ? "back" : "front"} camera`}
            >
              <RotateCcw style={{ width: "1.5rem", height: "1.5rem", color: "#3b82f6" }} />
            </button>
          </div>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Webcam
              ref={webcamRef}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              videoConstraints={{
                facingMode: facingMode,
              }}
              muted
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <p style={{ marginTop: "1rem", textAlign: "center", color: "#4b5563" }}>
            {isDetecting
              ? "Object detection is active"
              : "Initializing detection..."}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ObjectDetection;
