"use client";
import React, { useState } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import PlayerCard from "./PlayerCard";
import { Song } from "../types/types";

const initialPlaylist: Song[] = [
  // Your song data
  {
    id: 1,
    title: "Without me",
    artist: "Eminem",
    album: "Eminem hit song",
    duration: "4:57",
    plays: 1040811084,
    coverArt: "/song.svg",
  },
  {
    id: 2,
    title: "Mockingbird",
    artist: "Eminem",
    album: "Eminem hit song",
    duration: "4:17",
    plays: 1040811084,
    coverArt: "/song.svg",
  },
  {
    id: 3,
    title: "When I'm gone",
    artist: "Eminem",
    album: "Eminem hit song",
    duration: "6.09",
    plays: 1040811084,
    coverArt: "/song.svg",
  },
  {
    id: 4,
    title: "Not Afraid",
    artist: "Eminem",
    album: "Eminem hit song",
    duration: "4.18",
    plays: 1040811084,
    coverArt: "/song.svg",
  },
  {
    id: 5,
    title: "Love The Way You Lie",
    artist: "Eminem",
    album: "Eminem hit song",
    duration: "4.26",
    plays: 1040811084,
    coverArt: "/song.svg",
  },
];

const FullPage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>(initialPlaylist);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
  };

  const updatePlaylist = (newPlaylist: Song[]) => {
    setPlaylist(newPlaylist);
  };

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Sidebar Toggle Button */}
        <IconButton
          onClick={() => setSidebarOpen(pre => !pre)}
          sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>

        {/* PlayerCard Toggle Button */}
        <Fab
          color="primary"
          onClick={() => setPlayerOpen(pre => !pre)}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1300,
          }}
        >
          <MusicNoteIcon />
        </Fab>

        {/* Sidebar Drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ zIndex: 1200, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <Sidebar />
        </Drawer>

        {/* Main Content */}
        <MainContent
          onSongSelect={handleSongSelect}
          songsList={playlist}
          onPlaylistUpdate={updatePlaylist}
        />

        {/* PlayerCard Drawer */}
        <Drawer
          anchor="right"
          open={playerOpen}
          onClose={() => setPlayerOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <PlayerCard
            currentSong={currentSong}
            playlist={playlist}
            onSongChange={handleSongSelect}
            autoPlay 
          />
        </Drawer>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        height: "100%",
      }}
    >
      <Sidebar />
      <MainContent
        onSongSelect={handleSongSelect}
        songsList={playlist}
        onPlaylistUpdate={updatePlaylist}
      />
      <PlayerCard
        currentSong={currentSong}
        playlist={playlist}
        onSongChange={handleSongSelect}
        autoPlay 
      />
    </Box>
  );
};

export default FullPage;
