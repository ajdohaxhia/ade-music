'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { TRACKS, Track } from '@/lib/data';

interface AudioContextType {
    isPlaying: boolean;
    isVisible: boolean;
    currentTrackIndex: number;
    currentTrack: Track;
    progress: number;
    duration: number;
    togglePlay: () => void;
    playTrack: (index: number) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio Object & Listeners (Pure HTML5 Audio - no Web Audio API)
    useEffect(() => {
        const audio = new Audio();
        audioRef.current = audio;
        audio.src = TRACKS[0].src;

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
            setIsPlaying(true);
        };

        const handleError = (e: Event) => {
            console.error(`Audio Error for track: ${audio.src}`, e);
            setIsPlaying(false);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.addEventListener('error', handleError);

        return () => {
            audio.pause();
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', () => { });
            audio.removeEventListener('error', handleError);
        };
    }, []);

    // Effect: Handle Track Index Changes & Media Session API
    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;
        const track = TRACKS[currentTrackIndex];

        const safeSrc = encodeURI(track.src);

        if (!audio.src.includes(safeSrc)) {
            audio.src = safeSrc;
            audio.load();
            if (isPlaying) {
                audio.play().catch(e => console.error("Playback failed (Track Change):", e));
            }
        }

        // Update Media Session Metadata (OS / Lock Screen)
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: track.title,
                artist: track.artist,
                album: "Ade Music Portfolio",
                artwork: [
                    { src: track.cover, sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

            navigator.mediaSession.setActionHandler('play', () => {
                if (!hasPlayedOnce) setHasPlayedOnce(true);
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('seekto', (details) => {
                if (details.seekTime && audioRef.current) {
                    audioRef.current.currentTime = details.seekTime;
                    setProgress((details.seekTime / audioRef.current.duration) * 100);
                }
            });
        }
    }, [currentTrackIndex, isPlaying, hasPlayedOnce]);

    // Effect: Handle Play/Pause Toggle
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Play prevented / Audio not found:", e);
                    setIsPlaying(false);
                });
            }
            if ('mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'playing';
            }
        } else {
            audioRef.current.pause();
            if ('mediaSession' in navigator) {
                navigator.mediaSession.playbackState = 'paused';
            }
        }
    }, [isPlaying]);

    const togglePlay = () => {
        if (!hasPlayedOnce) setHasPlayedOnce(true);
        setIsPlaying(!isPlaying);
    };

    const playTrack = (index: number) => {
        if (!hasPlayedOnce) setHasPlayedOnce(true);
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setProgress((time / audioRef.current.duration) * 100);
        }
    };

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                isVisible: hasPlayedOnce,
                currentTrackIndex,
                currentTrack: TRACKS[currentTrackIndex],
                progress,
                duration,
                togglePlay,
                playTrack,
                nextTrack,
                prevTrack,
                seek,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
