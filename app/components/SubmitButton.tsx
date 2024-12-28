import React from 'react';
import { Button } from '@mui/material';

interface SubmitButtonProps {
  type: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  children: React.ReactNode;
  sx?: object;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type, fullWidth, variant, children, sx, disabled }) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      sx={sx}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;