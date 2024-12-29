import React, { useState } from 'react';
import {SxProps,TextField} from '@mui/material';

// interface CustomInputProps {
//   label: string;
//   type: string;
//   [key: string]: any;
// }
interface InputComponentProps {
  label: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  sx?: SxProps; 
}
const InputComponent: React.FC<InputComponentProps> = ({ label, type, placeholder,onChange,required,sx }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused ,setIsFocused] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className='flex flex-col relative'> 
      <label className="text-md text-neutral-900 mb-1 font-semibold">{label}</label>
      <TextField
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        variant="outlined"
        fullWidth
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setShowPassword(false); // Hide password when input loses focus
        }}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '16px',
            height:'56px',
            width:'100%',
            position: 'relative',
            marginBottom: '10px',
            ...sx,
          },
        }}
      />
      {isFocused && type === 'password' && (
        <button
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          className="absolute right-5 top-11"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {showPassword ? (
            <img src="/eye-open.svg" alt="Hide" style={{ width: '20px', height: '20px' }} />
          ) : (
            <img src="/eye-closed.svg" alt="Show" style={{ width: '20px', height: '20px' }} />
          )}
        </button>
      )}
    
    </div>
  );
};

export default InputComponent;