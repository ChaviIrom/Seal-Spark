import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function SuccessPopup({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%', direction: 'rtl', fontWeight: 600 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
