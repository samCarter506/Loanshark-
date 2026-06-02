import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Loan Shark System
      </Typography>
    </Box>
  );
}