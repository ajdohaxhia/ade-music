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
        title: 'Code Switch',
        artist: 'Ade Music',
        src: '/music/track1.mp3', // Filenames are simple, no spaces needed based on user mapping
        cover: '/covers/cover1.png',
        duration: '2:45',
        genre: 'Afro-Trap',
        color: '#7000FF', // Deep Purple
    },
    {
        id: '2',
        title: 'No Time to Run',
        artist: 'Ade Music',
        src: '/music/track2.mp3',
        cover: '/covers/cover2.png',
        duration: '3:12',
        genre: 'Trap',
        color: '#FF8C00', // Sunset Orange
    },
    // Handling robust path just in case user renames it to "Voltage Kisses.mp3" locally later
    // We keep 'track3.mp3' as the request default, but logic handles spaces if they existed.
    {
        id: '3',
        title: "We're Fucked",
        artist: 'Ade Music',
        src: '/music/track3.mp3',
        cover: '/covers/cover3.png',
        duration: '4:20',
        genre: 'Electronic',
        color: '#00F0FF', // Cyan
    },
    {
        id: '4',
        title: 'It Goes Dark',
        artist: 'Ade Music',
        src: '/music/track4.mp3', // <- Metti il file MP3 in public/music/track4.mp3
        cover: '/covers/cover4.png', // <- Metti la cover in public/covers/cover4.png
        duration: '3:30',
        genre: 'Electronic',
        color: '#FF00FF', // Magenta - cambia il colore se vuoi
    },
];
