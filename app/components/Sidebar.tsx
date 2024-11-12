"use client";
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import {
  Home,
  TrendingUp,
  LibraryMusic,
  Explore,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const MenuItem = styled(ListItem)({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const menuListArray: { text: string; icon: React.ReactNode }[] = [
  {
    text: "Home",
    icon: <Home sx={{ color: "#f00" }} />,
  },
  {
    text: "Trends",
    icon: <TrendingUp sx={{ color: "#f00" }} />,
  },
  {
    text: "Library",
    icon: <LibraryMusic sx={{ color: "#f00" }} />,
  },
  {
    text: "Discover",
    icon: <Explore sx={{ color: "#f00" }} />,
  },
];

const Sidebar = () => {
  const logoSection = () => (
    <Box sx={{ display: "flex", alignItems: "center", mb: "40px" }}>
      <MusicNoteIcon sx={{ color: "#f00", fontSize: 50 }} />
      <Typography variant="h4">
        <span style={{ color: "#f00" }}>Dream</span>Music
      </Typography>
    </Box>
  );

  const menuSection = () => (
    <>
      <Typography variant="subtitle2" sx={{ color: "#666", mb: 2 }}>
        MENU
      </Typography>

      {/* as I dont need to perform any task for clicks, that's why its just a list  */}
      <List>
        {menuListArray.map((menu, index) => (
          <MenuItem
            key={index}
            sx={{
              backgroundColor: index === 0 ? "rgba(255, 255, 255, 0.1)" : null,
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.text} sx={{ color: "white" }} />
          </MenuItem>
        ))}
      </List>
    </>
  );

  const generalSection = () => (
    <Box mt="auto">
      <Typography variant="subtitle2" sx={{ color: "#666", mb: 2 }}>
        GENERAL
      </Typography>
      {/* as I dont need to perform any task for clicks, that's why its just a list  */}
      <List>
        <MenuItem>
          <ListItemIcon>
            <Settings sx={{ color: "#f00" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: "white" }} />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ExitToApp sx={{ color: "#f00" }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" sx={{ color: "white" }} />
        </MenuItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "#0A0A0A",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 3,
        width: "20%",
      }}
    >
      {logoSection()}
      {menuSection()}
      {generalSection()}
    </Box>
  );
};

export default Sidebar;
