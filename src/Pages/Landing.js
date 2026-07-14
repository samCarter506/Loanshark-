import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import {
  Security,
  FlashOn,
  AccountBalance,
  SupportAgent,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FlashOn sx={{ fontSize: 50 }} />,
      title: "Fast Approval",
      description:
        "Apply online and receive quick decisions on your loan application.",
    },
    {
      icon: <Security sx={{ fontSize: 50 }} />,
      title: "Secure Platform",
      description:
        "Your personal and financial information is protected with industry-standard security.",
    },
    {
      icon: <AccountBalance sx={{ fontSize: 50 }} />,
      title: "Flexible Loans",
      description:
        "Choose loan options that match your financial needs and repayment ability.",
    },
    {
      icon: <SupportAgent sx={{ fontSize: 50 }} />,
      title: "24/7 Support",
      description:
        "Our support team is available whenever you need assistance.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc" }}>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#1976d2,#42a5f5)",
          color: "#fff",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Smart Loan
                <br />
                Management System
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.8,
                }}
              >
                Apply for loans, monitor your applications, and manage your
                repayments through one secure platform.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: "#fff",
                    color: "#1976d2",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/register")}
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/loanmanagement.jpg"
                alt="Loan Management"
                sx={{
                  width: "100%",
                  height: {
                    xs: 300,
                    md: "90vh",
                  },
                  objectFit: "cover",
                  borderRadius: 0,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= FEATURES ================= */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          mb={2}
        >
          Why Choose Us?
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={6}
        >
          Everything you need to manage your loans efficiently.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card
                elevation={3}
                sx={{
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box color="primary.main">{feature.icon}</Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mt={2}
                    mb={1}
                  >
                    {feature.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= STATISTICS ================= */}
      <Box sx={{ bgcolor: "#fff", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              ["10,000+", "Loans Processed"],
              ["98%", "Approval Satisfaction"],
              ["R500M+", "Loans Issued"],
              ["24/7", "Customer Support"],
            ].map(([value, label]) => (
              <Grid item xs={6} md={3} key={label}>
                <Typography
                  variant="h3"
                  color="primary"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {value}
                </Typography>

                <Typography
                  textAlign="center"
                  color="text.secondary"
                >
                  {label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= CTA ================= */}
      <Box
        sx={{
          py: 10,
          background: "#1976d2",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Ready to Get Started?
          </Typography>

          <Typography
            sx={{
              mb: 4,
              color: "rgba(255,255,255,.9)",
            }}
          >
            Sign in to access your dashboard and manage your loan applications.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              bgcolor: "#fff",
              color: "#1976d2",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Login Now
          </Button>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          bgcolor: "#0f172a",
          color: "#fff",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold">
          © {new Date().getFullYear()} Loan Management System
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Secure • Fast • Reliable
        </Typography>
      </Box>
    </Box>
  );
}