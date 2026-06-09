import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  Box,
} from "@mui/material";

export default function AccountSettings() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      // await api.put("/auth/profile", profile);

      setMessage("Profile updated successfully");
    } catch {
      setMessage("Failed to update profile");
    }
  };

  const changePassword = async () => {
    if (password.newPassword !== password.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // await api.post("/auth/change-password", password);

      setMessage("Password changed successfully");
    } catch {
      setMessage("Failed to change password");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Account Settings
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Profile Information" />

            <Divider />

            <CardContent>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleProfileChange}
                margin="normal"
              />

              <Box mt={3}>
                <Button
                  variant="contained"
                  onClick={updateProfile}
                >
                  Save Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Password Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Change Password" />

            <Divider />

            <CardContent>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                margin="normal"
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                margin="normal"
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                margin="normal"
              />

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={changePassword}
                >
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Account Details */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader title="Account Information" />

            <Divider />

            <CardContent>
              <Typography variant="body1" gutterBottom>
                <strong>Account Status:</strong> Active
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>User Role:</strong> Customer
              </Typography>

              <Typography variant="body1">
                <strong>Last Login:</strong> 09 June 2026
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}