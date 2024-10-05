import React, {FunctionComponent, useCallback, useRef, useEffect, useState} from "react"
import ReactPlayer from "react-player"
import calculateKmeans from "../../services/Math/CalculateKmeans";

interface VideoCanvasProps {
  playerRef: React.RefObject<ReactPlayer>;
  onProgress: any;
  handleColorData: (data) => void;
}

const VideoCanvas: FunctionComponent<VideoCanvasProps> = ({
  playerRef,
  onProgress,
  handleColorData
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const drawCanvas = useCallback(() => {
    if (playerRef.current && canvasRef.current) {
      const player = playerRef.current.getInternalPlayer();
      const canvas = canvasRef.current;

      if (!contextRef.current) {
        contextRef.current = canvas.getContext('2d', {
          willReadFrequently: true,
        });
      }

      const context = contextRef.current;

      if (player instanceof HTMLVideoElement && context) {
        const video = player;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [playerRef]);


  const extractFrameData = useCallback(() => {
    if (playerRef.current && contextRef) {
      const canvas = canvasRef.current;

      try {
        const frameData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
        const pixels: Array<number[]> = [];
        const data = frameData.data;

        for (let i = 0; i < data.length; i += 4) {
          pixels.push([data[i], data[i + 1], data[i + 2]]); // Push [R, G, B]
        }

        handleColorData(calculateKmeans(pixels))
      } catch (error) {
        console.error('Error extracting frame data:', error);
      }
    } else {
      console.error('Video dimensions are not set correctly or context is not available.');
    }
  }, [playerRef])


  useEffect(() => {
    drawCanvas()
    extractFrameData()
  }, [onProgress, drawCanvas, extractFrameData])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default VideoCanvas