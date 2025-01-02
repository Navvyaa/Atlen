import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { darken } from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SnackbarComponentProps {
  message: string;
  severity: AlertColor;
}
export interface SnackbarRef {
    showSnackbar: (message: string, severity: AlertColor) => void;
    clearSnackbar: () => void;
  }
  

  const SnackbarComponent = forwardRef((props: SnackbarComponentProps, ref: Ref<SnackbarRef>) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');
  
    useImperativeHandle(ref, () => ({
      showSnackbar: (message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
      },
      clearSnackbar: () => {
        setMessage('');
        setOpen(false);
      },
    }));
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const getBorderColor = (severity: AlertColor) => {
      switch (severity) {
        case 'error':
          return darken('#F7E4E4', 0.2); 
        case 'warning':
          return darken('#ff9800', 0.2); 
        case 'info':
          return darken('#2196f3', 0.2); 
        case 'success':
          return darken('#4caf50', 0.2); 
        default:
          return darken('#2196f3', 0.2); 
      }
    };
    const getIcon = (severity: AlertColor) => {
      switch (severity) {
        case 'error':
          return <img src="./cicleCross.svg" alt="" />;
        case 'warning':
          return <WarningIcon />;
        case 'info':
          return <InfoIcon />;
        case 'success':
          return <img src="./circleTick.svg" alt="" />;
        default:
          return <InfoIcon />;
      }
    };
  
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
         onClose={handleClose} 
         severity={severity} 
         icon={getIcon(severity)}
         sx={{
           width: 'auto' ,
           fontFamily:'urbanist',
           fontSize:'16px',
           fontWeight:'medium',
           border: `1px solid ${getBorderColor(severity)}`,
           }}>
          {message}
        </Alert>
      </Snackbar>
    );
  });
  
  export default SnackbarComponent;