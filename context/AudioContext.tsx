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
    volume: number;
    togglePlay: () => void;
    playTrack: (index: number) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio Object & Listeners
    useEffect(() => {
        // Create new Audio instance
        const audio = new Audio();
        audioRef.current = audio;

        // Set initial source
        audio.src = TRACKS[0].src;

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            nextTrack();
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

            // Update Action Handlers
            navigator.mediaSession.setActionHandler('play', () => {
                if (!hasPlayedOnce) setHasPlayedOnce(true);
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
            navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
            navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
            navigator.mediaSession.setActionHandler('seekto', (details) => {
                if (details.seekTime && audioRef.current) {
                    audioRef.current.currentTime = details.seekTime;
                    setProgress((details.seekTime / audioRef.current.duration) * 100);
                }
            });
        }
    }, [currentTrackIndex]);

    // Effect: Handle Play/Pause Toggle
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error("Play prevented / Audio not found:", e);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
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
                volume,
                togglePlay,
                playTrack,
                nextTrack,
                prevTrack,
                seek,
                setVolume: (vol) => {
                    setVolume(vol);
                    if (audioRef.current) audioRef.current.volume = vol;
                },
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
