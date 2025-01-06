import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { darken } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
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
          return darken('#ff9800', 0.2); 
        case 'success':
          return darken('#4caf50', 0.2); 
        default:
          return darken('#2196f3', 0.2); 
      }
    };
    const getIcon = (severity: AlertColor) => {
      switch (severity) {
        case 'error':
          return <Image src="./cicleCross.svg" alt="" width={30} height={30}/>;
        case 'warning':
          return <InfoIcon />;
        case 'info':
          return <WarningIcon />;
        case 'success':
          return <Image src="./circleTick.svg" alt="" width={30} height={30} />;
        default:
          return <InfoIcon />;
      }
    };
  
    return (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
         onClose={handleClose} 
         severity={severity} 
        //  action={null}
         icon={getIcon(severity)}
         sx={{
           width: '345px' ,
           maxWidth:'100%',
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
  
  SnackbarComponent.displayName = 'SnackbarComponent';

  export default SnackbarComponent;