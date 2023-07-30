import React from 'react';
import { Alert } from '@mui/material';

function ServerErrorAlert() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
      <Alert severity="error" style={{ width: '100%', margin: 0 }}>
        Server is down. Please try again later.
      </Alert>
    </div>
  );
}

export default ServerErrorAlert;