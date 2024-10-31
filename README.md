# Thief Detection Alarm System

A real-time object detection system built with Next.js 14, TensorFlow.js, and the COCO-SSD model. This application uses your device's webcam to detect objects and potential security threats in real-time.

![Thief Detection Alarm Demo](demo-screenshot.png)

## 🚀 Features

- **Real-time Object Detection**: Utilizes TensorFlow.js and COCO-SSD model for accurate object detection
- **Live Webcam Processing**: Processes webcam feed in real-time with minimal latency
- **Visual Feedback**: Draws bounding boxes and labels around detected objects
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS

## 🛠️ Technologies

- Next.js 14
- TensorFlow.js
- COCO-SSD Model
- Tailwind CSS
- Framer Motion
- React Webcam

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17 or later
- A modern web browser with webcam support
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LiveWithCodeAnkit
   ```

2. Navigate to the project directory:
   ```bash
   cd thief-detection-alarm
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💻 Usage

1. Allow webcam access when prompted by your browser
2. The system will automatically begin detecting objects once the AI model is loaded
3. Detected objects will be highlighted with bounding boxes and labeled
4. The detection status is indicated by the camera icon in the top-left corner

## ⚙️ Configuration

The detection sensitivity can be adjusted in the `ObjectDetection` component:

```javascript
const detectedObjects = await net.detect(
  webcamRef.current.video,
  undefined,
  0.6  // Confidence threshold (0.0 to 1.0)
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- TensorFlow.js team for the amazing machine learning library
- COCO-SSD model creators
- Next.js team for the fantastic framework
- All contributors who help improve this project

## 📧 Contact



Project Link: [https://github.com/LiveWithCodeAnkit/thief-detection-alarm](https://github.com/LiveWithCodeAnkit/thief-detection-alarm)

---

Made with ❤️ by LiveWithCodeAnkit