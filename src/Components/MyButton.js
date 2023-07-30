import React from 'react';
import { Button } from '@mui/material';
import './MyButton.css';


  function PrimaryButton({ name, size, onClick, style }) {
    return (
      <div style={style}>
        <Button variant="contained" size={size} color="primary" onClick={onClick}>
          {name}
        </Button>
      </div>
    );
  }
  
  function SecondaryButton({ name, size, onClick, style }) {
    return (
      <div style={style}>
        <Button variant="contained" size={size} color="secondary" onClick={onClick}>
          {name}
        </Button>
      </div>
    );
  }
  
  export { PrimaryButton, SecondaryButton };