import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import calculateKmeans from '../../services/Math/CalculateKmeans';

interface VideoComponentProps {
  onUpdate: (data: any) => void;
  playerRef: React.RefObject<ReactPlayer>;
}


const VideoComponent: React.FC<VideoComponentProps> = ({ onUpdate, playerRef }) => {
  const handleProgress = (state) => {
    const currentTime = state.playedSeconds

    onUpdate({ currentTime })
  }

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="/assets/testtest.mp4"
        controls
        progressInterval={25}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default VideoComponent;