import * as React from "react";

import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

export default function LoanLandingPage() {

  const navigate = useNavigate();

  // ================================
  // NAVIGATE TO APPLY
  // ================================
  const handleApplyClick = () => {

    navigate("/application/apply");

  };

  // ================================
  // NAVIGATE TO STATUS PAGE
  // ================================
  const handleStatusClick = () => {

    navigate("/checkstatus");

  };

  return (

    <Box>

      {/* HERO SECTION */}
      <Box
        sx={{
          bgcolor: "#0d47a1",
          color: "white",
          py: 12,
          textAlign: "center"
        }}
      >

        <Container maxWidth="md">

          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
          >
            Fast & Easy Loans
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.9
            }}
          >
            Get approved in minutes. Secure, simple and trusted.
          </Typography>

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >

            <Button
              variant="contained"
              size="large"
              onClick={handleApplyClick}
              sx={{
                bgcolor: "#ff9800",
                color: "#000",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#fb8c00"
                }
              }}
            >
              Apply for Loan
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleStatusClick}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor:
                    "rgba(255,255,255,0.1)"
                }
              }}
            >
              Check Status
            </Button>

          </Box>

        </Container>

      </Box>

      {/* BENEFITS */}
      <Container sx={{ py: 8 }}>

        <Grid container spacing={4}>

          {[
            {
              title: "Quick Approval",
              desc:
                "Get your loan approved within minutes."
            },
            {
              title: "Flexible Payments",
              desc:
                "Choose repayment plans that suit your budget."
            },
            {
              title: "Secure Process",
              desc:
                "Your information is protected and encrypted."
            }
          ].map((item, index) => (

            <Grid
              item
              xs={12}
              md={4}
              key={index}
            >

              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%"
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {item.title}
                </Typography>

                <Typography sx={{ mt: 2 }}>
                  {item.desc}
                </Typography>

              </Paper>

            </Grid>

          ))}

        </Grid>

      </Container>

      {/* FOOTER */}
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          py: 3,
          textAlign: "center"
        }}
      >

        <Typography variant="body2">

          © {new Date().getFullYear()}
          {" "}
          Loan Company.
          All rights reserved.

        </Typography>

      </Box>

    </Box>

  );
}