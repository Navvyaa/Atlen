import React, { useState } from 'react';
import { SxProps, TextField } from '@mui/material';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface InputComponentProps {
  label: string;
  value?: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  sx?: SxProps;
  error?: boolean;
  onInputChange?: () => void;
  showPasswordRequirements?: boolean;
  onClick?: () => void;
  // readonly?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  value,
  type,
  placeholder,
  onChange,
  required,
  sx = {}, 
  error,
  onInputChange,
  showPasswordRequirements = true,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  // const currentPath = usePathname();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'password') {
      setPassword(e.target.value);
    }
    onChange(e);
    if (onInputChange) {
      onInputChange();
    }
  };

  const validations = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.length >= 8,
  };

  const allRequirementsMet = Object.values(validations).every(Boolean);

  return (
    <div className="flex flex-col relative">
      <label className="text-lg text-neutral-900 mb-2 font-semibold leading-7">
        {label}
      </label>
      <TextField
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        variant="outlined"
        fullWidth
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setShowPassword(false);
        }}
        placeholder={placeholder}
        onChange={handleInputChange}
        required={required}
        inputProps={type === 'password' ? { maxLength: 20 } : {maxLength: 50}}
        error={error}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '16px',
            height: '48px',
            fontSize: '16px',
            width: '100%',
            position: 'relative',
            marginBottom: '20px',
            '& fieldset': {
              borderColor: error ? 'red' : 'neutral-900',
            },
            '&:hover fieldset': {
              borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
              borderColor: error ? 'red' : 'neutral-900',
            },
            ...(type === 'password' && {
              '& input:not(:placeholder-shown)': {
                letterSpacing: showPassword ? 'normal' : '0.4em',
                fontFamily: showPassword ? 'inherit' : 'monospace',
              },
            }),
          },
          ...sx, 
        }}
      />
      {isFocused && type === 'password' && (
        <button
          type="button"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          className="absolute right-5 top-12 z-10"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {showPassword ? (
            <Image src="/eye-open.svg" alt="Hide" width={24} height={24} />
          ) : (
            <Image src="/eye-closed.svg" alt="Show" width={24} height={24} />
          )}
        </button>
      )}
      {type === 'password' &&
        isFocused &&
        !allRequirementsMet &&
        showPasswordRequirements &&
        (
          <div className="absolute mt-24 p-2 bg-[#D9E0FA] rounded-xl z-10 w-full text-[14px] leading-5 text-left">
            <p className="text-black">Password must contain:</p>
            <div>
              {[
                { text: 'At least 8 characters', check: validations.length },
                { text: 'One lowercase letter', check: validations.lowercase },
                { text: 'One uppercase letter', check: validations.uppercase },
                { text: 'One number', check: validations.number },
                { text: 'One special character (!@#$% etc.)', check: validations.special },
              ].map((req, index) => (
                <div key={index} className="flex items-center">
                  {req.check ? (
                    <Image src="./tick.svg" className="mr-1" alt="check" width={20} height={20} />
                  ) : (
                    <div className="mr-2.5 ml-0.5 text-lg text-green-800">•</div>
                  )}
                  <span className={`${req.check ? 'text-green-700' : 'text-black'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default InputComponent;
