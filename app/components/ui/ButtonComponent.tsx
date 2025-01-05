import React from 'react';
import { Button, SxProps } from '@mui/material';

interface ButtonComponentProps {
  children: React.ReactNode;
  onClick?: (event: React.FormEvent) => void;
  disabled?: boolean;
  sx?: SxProps;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ children, onClick, disabled, sx, type = 'button' }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={type}
      variant="contained"
      sx={{
        color: 'white',
        backgroundColor: 'var(--primary-color)',
        borderRadius: '16px',
        paddingX: '20px',
        paddingY: '0px',
        height: '56px',
        fontSize: '16px',
        fontWeight: '600', 
        minWidth: 'auto',
        fontFamily: 'Urbanist, Arial, Helvetica, sans-serif',
        textTransform: 'none', 
        '&:hover': {
          backgroundColor: 'var(--primary-color-hover)',
        },
        ...sx, 
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;