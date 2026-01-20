'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, SkipForward, SkipBack, ChevronDown, X, Volume2, Music, ListMusic } from 'lucide-react';

const GlobalPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, progress, isVisible, duration, seek } = useAudio();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const progressBarRef = React.useRef<HTMLDivElement>(null);
    const fullScreenProgressBarRef = React.useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);

    // Format time helper (mm:ss)
    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (percentage: number) => {
        const newTime = percentage * duration;
        seek(newTime);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent drag of parent
        setIsDragging(true);
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const clientX = e.clientX;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / width));
        handleSeek(percentage);

        // Add global listeners for drag
        const handlePointerMove = (moveEvent: PointerEvent) => {
            const newPercentage = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / width));
            handleSeek(newPercentage);
        };

        const handlePointerUp = () => {
            setIsDragging(false);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    // Auto-expand if needed, but let's keep it manual
    // Close on drag down (disable if scrubbing)
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (!isDragging && info.offset.y > 150) {
            setIsFullScreen(false);
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            {isFullScreen ? (
                /* ================= FULL SCREEN PLAYER ================= */
                <motion.div
                    key="fullscreen-player"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.2 }}
                    onDragEnd={handleDragEnd}
                    className="fixed inset-0 z-[60] flex flex-col bg-[#050505] text-white overflow-hidden"
                >
                    {/* Dynamic Ambient Background */}
                    <div className="absolute inset-0 z-0">
                        <div
                            className="absolute inset-0 opacity-40 blur-[100px] scale-150 transition-colors duration-1000 ease-in-out"
                            style={{ background: `radial-gradient(circle at center, ${currentTrack.color}, transparent 70%)` }}
                        />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-center pt-12 pb-6 px-6">
                        <div className="w-10 h-1 bg-white/20 rounded-full absolute top-4 left-1/2 -translate-x-1/2" /> {/* Grab Handle */}
                        <button
                            onClick={() => setIsFullScreen(false)}
                            className="absolute left-6 text-white/50 hover:text-white transition-colors"
                        >
                            <ChevronDown size={32} />
                        </button>
                        <span className="text-xs font-semibold tracking-widest uppercase text-white/50">In Riproduzione</span>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-12 w-full max-w-md mx-auto">

                        {/* Artwork */}
                        <motion.div
                            className="w-full aspect-square mb-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <img
                                src={currentTrack.cover}
                                alt={currentTrack.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Track Info */}
                        <div className="w-full flex items-end justify-between mb-8">
                            <div className="flex-1 min-w-0 mr-4">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 truncate leading-tight">
                                    {currentTrack.title}
                                </h2>
                                <p className="text-lg text-white/60 truncate font-medium">
                                    {currentTrack.artist}
                                </p>
                            </div>
                            {/* <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80">
                                <ListMusic size={20} />
                            </button> */}
                        </div>

                        {/* Scrubber */}
                        <div className="w-full mb-10 group">
                            <div
                                className="relative h-2 w-full bg-white/10 rounded-full cursor-pointer touch-none"
                                ref={fullScreenProgressBarRef}
                                onPointerDown={(e) => handlePointerDown(e, fullScreenProgressBarRef)}
                            >
                                <div
                                    className="absolute top-0 left-0 h-full bg-white rounded-full relative"
                                    style={{ width: `${progress}%`, backgroundColor: currentTrack.color }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow transition-transform group-hover:scale-150" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-medium text-white/40">
                                <span>{formatTime((progress / 100) * duration)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="w-full flex items-center justify-between px-4 sm:px-8">
                            <button
                                onClick={prevTrack}
                                className="text-white/70 hover:text-white transition-colors active:scale-95"
                            >
                                <SkipBack size={36} fill="currentColor" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                            >
                                {isPlaying ? (
                                    <Pause size={32} fill="currentColor" />
                                ) : (
                                    <Play size={32} fill="currentColor" className="ml-1" />
                                )}
                            </button>

                            <button
                                onClick={nextTrack}
                                className="text-white/70 hover:text-white transition-colors active:scale-95"
                            >
                                <SkipForward size={36} fill="currentColor" />
                            </button>
                        </div>

                        {/* Volume / Extra (Visual only for now) */}
                        <div className="w-full mt-10 flex items-center gap-4 px-4 opacity-50">
                            <Volume2 size={16} />
                            <div className="flex-1 h-1 bg-white/20 rounded-full">
                                <div className="w-3/4 h-full bg-white rounded-full" />
                            </div>
                        </div>

                    </div>
                </motion.div>
            ) : (
                /* ================= MINI PLAYER ================= */
                <motion.div
                    key="mini-player"
                    initial={{ y: 200, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: 200, x: "-50%", opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="fixed bottom-6 left-1/2 z-50 w-auto max-w-[95vw]"
                    onClick={() => setIsFullScreen(true)} // Open Fullscreen
                >
                    {/* Glow behind */}
                    <div
                        className="absolute inset-0 blur-3xl rounded-full -z-10 transition-colors duration-700"
                        style={{ backgroundColor: `${currentTrack.color}40` }}
                    />

                    {/* Capsule */}
                    <div className="relative flex items-center gap-4 px-4 py-3 rounded-2xl bg-[#111]/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden w-[340px] cursor-pointer hover:bg-[#111]/90 transition-colors">

                        {/* Progress Line Top */}
                        <div
                            ref={progressBarRef}
                            onPointerDown={(e) => handlePointerDown(e, progressBarRef)}
                            className="absolute bottom-0 left-0 right-0 h-[2px] w-full cursor-pointer z-20 group bg-transparent"
                        >
                            <div className="h-full bg-white/10 w-full" />
                            <div
                                className="absolute top-0 left-0 h-full shadow-[0_0_10px_currentColor]"
                                style={{
                                    width: `${progress}%`,
                                    backgroundColor: currentTrack.color,
                                }}
                            />
                        </div>

                        {/* Cover - Rotating */}
                        <div className="relative h-12 w-12 shrink-0">
                            <motion.img
                                src={currentTrack.cover}
                                alt="cover"
                                className="h-full w-full rounded-md object-cover shadow-lg"
                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear", repeatType: "loop" }}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="text-white text-sm font-semibold truncate leading-tight">
                                {currentTrack.title}
                            </h4>
                            <p className="text-white/50 text-xs truncate">
                                {currentTrack.artist}
                            </p>
                        </div>

                        {/* Controls (Mini) */}
                        <div className="flex items-center gap-3 text-white" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={togglePlay}
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-all"
                            >
                                {isPlaying ? (
                                    <Pause size={20} fill="currentColor" />
                                ) : (
                                    <Play size={20} fill="currentColor" className="ml-1" />
                                )}
                            </button>
                            <button
                                onClick={nextTrack}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <SkipForward size={24} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalPlayer;
