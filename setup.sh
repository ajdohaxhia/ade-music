#!/bin/bash

# Create directories
mkdir -p public/music
mkdir -p public/covers

# Create placeholder audio files (touch creates empty files)
touch public/music/track1.mp3
touch public/music/track2.mp3
touch public/music/track3.mp3

# Create placeholder images
touch public/covers/cover1.jpg
touch public/covers/cover2.jpg
touch public/covers/cover3.jpg

echo "✅ Setup Complete: Directories created and placeholder files added."
echo "👉 Please replace files in 'public/music' and 'public/covers' with your actual assets."
