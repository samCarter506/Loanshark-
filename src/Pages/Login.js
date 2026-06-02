import { useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Divider
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  LoginUser,
  GetCurrentUser
} from "../Services/AccountApi";

import { useAuth } from "../Hocks/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

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

      setError("");

      // LOGIN
      await LoginUser(form);

      // GET USER
      const user =
        await GetCurrentUser();

      console.log(user);

      // SAVE USER
      setUser(user);

      // REDIRECT
      navigate("/");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Login failed"
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
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        p: 2
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            background:
              "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
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

            <LockOpenIcon
              sx={{
                fontSize: 35
              }}
            />

          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 1,
              opacity: 0.9
            }}
          >
            Sign in to continue
          </Typography>

        </Box>

        {/* FORM */}
        <Box
          sx={{
            p: 4
          }}
        >

          <form onSubmit={handleSubmit}>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5
              }}
            >

              {/* ERROR */}
              {error && (

                <Alert
                  severity="error"
                  sx={{
                    borderRadius: 3
                  }}
                >
                  {error}
                </Alert>

              )}

              {/* EMAIL */}
              <TextField
                type="email"
                name="email"
                label="Email Address"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
              />

              <Divider />

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  boxShadow: "none",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  "&:hover": {
                    boxShadow: "none",
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)"
                  }
                }}
              >
                Sign In
              </Button>

              {/* REGISTER LINK */}
              <Typography
                textAlign="center"
                color="text.secondary"
              >
                Don&apos;t have an account?{" "}

                <Typography
                  component={Link}
                  to="/register"
                  sx={{
                    color: "#2563eb",
                    fontWeight: 700,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline"
                    }
                  }}
                >
                  Create Account
                </Typography>

              </Typography>

            </Box>

          </form>

        </Box>

      </Paper>

    </Box>

  );

}