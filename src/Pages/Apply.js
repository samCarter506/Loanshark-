import * as React from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  LinearProgress
} from "@mui/material";


import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { CreateApplication } from "../Services/ApplicationApi";

export default function Apply() {

  const [activeStep, setActiveStep] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const [errors, setErrors] = React.useState({});

  const [form, setForm] = React.useState({

    // PERSONAL
    fullName: "",
    surname: "",
    nationalId: "",
    cellphone: "",
    email: "",
    address: "",

    // LOAN
    amount: "",

    // EMPLOYMENT
    employer: "",
    employmentType: "",
    grossSalary: "",
    netSalary: "",

    // EXPENSES
    rentAmount: "",
    foodExpenses: "",
    transportExpenses: "",
    electricityExpenses: "",
    waterExpenses: "",
    existingLoanRepayments: "",
    otherExpenses: "",
    dependents: ""

  });

  const [files, setFiles] = React.useState({
    idDocument: null,
    bankStatement: null,
    payslip: null
  });

  const steps = [
    "Personal Details",
    "Loan Details",
    "Employment Details",
    "Monthly Expenses",
    "Upload Documents"
  ];

  const handleChange = (field) => (e) => {

    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: ""
    }));

  };

  const handleFileChange = (field) => (e) => {

    setFiles((prev) => ({
      ...prev,
      [field]: e.target.files[0]
    }));

  };

  const validateStep = () => {

    let newErrors = {};

    switch (activeStep) {

      // PERSONAL
      case 0:

        if (!form.fullName)
          newErrors.fullName = "Full name is required";

        if (!form.surname)
          newErrors.surname = "Surname is required";

        if (!form.nationalId)
          newErrors.nationalId = "Identity number is required";

        if (!form.cellphone)
          newErrors.cellphone = "Cellphone is required";

        if (!form.email)
          newErrors.email = "Email is required";

        if (!form.address)
          newErrors.address = "Address is required";

        break;

      // LOAN
      case 1:

        if (!form.amount)
          newErrors.amount = "Loan amount is required";

        break;

      // EMPLOYMENT
      case 2:

        if (!form.employer)
          newErrors.employer = "Employer is required";

        if (!form.netSalary)
          newErrors.netSalary = "Net salary is required";

        if (!form.grossSalary)
          newErrors.grossSalary = "Gross salary is required";

        break;

      // EXPENSES
      case 3:

        if (!form.rentAmount)
          newErrors.rentAmount = "Rent amount is required";

        if (!form.foodExpenses)
          newErrors.foodExpenses = "Food expenses are required";

        break;

      // DOCUMENTS
      case 4:

        if (!files.idDocument)
          newErrors.idDocument = "ID document required";

        if (!files.bankStatement)
          newErrors.bankStatement = "Bank statement required";

        if (!files.payslip)
          newErrors.payslip = "Payslip required";

        break;

      default:
        break;

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleNext = () => {

    if (!validateStep())
      return;

    setActiveStep((prev) => prev + 1);

  };

  const handleBack = () => {

    setActiveStep((prev) => prev - 1);

  };

  const handleSubmit = async () => {

    if (!validateStep())
      return;

    try {

      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {

        formData.append(key, form[key]);

      });

      const totalExpenses =
        Number(form.rentAmount || 0) +
        Number(form.foodExpenses || 0) +
        Number(form.transportExpenses || 0) +
        Number(form.electricityExpenses || 0) +
        Number(form.waterExpenses || 0) +
        Number(form.existingLoanRepayments || 0) +
        Number(form.otherExpenses || 0);

      formData.append("monthlyExpenses", totalExpenses);

      Object.keys(files).forEach((key) => {

        if (files[key]) {

          formData.append(key, files[key]);

        }

      });

      const result = await CreateApplication(formData);

      console.log(result);

    }
    catch (error) {

      console.error(error);

      alert("Something went wrong");

    }
    finally {

      setLoading(false);

    }

  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#fff"
    }
  };

  const totalExpenses =
    Number(form.rentAmount || 0) +
    Number(form.foodExpenses || 0) +
    Number(form.transportExpenses || 0) +
    Number(form.electricityExpenses || 0) +
    Number(form.waterExpenses || 0) +
    Number(form.existingLoanRepayments || 0) +
    Number(form.otherExpenses || 0);

  const disposableIncome =
    Number(form.netSalary || 0) - totalExpenses;

  const getStepContent = () => {

    switch (activeStep) {

      // PERSONAL
      case 0:

        return (

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                fullWidth
                value={form.fullName}
                onChange={handleChange("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Surname"
                fullWidth
                value={form.surname}
                onChange={handleChange("surname")}
                error={!!errors.surname}
                helperText={errors.surname}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Identity Number"
                fullWidth
                value={form.nationalId}
                onChange={handleChange("nationalId")}
                error={!!errors.nationalId}
                helperText={errors.nationalId}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cellphone"
                fullWidth
                value={form.cellphone}
                onChange={handleChange("cellphone")}
                error={!!errors.cellphone}
                helperText={errors.cellphone}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                fullWidth
                value={form.email}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Residential Address"
                multiline
                rows={4}
                fullWidth
                value={form.address}
                onChange={handleChange("address")}
                error={!!errors.address}
                helperText={errors.address}
                sx={fieldSx}
              />
            </Grid>

          </Grid>

        );

      // LOAN
      case 1:

        return (

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                label="Requested Loan Amount"
                type="number"
                fullWidth
                value={form.amount}
                onChange={handleChange("amount")}
                error={!!errors.amount}
                helperText={errors.amount}
                sx={fieldSx}
              />
            </Grid>

          </Grid>

        );

      // EMPLOYMENT
      case 2:

        return (

          <Grid container spacing={3}>

            <Grid item xs={12}>
              <TextField
                label="Employer Name"
                fullWidth
                value={form.employer}
                onChange={handleChange("employer")}
                error={!!errors.employer}
                helperText={errors.employer}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Net Salary"
                type="number"
                fullWidth
                value={form.netSalary}
                onChange={handleChange("netSalary")}
                error={!!errors.netSalary}
                helperText={errors.netSalary}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Gross Salary"
                type="number"
                fullWidth
                value={form.grossSalary}
                onChange={handleChange("grossSalary")}
                error={!!errors.grossSalary}
                helperText={errors.grossSalary}
                sx={fieldSx}
              />
            </Grid>

          </Grid>

        );

      // EXPENSES
      case 3:

        return (

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                label="Monthly Rent/Bond"
                type="number"
                fullWidth
                value={form.rentAmount}
                onChange={handleChange("rentAmount")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Food Expenses"
                type="number"
                fullWidth
                value={form.foodExpenses}
                onChange={handleChange("foodExpenses")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Transport Expenses"
                type="number"
                fullWidth
                value={form.transportExpenses}
                onChange={handleChange("transportExpenses")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Electricity Expenses"
                type="number"
                fullWidth
                value={form.electricityExpenses}
                onChange={handleChange("electricityExpenses")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Water Expenses"
                type="number"
                fullWidth
                value={form.waterExpenses}
                onChange={handleChange("waterExpenses")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Existing Loan Repayments"
                type="number"
                fullWidth
                value={form.existingLoanRepayments}
                onChange={handleChange("existingLoanRepayments")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Other Monthly Expenses"
                type="number"
                fullWidth
                value={form.otherExpenses}
                onChange={handleChange("otherExpenses")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Dependents"
                type="number"
                fullWidth
                value={form.dependents}
                onChange={handleChange("dependents")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0"
                }}
              >

                <Typography fontWeight={700} mb={2}>
                  Affordability Summary
                </Typography>

                <Typography>
                  Total Monthly Expenses: R {totalExpenses}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Disposable Income: R {disposableIncome}
                </Typography>

              </Paper>

            </Grid>

          </Grid>

        );

      // DOCUMENTS
      case 4:

        return (

          <Grid container spacing={3}>

            {[
              {
                label: "ID Document",
                key: "idDocument"
              },
              {
                label: "Bank Statement",
                key: "bankStatement"
              },
              {
                label: "Payslip",
                key: "payslip"
              }
            ].map((item) => (

              <Grid
                item
                xs={12}
                md={4}
                key={item.key}
              >

                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    textAlign: "center"
                  }}
                >

                  <Typography fontWeight={700} mb={2}>
                    {item.label}
                  </Typography>

                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      borderRadius: 3,
                      textTransform: "none"
                    }}
                  >
                    Upload File

                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange(item.key)}
                    />

                  </Button>

                  {files[item.key] && (

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 2,
                        color: "text.secondary"
                      }}
                    >
                      {files[item.key].name}
                    </Typography>

                  )}

                  {errors[item.key] && (

                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ mt: 1 }}
                    >
                      {errors[item.key]}
                    </Typography>

                  )}

                </Paper>

              </Grid>

            ))}

          </Grid>

        );

      default:
        return null;

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: 5,
        px: 2
      }}
    >

      <Paper
        elevation={0}
        sx={{
          maxWidth: 950,
          mx: "auto",
          borderRadius: 5,
          overflow: "hidden",
          border: "1px solid #e2e8f0"
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            px: { xs: 3, md: 5 },
            py: 4,
            borderBottom: "1px solid #e2e8f0"
          }}
        >

          <Typography
            variant="h4"
            fontWeight={800}
          >
            Loan Application
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Complete all required information
          </Typography>

          <Box sx={{ mt: 4 }}>

            <LinearProgress
              variant="determinate"
              value={((activeStep + 1) / steps.length) * 100}
              sx={{
                height: 10,
                borderRadius: 10
              }}
            />

          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              flexWrap: "wrap",
              gap: 2
            }}
          >

            {steps.map((step, index) => (

              <Typography
                key={index}
                fontWeight={700}
                color={
                  index <= activeStep
                    ? "primary"
                    : "text.secondary"
                }
              >
                {step}
              </Typography>

            ))}

          </Box>

        </Box>

        {/* BODY */}
        <Box
          sx={{
            p: { xs: 3, md: 5 }
          }}
        >

          <Typography
            variant="h5"
            fontWeight={700}
            mb={4}
          >
            {steps[activeStep]}
          </Typography>

          {getStepContent()}

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 5,
              pt: 3,
              borderTop: "1px solid #e2e8f0"
            }}
          >

            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 4,
                textTransform: "none"
              }}
            >
              <KeyboardArrowLeft />
              Back
            </Button>

            {activeStep === steps.length - 1 ? (

              <Button
                onClick={handleSubmit}
                disabled={loading}
                variant="contained"
                sx={{
                  borderRadius: 3,
                  px: 5,
                  textTransform: "none",
                  fontWeight: 700
                }}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Application"}
              </Button>

            ) : (

              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  borderRadius: 3,
                  px: 5,
                  textTransform: "none",
                  fontWeight: 700
                }}
              >
                Next
                <KeyboardArrowRight />
              </Button>

            )}

          </Box>

        </Box>

      </Paper>

    </Box>

  );

}