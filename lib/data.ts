export interface Track {
    id: string;
    title: string;
    artist: string;
    src: string;
    cover: string;
    duration: string; // Display string e.g. "3:45"
    genre: string;
    color: string; // Hex code for mood/vibe
}

export const TRACKS: Track[] = [
    {
        id: '1',
        title: 'code switch',
        artist: 'Ade Music',
        src: '/music/track1.mp3',
        cover: '/covers/cover1.jpg',
        duration: '2:45',
        genre: 'Electronic',
        color: '#4a4a4a', // Dark Grey
    },
    {
        id: '2',
        title: 'no time to run',
        artist: 'Ade Music',
        src: '/music/track2.mp3',
        cover: '/covers/cover2.jpg',
        duration: '3:12',
        genre: 'Electronic',
        color: '#8B4513', // Saddle Brown
    },
    {
        id: '3',
        title: "we're fucked",
        artist: 'Ade Music',
        src: '/music/track3.mp3',
        cover: '/covers/cover3.jpg',
        duration: '4:20',
        genre: 'Electronic',
        color: '#2F4F4F', // Dark Slate Grey
    },
    {
        id: '4',
        title: 'it goes dark',
        artist: 'Ade Music',
        src: '/music/track4.mp3',
        cover: '/covers/cover4.jpg',
        duration: '3:30',
        genre: 'Electronic',
        color: '#800020', // Burgundy
    },
];

