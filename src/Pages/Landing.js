import React from "react";

import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack
} from "@mui/material";

import {
  FlashOn,
  Security,
  TrendingUp,
  AccountBalance,
  Margin
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function LoanLandingPage() {

  const navigate = useNavigate();

  return (
    <Box>

      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)",
          color: "#fff"
        }}
      >
        <Container maxWidth="lg">

          <Grid
            container
            spacing={6}
            alignItems="center"
          >

            {/* LEFT */}
            <Grid item xs={12} md={6}>

              <Typography
                variant="h2"
                fontWeight={800}
                gutterBottom
              >
                Fast & Secure
                <br />
                Loan Solutions
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  mb: 4,
                  lineHeight: 1.8
                }}
              >
                Get approved in minutes with our
                simple online application process.
                Safe, secure and trusted by thousands
                of customers.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row"
                }}
                spacing={2}
                flexWrap="wrap"
              >

                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    navigate("/application/apply")
                  }
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg,#f59e0b,#f97316)"
                  }}
                >
                  Apply For Loan
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    navigate("/checkstatus")
                  }
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    color: "#fff",
                    borderColor: "#fff"
                  }}
                >
                  Check Status
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    navigate("/login")
                  }
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    color: "#fff",
                    borderColor: "#fff"
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    navigate("/register")
                  }
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 700,
                    bgcolor: "#22c55e",
                    "&:hover": {
                      bgcolor: "#16a34a"
                    }
                  }}
                >
                  Register
                </Button>

              </Stack>

            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={6}>

              <Box
                component="img"
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200"
                alt="Loan Services"
                sx={{
                  width: "100%",
                  borderRadius: 5,
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.3)"
                }}
              />

            </Grid>

          </Grid>

        </Container>
      </Box>

      {/* STATISTICS */}
      <Box
        sx={{
          py: 8,
          bgcolor: "#ffffff"
        }}
      >
        <Container maxWidth="lg">

          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Trusted By Thousands
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 5 }}
          >
            Delivering fast and reliable financial solutions.
          </Typography>

          <Grid container spacing={3}>

            {[
              {
                value: "10,000+",
                label: "Loans Approved"
              },
              {
                value: "R50M+",
                label: "Funds Disbursed"
              },
              {
                value: "98%",
                label: "Customer Satisfaction"
              },
              {
                value: "24/7",
                label: "Customer Support"
              }
            ].map((item) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item.label}
              >

                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%"
                  }}
                >

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    color="primary"
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {item.label}
                  </Typography>

                </Paper>

              </Grid>

            ))}

          </Grid>

        </Container>
      </Box>

      {/* FEATURES */}
      <Box
        sx={{
          py: 10,
          bgcolor: "#f8fafc"
        }}
      >
        <Container maxWidth="md">

          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Why Choose Loan Shark?
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Everything you need for a smooth loan experience.
          </Typography>

          <Grid container spacing={7} sx={{Margin:5},{marginBottom:5}}>

            {[
              {
                icon: <FlashOn sx={{ fontSize: 50 }} />,
                title: "Instant Approval",
                desc:
                  "Applications reviewed within minutes."
              },
              {
                icon: <Security sx={{ fontSize: 50 }} />,
                title: "Secure Process",
                desc:
                  "Your personal data is encrypted and protected."
              },
              {
                icon: <TrendingUp sx={{ fontSize: 50 }} />,
                title: "Flexible Repayment",
                desc:
                  "Payment plans that suit your budget."
              },
              {
                icon: <AccountBalance sx={{ fontSize: 50 }} />,
                title: "Trusted Partner",
                desc:
                  "Thousands of successful applications processed."
              }
            ].map((feature) => (

              <Grid
                item
                xs={12}
                md={6}
                key={feature.title}
              >

                <Paper
                  elevation={3}
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)"
                    }
                  }}
                >

                  <Box
                    sx={{
                      color: "#2563eb"
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mt: 2 }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {feature.desc}
                  </Typography>

                </Paper>

              </Grid>

            ))}

          </Grid>

        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: 10,
          background:
            "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff",
          textAlign: "center"
        }}
      >
        <Container>

          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
          >
            Ready To Get Started?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4
            }}
          >
            Apply online and receive a decision quickly.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() =>
              navigate("/application/apply")
            }
            sx={{
              bgcolor: "#fff",
              color: "#2563eb",
              px: 5,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              textTransform: "none"
            }}
          >
            Apply Now
          </Button>

        </Container>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          bgcolor: "#0f172a",
          color: "#fff",
          py: 4,
          textAlign: "center"
        }}
      >

        <Typography fontWeight={600}>
          © {new Date().getFullYear()} Loan Shark
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.7,
            mt: 1
          }}
        >
          Fast • Secure • Reliable Financial Services
        </Typography>

      </Box>

    </Box>
  );
}