// import ImageComponent from './components/image/ImageComponent'


import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import './App.css'
import VideoComponent from './components/video/VideoComponent'
import VideoCanvas from './components/video/VideoCanvas'
import ColorPalette from './components/ColorPalette/ColorPalette'

const App = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [videoData, setVideoData] = useState(null)
  const [colorData, setColorData] = useState<number[]>([])
  const handleVideoUpdate = (data) => {
    setVideoData(data)
  }

  const handleColorData = (data) => {
    setColorData(data)
  }

  return (
    <>
      <VideoComponent onUpdate={handleVideoUpdate} playerRef={playerRef}/>
      <VideoCanvas onProgress={videoData} playerRef={playerRef} handleColorData={handleColorData}/>
      <ColorPalette colorList={colorData}/>
    </>
  )
}

export default App
