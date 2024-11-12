/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  InputBase,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Song } from '../types/types';

const SearchBar = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  padding: '2px 4px',
  width: 400,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
  '& .MuiInputBase-root': {
    color: 'white',
  },
});

const StyledTableContainer = styled(TableContainer)({
  maxHeight: '50vh',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
  },
});

const StyledTableRow = styled(TableRow)({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&.selected': {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  height: '60px',
});

const StyledTableCell = styled(TableCell)({
  color: 'white',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const ArtistSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem 0',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(13,9,9,1) 100%)',
    zIndex: 1,
  },
});

const MainContent = ({ onSongSelect, songsList, onPlaylistUpdate }: { onSongSelect: (song: Song) => void, songsList: Song[], onPlaylistUpdate: (newPlaylist: Song[]) => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [songs, setSongs] = useState(songsList);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState<number | null>(null); // Track currently playing song
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedSong !== currentlyPlayingSong) {
      setCurrentlyPlayingSong(selectedSong);
    }
  }, [selectedSong]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongs(items); // Update local state
    onPlaylistUpdate(items); // Notify parent of updated playlist order
  };

  const handleSongClick = (song: Song) => {
    setSelectedSong(song.id);
    if (currentlyPlayingSong !== song.id) {
      setCurrentlyPlayingSong(song.id);
      onSongSelect(song);
    }
  };

  const renderNavigation = () => (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 4,
      pt: 2
    }}>
      <SearchBar>
        <IconButton sx={{ color: 'white' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for artists, songs, or albums"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
    </Box>
  );

  const renderArtistSection = () => (
    <ArtistSection>
      <Box
        component="img"
        src="/eminem.jpeg"
        alt="Eminem"
        sx={{
          width: '200px',
          height: '200px',
          mb: 2,
          zIndex: 2,
        }}
      />
      <Box sx={{ textAlign: 'center', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h4">Eminem</Typography>
          <VerifiedIcon sx={{ color: '#1DA1F2' }} />
        </Box>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          27,852,501 monthly listeners
        </Typography>
      </Box>
    </ArtistSection>
  );

  const renderSongsTable = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songs">
        {(provided) => (
          <StyledTableContainer ref={provided.innerRef} {...provided.droppableProps}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["#", "TITLE", "PLAYING", "TIME", "ALBUM"].map((title, index) => (
                    <StyledTableCell sx={{ backgroundColor: '#0D0909' }} key={index}>{title}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.map((song, index) => (
                  <Draggable
                    key={song.id}
                    draggableId={song.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <StyledTableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleSongClick(song)}
                        className={selectedSong === song.id ? 'selected' : ''}
                        sx={{
                          opacity: snapshot.isDragging ? 0.8 : 1,
                          backgroundColor: snapshot.isDragging ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
                        }}
                      >
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {isMobile ? null : (
                              <Image
                                src={song.coverArt}
                                alt={song.title}
                                width={40}
                                height={40}
                                style={{
                                  marginRight: 10,
                                  borderRadius: '4px',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                            <Box>
                              <Typography variant="body1">{song.title}</Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {song.artist}
                              </Typography>
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>{song.plays.toLocaleString()}</StyledTableCell>
                        <StyledTableCell>{song.duration}</StyledTableCell>
                        <StyledTableCell>{song.album}</StyledTableCell>
                      </StyledTableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </Droppable>
    </DragDropContext>
  );


  return (
    <Box sx={{ 
      background: "linear-gradient(to bottom, #570101, #0D0909)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      width: isMobile ? "100%" : '60%',
      mb: 3,
    }}>
      {renderNavigation()}
      {renderArtistSection()}
      <Box sx={{ 
        flex: 1,
        overflow: 'hidden',
        padding: 3,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Popular</Typography>
        {renderSongsTable()}
      </Box>
    </Box>
  );
};

export default MainContent;