import * as React from "react";

import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery
} from "@mui/material";

import {
  Visibility,
  Edit
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";

import {
  GetSystemCodes,
  CreateSystemCode,
  updateSystemCode
} from "../../Services/SystemCodeApi";

import { useTheme } from "@mui/material/styles";

const SystemCode = () => {

  // =========================================
  // STATES
  // =========================================
  const [open, setOpen] = React.useState(false);

  const [detailsDialog, setDetailsDialog] =
    React.useState(false);

  const [updateDialog, setUpdateDialog] =
    React.useState(false);

  const [rows, setRows] = React.useState([]);

  const [selectedRow, setSelectedRow] =
    React.useState(null);

  const [form, setForm] = React.useState({
    Code: "",
    Description: "",
    OrderNo: ""
  });

  const [updateData, setUpdateData] =
    React.useState({
      id: "",
      code: "",
      description: "",
      orderNo: ""
    });

  // =========================================
  // THEME
  // =========================================
  const theme = useTheme();

  const fullScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  // =========================================
  // FETCH DATA
  // =========================================
  React.useEffect(() => {
    fetchSystemCodes();
  }, []);

  const fetchSystemCodes = async () => {

    try {

      const data = await GetSystemCodes();

      const formattedData = data.map(
        (item, index) => ({
          id: item.id || index + 1,
          ...item
        })
      );

      setRows(formattedData);

    } catch (error) {

      console.error(
        "Error fetching system codes:",
        error
      );

    }
  };

  // =========================================
  // HANDLE FORM CHANGE
  // =========================================
  const handleChange = (field) => (e) => {

    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // =========================================
  // HANDLE UPDATE CHANGE
  // =========================================
  const handleUpdateChange =
    (field) => (e) => {

      setUpdateData((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
    };

  // =========================================
  // CREATE
  // =========================================
  const handleSubmit = async () => {

    try {

      const payload = {
        Code: form.Code,
        Description: form.Description,
        OrderNo: Number(form.OrderNo)
      };

      await CreateSystemCode(payload);

      setForm({
        Code: "",
        Description: "",
        OrderNo: ""
      });

      setOpen(false);

      fetchSystemCodes();

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data ||
        "Error saving system code"
      );
    }
  };

  // =========================================
  // UPDATE
  // =========================================
  const handleUpdate = async () => {

    try {

      const payload = {
        Id: updateData.id,
        Code: updateData.code,
        Description: updateData.description,
        OrderNo: Number(updateData.orderNo)
      };

      await updateSystemCode(payload);

      setUpdateDialog(false);

      fetchSystemCodes();

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data ||
        "Error updating system code"
      );
    }
  };

  // =========================================
  // DIALOGS
  // =========================================
  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => {
    setOpen(false);
  };

  const handleCloseDetails = () => {
    setDetailsDialog(false);
  };

  const handleCloseUpdate = () => {
    setUpdateDialog(false);
  };

  // =========================================
  // VIEW
  // =========================================
  const handleView = (row) => {

    setSelectedRow(row);

    setDetailsDialog(true);
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (row) => {

    setSelectedRow(row);

    setUpdateData({
      id: row.id,
      code: row.code || "",
      description: row.description || "",
      orderNo: row.orderNo || ""
    });

    setUpdateDialog(true);
  };

  // =========================================
  // FIELD STYLE
  // =========================================
  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#fff"
    }
  };

  // =========================================
  // TABLE COLUMNS
  // =========================================
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5
    },
    {
      field: "code",
      headerName: "System Code",
      flex: 1
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1
    },
    {
      field: "orderNo",
      headerName: "Order No",
      flex: 0.5
    },{ field: "createdBy",headerName: "Created By",flex: 1,
      valueGetter: (_, row) => {
        const user = row?.createdUser;
        if (!user) return "";
        return `${user.firstName || ""} ${user.lastName || ""}`;
      }
    },
    {
      field: "createdOn",
      headerName: "Date Created",
      flex: 1
    },{ field: "createdBy",headerName: "Created By",flex: 1,
      valueGetter: (_, row) => {
        const user = row?.modifiedUser;
        if (!user) return "";
        return `${user.firstName || ""} ${user.lastName || ""}`;
      }
    },
    {
      field: "modifiedOn",
      headerName: "Date Modified",
      flex: 1
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,

      renderCell: (params) => (

        <Stack direction="row" spacing={1}>

          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility />}
            onClick={() =>
              handleView(params.row)
            }
          >
            View
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<Edit />}
            onClick={() =>
              handleEdit(params.row)
            }
          >
            Edit
          </Button>

        </Stack>
      )
    }
  ];

  return (

    <Box sx={{ p: { xs: 1, md: 3 } }}>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          System Code
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={handleOpenAdd}
        >
          Add System Code
        </Button>

      </Box>

      {/* TABLE */}
      <Paper
        sx={{
          mt: 3,
          borderRadius: 3
        }}
      >

        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />

      </Paper>

      {/* ADD DIALOG */}
      <Dialog
        open={open}
        onClose={handleCloseAdd}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >

        <DialogTitle>
          Add System Code
        </DialogTitle>

        <DialogContent dividers>

          <Stack spacing={3} sx={{ mt: 1 }}>

            <TextField
              label="System Code"
              fullWidth
              value={form.Code}
              onChange={handleChange("Code")}
              sx={fieldSx}
            />

            <TextField
              label="Description"
              fullWidth
              value={form.Description}
              onChange={handleChange("Description")}
              sx={fieldSx}
            />

            <TextField
              label="Order Number"
              type="number"
              fullWidth
              value={form.OrderNo}
              onChange={handleChange("OrderNo")}
              sx={fieldSx}
            />

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button onClick={handleCloseAdd}>
            Close
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleSubmit}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

    {/* VIEW DIALOG */}
