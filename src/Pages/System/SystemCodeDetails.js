import { useState, useEffect } from "react";

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
  useMediaQuery,
  MenuItem
} from "@mui/material";

import {
  Visibility,
  Edit
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";

import { useTheme } from "@mui/material/styles";

import {
  GetSystemCodeDetails,
  updateSystemCodeDetail,
  CreateSystemCodeDetail
} from "../../Services/SystemCodeDetailsApi";

import { GetSystemCodes } from "../../Services/SystemCodeApi";

const SystemCodeDetails = () => {

  // =========================================
  // STATES
  // =========================================
  const [detailsRows, setDetailsRows] = useState([]);
  const [systemCodes, setSystemCodes] = useState([]);

  const [open, setOpen] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [form, setForm] = useState({
    Code: "",
    Description: "",
    OrderNo: "",
    SystemCodeId: ""
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    code: "",
    description: "",
    orderNo: "",
    systemCodeId:""
  });

  // =========================================
  // THEME
  // =========================================
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // =========================================
  // FETCH DATA
  // =========================================
  useEffect(() => {
    fetchSystemCodeDetails();
    fetchSystemCodes();
  }, []);

  const fetchSystemCodeDetails = async () => {
    try {
      const data = await GetSystemCodeDetails();
console.log(data);
      const formatted = data.map((item, index) => ({
        id: item.id || index + 1,
        ...item
      }));

      setDetailsRows(formatted);

    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const fetchSystemCodes = async () => {
    try {
      const data = await GetSystemCodes();
      setSystemCodes(data);

    } catch (error) {
      console.error("Error fetching system codes:", error);
    }
  };

  // =========================================
  // HANDLE CHANGE
  // =========================================
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleUpdateChange = (field) => (e) => {
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
        code: form.Code,
        Description: form.Description,
        SystemCodeId: Number(form.SystemCodeId),
        OrderNo: Number(form.OrderNo)
      };
      console.log(payload);
      await CreateSystemCodeDetail(payload);

      setForm({
        code: "",
        Description: "",
        OrderNo: "",
        SystemCodeId: ""
      });

      setOpen(false);
      fetchSystemCodeDetails();

    } catch (error) {
      console.error(error);
      alert(error?.response?.data || "Error saving");
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

      await updateSystemCodeDetail(payload);

      setUpdateDialog(false);
      fetchSystemCodeDetails();

    } catch (error) {
      console.error(error);
    }
  };

  // =========================================
  // DIALOGS
  // =========================================
  const handleOpenAdd = () => setOpen(true);
  const handleCloseAdd = () => setOpen(false);

  const handleCloseDetails = () => setDetailsDialog(false);
  const handleCloseUpdate = () => setUpdateDialog(false);

  const handleView = (row) => {
    setSelectedRow(row);
    setDetailsDialog(true);
  };

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
  // STYLE
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
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "code", headerName: "System Code", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "systemCodeId", headerName:"SystemCodeId",flex:1},
    { field: "orderNo", headerName: "Order No", flex: 0.5 },
    { field: "createdBy",headerName: "Created By",flex: 1,
      valueGetter: (_, row) => {
        const user = row?.createdUser;
        if (!user) return "";
        return `${user.firstName || ""} ${user.lastName || ""}`;
      }
    },
    { field: "createdOn", headerName:"Created On",flex:1},
    { field: "modifiedUserId", headerName:"Modified By",flex:1 ,
       valueGetter: (_, row) => {
        const user = row?.modifiedUser;
        if (!user) return "";
          return `${user.firstName || ""} ${user.lastName || ""}`;
        }
      },
    { field: "modifiedOn", headerName:"Modified On",flex:1},

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>

          <Button
            size="small"
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => handleView(params.row)}
          >
            View
          </Button>

          <Button
            size="small"
            variant="contained"
            startIcon={<Edit />}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>

        </Stack>
      )
    }
  ];

  // =========================================
  // UI
  // =========================================
  return (
    <Box sx={{ p: 3 }}>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2
        }}
      >
        <Typography variant="h4">
          System Code Details
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={handleOpenAdd}
        >
          Add Detail
        </Button>
      </Box>

      {/* TABLE */}
      <Paper>
        <DataGrid
          rows={detailsRows}
          columns={columns}
          autoHeight
        />
      </Paper>

      {/* ADD DIALOG */}
      <Dialog
        open={open}
        onClose={handleCloseAdd}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add System Code Detail</DialogTitle>

        <DialogContent>

          <Stack spacing={2} mt={2}>

            <TextField
              label="Code"
              value={form.Code}
              onChange={handleChange("Code")}
              fullWidth
            />

            <TextField
              label="Description"
              value={form.Description}
              onChange={handleChange("Description")}
              fullWidth
            />

            {/* DROPDOWN FROM SYSTEM CODES */}
            <TextField
              select
              label="System Code"
              value={form.SystemCodeId}
              onChange={handleChange("SystemCodeId")}
              fullWidth
            >
              {systemCodes.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.code}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Order No"
              type="number"
              value={form.OrderNo}
              onChange={handleChange("OrderNo")}
              fullWidth
            />

          </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseAdd}>Close</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>

      </Dialog>

      {/* VIEW DIALOG */}
      <Dialog
        open={detailsDialog}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Details</DialogTitle>

        <DialogContent>
          {selectedRow && (
            <Stack spacing={2} mt={2}>
              <Typography>Code: {selectedRow.code}</Typography>
              <Typography>Description: {selectedRow.description}</Typography>
              <Typography>Order No: {selectedRow.orderNo}</Typography>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>

      </Dialog>

      {/* UPDATE DIALOG */}
      <Dialog
        open={updateDialog}
        onClose={handleCloseUpdate}
        fullWidth
        maxWidth="md"
      >

        <DialogTitle>Update Detail</DialogTitle>

        <DialogContent>

          <Stack spacing={2} mt={2}>

            <TextField
              label="Code"
              value={updateData.code}
              onChange={handleUpdateChange("code")}
              fullWidth
            />

            <TextField
              label="Description"
              value={updateData.description}
              onChange={handleUpdateChange("description")}
              fullWidth
            />

            <TextField
              label="Order No"
              type="number"
              value={updateData.orderNo}
              onChange={handleUpdateChange("orderNo")}
              fullWidth
            />

          </Stack>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseUpdate}>Close</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>

      </Dialog>

    </Box>
  );
};

export default SystemCodeDetails;