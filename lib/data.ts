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
    {
        id: '5',
        title: 'black goat',
        artist: 'Ade Music',
        src: '/music/track5.mp3',
        cover: '/covers/cover1.jpg',
        duration: '3:00', // Placeholder
        genre: 'Electronic',
        color: '#4a4a4a', // Match EP color
    },
    // Anxiety Release
    {
        id: '6',
        title: 'anxiety',
        artist: 'Ade Music',
        src: '/music/anxiety/anxiety.mp3',
        cover: '/covers/anxiety.jpg',
        duration: '3:20', // Placeholder
        genre: 'Rap/Hip-Hop',
        color: '#2e2e2e', // Dark Grey/Black for Anxiety
    },
    {
        id: '7',
        title: 'anxiety (extended)',
        artist: 'Ade Music',
        src: '/music/anxiety/anxiety_extended.mp3',
        cover: '/covers/anxiety.jpg',
        duration: '5:45', // Placeholder
        genre: 'Rap/Hip-Hop',
        color: '#2e2e2e',
    },
    {
        id: '8',
        title: 'anxiety (instrumental)',
        artist: 'Ade Music',
        src: '/music/anxiety/anxiety_instrumental.mp3',
        cover: '/covers/anxiety.jpg',
        duration: '3:20', // Placeholder
        genre: 'Rap/Hip-Hop',
        color: '#2e2e2e',
    },
    // Singles
    {
        id: '9',
        title: 'betrayed',
        artist: 'Ade Music',
        src: '/music/betrayed/betrayed.mp3',
        cover: '/covers/betrayed.jpg',
        duration: '3:40', // Placeholder
        genre: 'Rap/Hip-Hop',
        color: '#8B0000', // Dark Red
    },
    {
        id: '10',
        title: 'betrayed (extended)',
        artist: 'Ade Music',
        src: '/music/betrayed/betrayed_extended.mp3',
        cover: '/covers/betrayed.jpg',
        duration: '6:10', // Placeholder
        genre: 'Rap/Hip-Hop',
        color: '#8B0000',
    },
    {
        id: '11',
        title: 'no more tears',
        artist: 'Ade Music',
        src: '/music/no_more_tears/NO MORE TEARS FINAL FINAL.mp3',
        cover: '/covers/no_more_tears.jpeg',
        duration: '3:15', // Placeholder
        genre: 'Pop',
        color: '#4682B4', // Steel Blue
    },
    {
        id: '12',
        title: 'no more tears (instrumental)',
        artist: 'Ade Music',
        src: '/music/no_more_tears/NO MORE TEARS INSTRUMENTAL FINAL.mp3',
        cover: '/covers/no_more_tears.jpeg',
        duration: '3:15', // Placeholder
        genre: 'Pop',
        color: '#4682B4',
    },
];

