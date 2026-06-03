import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";

import {
  Dashboard,
  Assignment,
  Logout,
  Person,
  Settings
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../Hocks/AuthContext";
import { LogoutUser } from "../../Services/AccountApi";

export default function Header() {

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // ============================
  // ROLE CHECKS
  // ============================
  const isAdmin = user?.roles?.includes("Admin");
  const isUser = user?.roles?.includes("User");

  // ============================
  // MENU
  // ============================
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ============================
  // LOGOUT
  // ============================
  const handleLogout = async () => {

    setUser(null);
    localStorage.removeItem("access_token");

    try {
      await LogoutUser();
    } catch (error) {
      console.log("Logout error:", error);
    }

    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>

      <Toolbar>

        {/* LOGO */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Loan Shark System
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>

          {/* APPLICATIONS */}
          <Button
            color="inherit"
            component={Link}
            to="/application"
            startIcon={<Dashboard />}
          >
            Applications
          </Button>

          {/* APPLY - USER ONLY */}
          {isUser && (
            <Button
              color="inherit"
              component={Link}
              to="/application/apply"
              startIcon={<Assignment />}
            >
              Apply
            </Button>
          )}

          {/* AUDIT - ADMIN ONLY */}
          {isAdmin && (
            <Button color="inherit" component={Link} to="/audit">
              Audit
            </Button>
          )}

          {/* SYSTEM CODE - ADMIN ONLY */}
          {isAdmin && (
            <Button
              color="inherit"
              component={Link}
              to="/systemcode"
              startIcon={<Settings />}
            >
              SystemCode
            </Button>
          )}

          {/* SYSTEM CODE DETAILS - ADMIN ONLY */}
          {isAdmin && (
            <Button
              color="inherit"
              component={Link}
              to="/systemcodedetails"
              startIcon={<Settings />}
            >
              SystemCodeDetails
            </Button>
          )}

          {/* PROFILE */}
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar>
              {user?.firstName?.charAt(0) || "U"}
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>

            <MenuItem
              component={Link}
              to="/user/profile"
              onClick={handleClose}
            >
              <Person sx={{ mr: 1 }} />
              Profile
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>

          </Menu>

        </Box>

      </Toolbar>
    </AppBar>
  );
}