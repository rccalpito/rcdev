import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoComponent: React.FC = () => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const extractFrameData = () => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      const canvas = canvasRef.current;

      if (canvas) {
        const context = canvas.getContext('2d');

        if (player instanceof HTMLVideoElement) {
          const video = player;

          if (context && video.videoWidth > 0 && video.videoHeight > 0) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            try {
              const frameData = context.getImageData(0, 0, canvas.width, canvas.height);
              // console.log('Frame data extracted successfully', frameData);
              console.log('framedata', frameData);
            } catch (error) {
              console.error('Error extracting frame data:', error);
            }
          } else {
            console.error('Video dimensions are not set correctly or context is not available.');
          }
        } else {
          console.error('Cannot extract frame data from this type of video source.');
        }
      }
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();

      if (player instanceof HTMLVideoElement) {
        player.addEventListener('loadedmetadata', () => {
          extractFrameData();
        });
      } else {
        console.error('Cannot attach event listeners to this type of player.');
      }
    }
  }, []);

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="/assets/testtest.mp4"
        controls
        progressInterval={50}
        onProgress={extractFrameData}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default VideoComponent;