import React, { useState } from "react";

import { Registration } from "../Services/AccountApi";
import { useNavigate, Link } from "react-router-dom";

import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Divider
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "",   
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        email: form.email,
        password: form.password
      };

      const response = await Registration(payload);

      console.log(response);

      
      navigate("/login");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        p: 2
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff"
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
            <PersonAddAlt1Icon sx={{ fontSize: 35 }} />
          </Box>

          <Typography variant="h4" fontWeight={700}>
            Create Account
          </Typography>

          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
            Register to access Loan Shark System
          </Typography>

        </Box>

        {/* FORM */}
        <Box sx={{ p: 4 }}>

          <form onSubmit={handleSubmit}>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

              {/* FIRST + LAST NAME */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2
                }}
              >

                <TextField
                  name="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  name="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />

              </Box>

              {/* EMAIL */}
              <TextField
                type="email"
                name="email"
                label="Email Address"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />

              <Divider />

              {/* ROLE (optional but FIXED) */}
              <TextField
                name="role"
                label="Role (User/Admin)"
                value={form.role}
                onChange={handleChange}
                fullWidth
                required
              />

              {/* PASSWORD */}
              <TextField
                type="password"
                name="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
              />

              {/* CONFIRM PASSWORD */}
              <TextField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
              />

              {/* BUTTON */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Create Account
              </Button>

              {/* LOGIN LINK */}
              <Typography textAlign="center" color="text.secondary">
                Already have an account?{" "}
                <Typography
                  component={Link}
                  to="/login"
                  sx={{
                    color: "#2563eb",
                    fontWeight: 700,
                    textDecoration: "none"
                  }}
                >
                  Login
                </Typography>
              </Typography>

            </Box>
          </form>

        </Box>

      </Paper>
    </Box>
  );
}