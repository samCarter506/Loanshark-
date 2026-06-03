import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';

import { GetAudits } from '../Services/UserAudit';

export default function Audit() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAudits();
  }, []);

  const loadAudits = async () => {
    try {
      setLoading(true);

      const response = await GetAudits();

      // Handle API response safely
      const data = response?.data || response || [];

      setAudits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load audit records.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'transactionType',
      headerName: 'Transaction Type',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'transactionData',
      headerName: 'Transaction Data',
      flex: 2,
      minWidth: 300,
      renderCell: (params) => (
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            display: 'block',
          }}
        >
          {params?.value || ''}
        </span>
      ),
    },
    {
      field: 'transactionDate',
      headerName: 'Transaction Date',
      flex: 1,
      minWidth: 220,
      valueFormatter: (value) => {
        if (!value) return '';

        return new Date(value).toLocaleString();
      },
    },
    {
      field: 'createdById',
      headerName: 'Created By',
      flex: 1,
      minWidth: 220,
      valueGetter: (value, row) => {
        if (!row) return 'N/A';

        const firstName = row?.createdUser?.firstName || '';
        const lastName = row?.createdUser?.lastName || '';

        const fullName = `${firstName} ${lastName}`.trim();

        return fullName || row?.createdById || 'N/A';
      },
    },
    {
      field: 'modifiedById',
      headerName: 'Modified By',
      flex: 1,
      minWidth: 220,
      valueGetter: (value, row) => {
        if (!row) return 'N/A';

        const firstName = row?.modifiedUser?.firstName || '';
        const lastName = row?.modifiedUser?.lastName || '';

        const fullName = `${firstName} ${lastName}`.trim();

        return fullName || row?.modifiedById || 'N/A';
      },
    },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        User Audit Logs
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={audits}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
          }} 
        />
      </Paper>
    </Box>
  );
}