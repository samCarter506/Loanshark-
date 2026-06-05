import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  useMediaQuery,
  Paper,
  Stack,
  Avatar,
  TextField,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Visibility,
  Edit,
  PictureAsPdf,
  Image,
  Description
} from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';

import { GetApplications, UpdateLoan } from '../Services/ApplicationApi';

import { useTheme } from '@mui/material/styles';

export default function Applications() {

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [statusDialog, setStatusDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [documentDialog, setDocumentDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [updateData, setUpdateData] = useState({
    status: '',
    interestRate: '',
    loanTermMonths: ''

  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await GetApplications();

      const formattedData = data.map((item, index) => ({
        id: item.id || index + 1,
        ...item
      }));

      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };
  const handleUpdateLoan = async () => {

    try {

      await UpdateLoan(
        selectedRow.id,
        updateData
      );

      setSnackbar({
        open: true,
        message: "Loan updated successfully",
        severity: "success"
      });

      await fetchApplications();

      handleCloseDialogs();

    } catch (error) {

      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to update loan",
        severity: "error"
      });
    }
  };
  const handleViewDocument = (doc) => {

    setSelectedDocument(doc);

    setDocumentDialog(true);

  };

  const handleCloseDocument = () => {

    setSelectedDocument(null);

    setDocumentDialog(false);

  };

  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleOpenStatusDialog = () => {
    setUpdateData({
      ...updateData,
      status: selectedRow?.status || ''
    });
    setStatusDialog(true);
  };

  const handleOpenDetailsDialog = () => {
    setUpdateData({
      status: selectedRow?.status || '',
      interestRate: selectedRow?.interestRate || '',
      loanTermMonths: selectedRow?.loanTermMonths || '',
      monthlyPayment: selectedRow?.monthlyPayment || ''
    });

    setDetailsDialog(true);
  };

  const handleCloseDialogs = () => {
    setStatusDialog(false);
    setDetailsDialog(false);
  };

  const handleUpdateChange = (field) => (event) => {
    setUpdateData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatCurrency = (value) => {
    if (!value && value !== 0) return '-';
    return `R ${Number(value).toLocaleString()}`;
  };

  const DocumentItem = ({ doc }) => {

    const extension =
      doc.fileName
        ?.split(".")
        .pop()
        ?.toLowerCase();

    const isPdf =
      extension === "pdf";

    const isImage =
      ["jpg", "jpeg", "png", "gif", "webp"]
        .includes(extension);

    return (

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1
        }}
      >

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >

          {isPdf ? (
            <PictureAsPdf color="error" />
          ) : isImage ? (
            <Image color="primary" />
          ) : (
            <Description />
          )}

          <Box>

            <Typography fontWeight={600}>
              {doc.documentType}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {doc.fileName}
            </Typography>

          </Box>

        </Stack>

        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            handleViewDocument(doc)
          }
        >
          View
        </Button>

      </Paper>
    );
  };

  const DetailItem = ({ label, value }) => (
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.5 }}>
        {value || '-'}
      </Typography>
    </Box>
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },

    {
      field: 'fullName',
      headerName: 'Applicant',
      flex: 1.3,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>
            {params.row.fullName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography fontWeight={600}>
              {params.row.fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Stack>
      )
    },

    {
      field: 'cellphone',
      headerName: 'Phone',
      flex: 1
    },

    {
      field: 'amount',
      headerName: 'Loan Amount',
      flex: 1,
      renderCell: (params) => (
        <Typography fontWeight={700} color="primary">
          {formatCurrency(params.value)}
        </Typography>
      )
    },

    {
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      )
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.4,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility />}
            onClick={() => handleView(params.row)}
          >
            View
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<Edit />}
            onClick={() => {
              setSelectedRow(params.row);
              handleOpenDetailsDialog();
            }}
          >
            Edit
          </Button>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" fontWeight={700}>
        Loan Applications
      </Typography>

      <Paper sx={{ mt: 3, borderRadius: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* VIEW DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56 }}>
              {selectedRow?.fullName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {selectedRow?.fullName}
              </Typography>
              <Typography color="text.secondary">
                Application #{selectedRow?.id}
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          {selectedRow && (
            <Stack spacing={3}>

              {/* PERSONAL */}
              <Paper sx={{ p: 3 }}>
                <Typography fontWeight={700} mb={2}>
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="National ID" value={selectedRow.nationalId} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Phone" value={selectedRow.cellphone} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Email" value={selectedRow.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <DetailItem label="Address" value={selectedRow.address} />
                  </Grid>
                </Grid>
              </Paper>

              {/* EMPLOYMENT */}
              <Paper sx={{ p: 3 }}>
                <Typography fontWeight={700} mb={2}>
                  Employment
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Employer" value={selectedRow.employer} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Net Salary" value={formatCurrency(selectedRow.netSalary)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Gross Salary" value={formatCurrency(selectedRow.grossSalary)} />
                  </Grid>
                </Grid>
              </Paper>

              {/* LOAN */}
              <Paper sx={{ p: 3 }}>
                <Typography fontWeight={700} mb={2}>
                  Loan Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Amount" value={formatCurrency(selectedRow.amount)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Interest rate%" value={selectedRow.interestRate} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Loan Term" value={selectedRow.loanTermMonths} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DetailItem label="Status" value={selectedRow.status} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DetailItem label="Monthly Installment" value={selectedRow.monthlyPayment} />
                  </Grid>

                </Grid>
              </Paper>

              {/* DOCUMENTS */}
              <Paper sx={{ p: 3 }}>
                <Typography fontWeight={700} mb={2}>
                  Documents
                </Typography>

                {selectedRow?.documents?.length ? (
                  selectedRow.documents.map((doc, i) => (
                    <DocumentItem key={i} doc={doc} />
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No documents uploaded
                  </Typography>
                )}
              </Paper>

            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* EDIT LOAN DIALOG */}

      <Dialog
        open={detailsDialog}
        onClose={handleCloseDialogs}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Edit Loan Details
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>

            <TextField
              label="Interest Rate (%)"
              fullWidth
              type="number"
              value={updateData.interestRate}
              onChange={handleUpdateChange('interestRate')}
            />

            <TextField
              label="Loan Term (Months)"
              fullWidth
              type="number"
              value={updateData.loanTermMonths}
              onChange={handleUpdateChange('loanTermMonths')}
            />

            <TextField
              select
              label="Status"
              fullWidth
              value={updateData.status}
              onChange={handleUpdateChange('status')}
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Approved">
                Approved
              </MenuItem>

              <MenuItem value="Rejected">
                Rejected
              </MenuItem>
            </TextField>

            <TextField
              label="Monthly Payment"
              fullWidth
              disabled
              hidden
              value={updateData.monthlyPayment}
            />

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialogs}>
            Cancel
          </Button>

          <Button
            variant="outlined"
            onClick={handleUpdateLoan}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={documentDialog}
        onClose={handleCloseDocument}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          {selectedDocument?.fileName}
        </DialogTitle>

        <DialogContent>

          {selectedDocument && (() => {

            const extension =
              selectedDocument.fileName
                ?.split(".")
                .pop()
                ?.toLowerCase();

            const isPdf =
              extension === "pdf";

            const isImage =
              [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "webp"
              ].includes(extension);

            if (isPdf) {

              return (
                <iframe
                  src={selectedDocument.filePath}
                  title="PDF Preview"
                  width="100%"
                  height="700px"
                  style={{
                    border: "none"
                  }}
                />
              );
            }

            if (isImage) {

              return (
                <Box
                  component="img"
                  src={selectedDocument.filePath}
                  alt={selectedDocument.fileName}
                  sx={{
                    width: "100%",
                    maxHeight: 700,
                    objectFit: "contain"
                  }}
                />
              );
            }

            return (

              <Box sx={{ py: 4 }}>

                <Typography>
                  Preview not available.
                </Typography>

                <Button
                  href={selectedDocument.filePath}
                  target="_blank"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Open Document
                </Button>

              </Box>
            );

          })()}

        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDocument}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false
          })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}