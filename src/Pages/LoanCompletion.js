import * as React from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  MenuItem
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { CreateApplication } from "../Services/ApplicationApi";

export default function Apply() {

  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);

const [form, setForm] = React.useState({

  //Should come after the loan is approved
  loanTermMonths: "",
  interestRate: "12",

  // BANKING  must be displayed when the loan is accepted
  bankName: "",
  accountType: "",
  accountNumber: "",
  branch: "",
  paymentDate: "",


});

  const [files, setFiles] = React.useState({
    idDocument: null,
    bankStatement: null,
    payslip: null
  });

const steps = [
  "Loan Details",
  "Banking Details",
  "Employment Details",
  "Monthly Expenses",
  "Upload Documents"
];

  // HANDLE INPUTS
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // HANDLE FILES
  const handleFileChange = (field) => (e) => {
    setFiles((prev) => ({
      ...prev,
      [field]: e.target.files[0]
    }));
  };

  // NEXT STEP
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  // BACK STEP
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // SUBMIT
 const handleSubmit = async () => {

  try {

    const formData = new FormData();

    // APPEND TEXT
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

    // APPEND FILES
    Object.keys(files).forEach((key) => {

      if (files[key]) {
        formData.append(key, files[key]);
      }

    });

    // VIEW EVERYTHING SENT
    console.log("===== FORM DATA =====");

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const result = await CreateApplication(formData);

    console.log(result);

  } catch (error) {

    console.error(error);

  }

};
// STEP CONTENT
const getStepContent = () => {

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#fff"
    }
  };

  switch (activeStep) {

    // STEP 0
    case 0:

      return (

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              fullWidth
              value={form.fullName}
              onChange={handleChange("fullName")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Surname"
              fullWidth
              value={form.surname}
              onChange={handleChange("surname")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Identity Number"
              fullWidth
              value={form.nationalId}
              onChange={handleChange("nationalId")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Cellphone"
              fullWidth
              value={form.cellphone}
              onChange={handleChange("cellphone")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Email Address"
              fullWidth
              value={form.email}
              onChange={handleChange("email")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12}md={12}>
            <TextField
              label="Residential Address"
              multiline
              rows={4}
              fullWidth
              value={form.address}
              onChange={handleChange("address")}
              sx={fieldSx}
            />
          </Grid>

        </Grid>

      );
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
          sx={fieldSx}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          label="Loan Term"
          fullWidth
          value={form.loanTermMonths}
          onChange={handleChange("loanTermMonths")}
          sx={fieldSx}
        >
          <MenuItem value={12}>12 Months</MenuItem>
          <MenuItem value={24}>24 Months</MenuItem>
          <MenuItem value={36}>36 Months</MenuItem>
          <MenuItem value={48}>48 Months</MenuItem>
          <MenuItem value={60}>60 Months</MenuItem>
          <MenuItem value={72}>72 Months</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Interest Rate (%)"
          type="number"
          fullWidth
          value={form.interestRate}
          onChange={handleChange("interestRate")}
          sx={fieldSx}
        />
      </Grid>

    </Grid>

  );

    // STEP 2
    case 2:

      return (

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Bank Name"
              fullWidth
              value={form.bankName}
              onChange={handleChange("bankName")}
              sx={fieldSx}
            >
              {[
                "ABSA",
                "Standard Bank",
                "FNB",
                "Capitec",
                "Discovery",
                "Nedbank"
              ].map((bankName) => (

                <MenuItem
                  key={bankName}
                  value={bankName}
                >
                  {bankName}
                </MenuItem>

              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Account Type"
              fullWidth
              value={form.accountType}
              onChange={handleChange("accountType")}
              sx={fieldSx}
            >
              <MenuItem value="Savings">
                Savings
              </MenuItem>

              <MenuItem value="Cheque">
                Cheque
              </MenuItem>

            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Account Number"
              fullWidth
              value={form.accountNumber}
              onChange={handleChange("accountNumber")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Branch Code"
              fullWidth
              value={form.branch}
              onChange={handleChange("branch")}
              sx={fieldSx}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              label="Salary Payment Date"
              fullWidth
              value={form.paymentDate}
              onChange={handleChange("paymentDate")}
              InputLabelProps={{
                shrink: true
              }}
              sx={fieldSx}
            />
          </Grid>

        </Grid>

      );

    // STEP 3
    case 3:

      return (

        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              label="Employer Name"
              fullWidth
              value={form.employer}
              onChange={handleChange("employer")}
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
              sx={fieldSx}
            />
          </Grid>

        </Grid>

      );

    // STEP 4
    case 4:

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
          label="Number of Dependents"
          type="number"
          fullWidth
          value={form.dependents}
          onChange={handleChange("dependents")}
          sx={fieldSx}
        />
      </Grid>

    </Grid>

  );
    case 5:

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
              md={6}
              key={item.key}
            >

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >

                <Typography
                  fontWeight={700}
                  mb={2}
                >
                  {item.label}
                </Typography>

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    px: 4
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
          maxWidth: 900,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff"
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
            fontWeight={700}
          >
            Loan Application
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Complete the form below
          </Typography>

          {/* STEPS */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              flexWrap: "wrap"
            }}
          >

            {steps.map((step, index) => (

              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >

                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    backgroundColor:
                      index <= activeStep
                        ? "#2563eb"
                        : "#e2e8f0",
                    color:
                      index <= activeStep
                        ? "#fff"
                        : "#64748b"
                  }}
                >
                  {index + 1}
                </Box>

                <Typography
                  fontWeight={600}
                  color={
                    index <= activeStep
                      ? "#0f172a"
                      : "#94a3b8"
                  }
                >
                  {step}
                </Typography>

              </Box>

            ))}

          </Box>

        </Box>

        {/* FORM */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },

            "& .MuiOutlinedInput-root": {
              borderRadius: 3
            }
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
              disabled={activeStep === 0}
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.2,
                textTransform: "none"
              }}
            >
              <KeyboardArrowLeft />
              Back
            </Button>

            {activeStep === steps.length - 1 ? (

              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  borderRadius: 3,
                  px: 5,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none"
                }}
              >
                Submit Application
              </Button>

            ) : (

              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  borderRadius: 3,
                  px: 5,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none"
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