<Dialog
  open={detailsDialog}
  onClose={handleCloseDetails}
  fullWidth
  maxWidth="md"
  fullScreen={fullScreen}
>

  <DialogTitle>
    System Code Details
  </DialogTitle>

  <DialogContent dividers>

    {selectedRow && (

      <Stack spacing={3} sx={{ mt: 1 }}>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f8f9fa"
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            System Code
          </Typography>

          <Typography variant="h6">
            {selectedRow.code}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f8f9fa"
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Description
          </Typography>

          <Typography variant="h6">
            {selectedRow.description}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f8f9fa"
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Order Number
          </Typography>

          <Typography variant="h6">
            {selectedRow.orderNo}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f8f9fa"
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Created By
          </Typography>

          <Typography variant="body1">
            {selectedRow.createdById}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f8f9fa"
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Date Created
          </Typography>

          <Typography variant="body1">
            {selectedRow.createdOn
              ? new Date(
                  selectedRow.createdOn
                ).toLocaleString()
              : "-"}
          </Typography>
        </Paper>

      </Stack>
    )}

  </DialogContent>

  <DialogActions>

    <Button onClick={handleCloseDetails}>
      Close
    </Button>

  </DialogActions>

</Dialog>

      {/* UPDATE DIALOG */}
      <Dialog
        open={updateDialog}
        onClose={handleCloseUpdate}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >

        <DialogTitle>
          Update System Code
        </DialogTitle>

        <DialogContent dividers>

          <Stack spacing={3} sx={{ mt: 1 }}>

            <TextField
              label="System Code"
              fullWidth
              value={updateData.code}
              onChange={handleUpdateChange(
                "code"
              )}
              sx={fieldSx}
            />

            <TextField
              label="Description"
              fullWidth
              value={updateData.description}
              onChange={handleUpdateChange(
                "description"
              )}
              sx={fieldSx}
            />

            <TextField
              label="Order Number"
              type="number"
              fullWidth
              value={updateData.orderNo}
              onChange={handleUpdateChange(
                "orderNo"
              )}
              sx={fieldSx}
            />

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button onClick={handleCloseUpdate}>
            Close
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleUpdate}
          >
            Update
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
};

export default SystemCode;