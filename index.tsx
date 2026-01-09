import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AudioProvider, useAudio } from './context/AudioContext';
import GlobalPlayer from './components/GlobalPlayer';

// Helper component to listen to Custom Events from HTML
const AudioBridge = () => {
  const { playTrack } = useAudio();

  useEffect(() => {
    const handlePlayRequest = (event: CustomEvent) => {
      const index = event.detail.index;
      playTrack(index);
    };

    window.addEventListener('play-track' as any, handlePlayRequest);
    return () => {
      window.removeEventListener('play-track' as any, handlePlayRequest);
    };
  }, [playTrack]);

  return null;
};

// Mount only the Player functionality
const rootElement = document.getElementById('react-player-root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AudioProvider>
        <GlobalPlayer />
        <AudioBridge />
      </AudioProvider>
    </React.StrictMode>
  );
}