
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Slider,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Shuffle,
} from '@mui/icons-material';
import { Howl } from 'howler';
import { Song } from '../types/types';

const PlayerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#2A0A0A',
  padding: '20px',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '300px',
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    width: 'calc(100% - 40px)',
    right: '20px',
    bottom: '20px',
  },
}));

interface PlayerCardProps {
  currentSong: Song | null;
  playlist: Song[];
  onSongChange: (song: Song) => void;
  autoPlay?: boolean;
}

const PlayerCard = ({ currentSong, playlist, onSongChange, autoPlay }: PlayerCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState<Howl | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  

  useEffect(() =>{
    if(sound){
      sound.stop();
      sound.unload();
    }
  }, [sound])

  // Load the selected song
  useEffect(() => {
    if (sound) {
      sound.stop();
      sound.unload();  // Ensures previous sound is fully removed
    }
    if (currentSong) {
      const newSound = new Howl({
        src: [`songs/${currentSong.id}.mp3`],
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: handleNext, 
      });
      setSound(newSound);

      if (autoPlay) {
        setTimeout(() => newSound.play(), 100);  // Adding a small delay
      }

      return () => {
        newSound.unload();
      };
    }
  }, [currentSong, onSongChange]);

  useEffect(() => {
    if (autoPlay && sound) {
      sound.play();
      setIsPlaying(true);
    }
  }, [currentSong, autoPlay]);

  // Update progress
  useEffect(() => {
    if (isPlaying && sound) {
      const interval = setInterval(() => {
        setProgress((sound.seek() as number) / sound.duration() * 100);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, sound]);

  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    }
  };

  const handleNext = useCallback(() => {
    if (currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      onSongChange(playlist[nextIndex]);
    }
  }, [currentSong, playlist, onSongChange]);

  const handlePrevious = useCallback(() => {
    if (currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      onSongChange(playlist[prevIndex]);
    }
  }, [currentSong, playlist, onSongChange]);

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const newValue = value as number;
    if (sound) {
      sound.seek((newValue / 100) * sound.duration());
      setProgress(newValue);
    }
  };

  return (
    <PlayerContainer>
      {currentSong && (
        <>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <img
              src={currentSong.coverArt}
              alt={currentSong.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            {currentSong.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#666', mb: 2 }}>
            {currentSong.artist}
          </Typography>
          <Slider
            value={progress}
            onChange={handleSliderChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton size={isMobile ? 'medium' : 'large'} sx={{ color: 'white' }} onClick={handlePrevious}>
              <SkipPrevious />
            </IconButton>
            <IconButton size={isMobile ? 'medium' : 'large'} sx={{ color: 'white' }} onClick={togglePlay}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton size={isMobile ? 'medium' : 'large'} sx={{ color: 'white' }} onClick={handleNext}>
              <SkipNext />
            </IconButton>
            <IconButton size={isMobile ? 'medium' : 'large'} sx={{ color: 'white' }}>
              <Shuffle />
            </IconButton>
          </Box>
        </>
      )}
    </PlayerContainer>
  );
};

export default PlayerCard;