'use server';

import cloudinary from '@/lib/cloudinary';

export interface Track {
    title: string;
    url: string;
    coverArt: string;
    duration: number;
    bpm?: number;
    genre?: string;
    artist: string;
}

export async function getMusic(): Promise<Track[]> {
    try {
        // 1. Fetch assets from the specific folder
        // usage of 'expression' allows for more flexible filtering if needed later
        const result = await cloudinary.search
            .expression('folder:ade-music-portfolio AND resource_type:video')
            // Note: Cloudinary treats audio as 'video' resource_type in many contexts, 
            // or explicitly 'video' includes audio files. We use 'video' to capture audio uploads.
            // If purely seeking 'audio' resource type, we might need to adjust based on upload settings,
            // but 'resource_type: "video"' is the standard for audio/video in search API.
            .with_field('context')
            .with_field('tags')
            .with_field('duration') // Fetch metadata
            .sort_by('created_at', 'desc')
            .max_results(50)
            .execute();

        // 2. Map constraints
        const tracks: Track[] = result.resources.map((res: any) => {
            // Extract metadata from 'context' (custom fields) or fallback to defaults
            const context = res.context || {};

            return {
                title: context.custom?.title || res.filename || 'Untitled Track',
                url: res.secure_url,
                // Assuming cover art is named similarly or passed in context. 
                // For now, we'll placeholder or look for a specific key.
                // A better approach: Use a default or the same public_id with .jpg extension if it exists
                // simplified: use a generic cover or a context field.
                coverArt: context.custom?.cover_art || '/images/default-album-art.jpg',
                duration: res.duration || 0,
                bpm: context.custom?.bpm ? parseInt(context.custom.bpm) : undefined,
                genre: context.custom?.genre || 'Unknown',
                artist: context.custom?.artist || 'Ade Music'
            };
        });

        return tracks;

    } catch (error) {
        console.error('Error fetching music from Cloudinary:', error);
        return [];
    }
}
