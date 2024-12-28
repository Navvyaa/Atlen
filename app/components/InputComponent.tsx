import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface CustomInputProps {
  label: string;
  type: string;
  [key: string]: any;
}

const InputComponent: React.FC<CustomInputProps> = ({ label, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='flex flex-col'> 
    <div className="flex items-center justify-between mx-1">
      <label className="text-sm text-gray-500 mb-1">{label}</label>
      {type === 'password' && (
        <div className="flex items-center">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            size="small"
          >
            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          <span className="text-sm text-gray-500 ml-1">{showPassword ? 'Hide' : 'Show'}</span>
          </IconButton>
        </div>
      )}
      </div>
      <TextField
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '12px',
            height:'40px',
            marginBottom: '10px'
          },
        }}
        {...props}
      />
    
    </div>
  );
};

export default InputComponent;