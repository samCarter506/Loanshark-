import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert
} from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { UpdateRoles } from "../Services/AccountApi";

export default function UpdateUserRole() {

  const [form, setForm] = useState({
    userId: "",
    role: ""
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const result = await UpdateRoles(
        form.userId,
        form.role
      );

      setSuccess(
        result.message ||
        "User role updated successfully"
      );

      setForm({
        userId: "",
        role: ""
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to update role"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        p: 2
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0"
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff",
            py: 5,
            px: 4,
            textAlign: "center"
          }}
        >

          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2
            }}
          >
            <AdminPanelSettingsIcon
              sx={{
                fontSize: 38
              }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Update Role
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              opacity: 0.9
            }}
          >
            Change user account permissions
          </Typography>

        </Box>

        {/* FORM */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >

          {success && (
            <Alert severity="success">
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <TextField
            label="User ID"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3
              }
            }}
          />

          <TextField
            select
            label="Select Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3
              }
            }}
          >

            <MenuItem value="Admin">
              Admin
            </MenuItem>

            <MenuItem value="User">
              User
            </MenuItem>

          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "none"
            }}
          >
            {loading
              ? "Updating..."
              : "Update User Role"}
          </Button>

        </Box>

      </Paper>

    </Box>

  );
}