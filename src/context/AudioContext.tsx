'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Track } from '@/lib/data';

interface AudioContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    pause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
    }, []);

    const playTrack = (track: Track) => {
        if (!audioRef.current) return;

        if (currentTrack?.id === track.id) {
            togglePlay();
            return;
        }

        audioRef.current.src = track.src;
        audioRef.current.play().then(() => {
            setIsPlaying(true);
            setCurrentTrack(track);
        }).catch(err => console.error("Playback failed", err));
    };

    const togglePlay = () => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(err => console.error("Playback failed", err));
            setIsPlaying(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    // Handle track ending
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, []);

    return (
        <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, togglePlay, pause }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}
