import { useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Chip,
  CircularProgress
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { CheckStatus } from "../Services/ApplicationApi";

export default function StatusCheckPage() {

  const [nationalId, setNationalId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // ================================
  // SUBMIT
  // ================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");
      setStatus("");

      const response = await CheckStatus(nationalId);
 

      // HANDLE STRING OR OBJECT RESPONSE
      const currentStatus =
        typeof response === "string"
          ? response
          : response[0].status || response[0].Status;
  
      setStatus(currentStatus);

      setSearched(true);

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data ||
        "Application not found"
      );

    } finally {

      setLoading(false);

    }

  };

  // ================================
  // RESET
  // ================================
  const handleReset = () => {

    setNationalId("");
    setStatus("");
    setError("");
    setSearched(false);

  };

  // ================================
  // STATUS COLOR
  // ================================
  const getStatusColor = () => {

    const currentStatus =
      typeof status === "string"
        ? status.toLowerCase()
        : "";

    if (currentStatus === "approved")
      return "success";

    if (currentStatus === "pending")
      return "warning";

    if (currentStatus === "rejected")
      return "error";

    return "default";
  };

  // ================================
  // STATUS ICON
  // ================================
  const getStatusIcon = () => {

    const currentStatus =
      typeof status === "string"
        ? status.toLowerCase()
        : "";
    
    if (currentStatus === "Approved")
      return <CheckCircleIcon />;

    if (currentStatus === "Pending")
      return <PendingIcon />;

    if (currentStatus === "Rejected")
      return <CancelIcon />;

    return null;
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
          maxWidth: 500,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff",
            p: 5,
            textAlign: "center"
          }}
        >

          <SearchIcon
            sx={{
              fontSize: 60,
              mb: 2
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Loan Status Checker
          </Typography>

          <Typography
            sx={{
              mt: 1,
              opacity: 0.9
            }}
          >
            Track your loan application instantly
          </Typography>

        </Box>

        {/* BODY */}
        <Box sx={{ p: 4 }}>

          {/* SEARCH FORM */}
          {!searched && (

            <form onSubmit={handleSubmit}>

              <TextField
                fullWidth
                label="National ID"
                value={nationalId}
                onChange={(e) =>
                  setNationalId(e.target.value)
                }
                required
                inputProps={{
                  maxLength: 13
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
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

                {loading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                  />
                ) : (
                  "Search Status"
                )}

              </Button>

            </form>

          )}

          {/* ERROR */}
          {error && (

            <Alert
              severity="error"
              sx={{
                mt: 3,
                borderRadius: 3
              }}
            >
              {error}
            </Alert>

          )}

          {/* STATUS RESULT */}
          {searched && status && (

            <Box
              sx={{
                textAlign: "center"
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
              >
                Application Status
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Your loan application is currently:
              </Typography>

              <Chip
                icon={getStatusIcon()}
                label={status}
                color={getStatusColor()}
                sx={{
                  px: 3,
                  py: 3.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 3
                }}
              />

              <Button
                fullWidth
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                sx={{
                  mt: 5,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold"
                }}
              >
                Check Another Status
              </Button>

            </Box>

          )}

        </Box>

      </Paper>

    </Box>

  );
}