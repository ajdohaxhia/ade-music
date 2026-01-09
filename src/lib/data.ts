export interface Track {
    id: string;
    title: string;
    artist: string;
    src: string;
    cover: string;
    duration: string;
    genre: string;
    color: string;
}

export const TRACKS: Track[] = [
    {
        id: '1',
        title: 'Paranoia',
        artist: 'Ade Music',
        src: '/music/track1.mp3',
        cover: '/covers/cover1.jpg',
        duration: '2:45',
        genre: 'Afro-Trap',
        color: '#7000FF',
    },
    {
        id: '2',
        title: 'Serotonina',
        artist: 'Ade Music',
        src: '/music/track2.mp3',
        cover: '/covers/cover2.jpg',
        duration: '3:12',
        genre: 'Trap',
        color: '#FF8C00',
    },
    {
        id: '3',
        title: 'It Goes Dark',
        artist: 'Ade Music',
        src: '/music/track3.mp3',
        cover: '/covers/cover3.jpg',
        duration: '4:20',
        genre: 'Electronic',
        color: '#00F0FF',
    },
];

// NOTE: I should verify the actual filenames in public/music to ensure these paths are correct.
