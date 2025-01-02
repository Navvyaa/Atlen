import React, { useState } from 'react';
import {SxProps,TextField} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
interface InputComponentProps {
  label: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  sx?: SxProps; 
  mode?: 'login' | 'register';
}
const InputComponent: React.FC<InputComponentProps> = ({ label, type, placeholder,onChange,required,sx,mode }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused ,setIsFocused] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const currentPath = usePathname();


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onChange(e);
  };


  const validations = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.length >= 6
  };

  const allRequirementsMet = Object.values(validations).every(Boolean);

  return (
    <div className='flex flex-col relative'> 
      <label className="text-lg text-neutral-900 mb-1 font-semibold">{label}</label>
      <TextField
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        variant="outlined"
        fullWidth
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setShowPassword(false); 
        }}
        placeholder={placeholder}
        // onChange={onChange}
        onChange={handlePasswordChange}
        required={required}
        // autoComplete='off'
        // autofill='off'
        inputProps={type === 'password' ? { maxLength: 20 } : {}}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '16px',
            height:'48px',
            fontSize: '20px',
            width:'100%',
            borderColor: !allRequirementsMet && !isFocused ? 'red' : 'inherit',
            position: 'relative',
            // ":hover"outline:'none',
            marginBottom: '10px',
            ...sx,
            ...(type === 'password' && {
              '& input:not(:placeholder-shown)': {
                letterSpacing: showPassword ? 'normal' : '0.4em',
                fontFamily: showPassword ? 'inherit' : 'monospace',
              },
            })
            },
            }}
            />
            {isFocused && type === 'password' && (
        <button
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          className="absolute right-5 top-12 z-10"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {showPassword ? (
            <img src="/eye-open.svg" alt="Hide" style={{ width: '24px', height: '24px' }} />
          ) : (
            <img src="/eye-closed.svg" alt="Show" style={{ width: '24px', height: '24px' }} />
          )}
        </button>
      )}
    {type==="password"  &&  isFocused && !allRequirementsMet &&currentPath !== '/login' && (
        <div className="absolute mt-24 p-3 bg-[#D9E0FA] rounded-xl z-10 w-full text-[16px]">
          <p className="text-black mb-1 ">
            Password must be at least 6 characters long and contain:
          </p>
          <div >
            {[
            { text: 'One uppercase letter', check: validations.uppercase },
              { text: 'One lowercase letter', check: validations.lowercase },
              { text: 'One number', check: validations.number },
              { text: 'One special character (!@#$% etc.)', check: validations.special }
            ].map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                {req.check ? (
                  
                  <img src="./tick.svg" alt="check" />
                ) : (
                  <div className='mr-2.5 ml-0.5 text-lg text-green-800'>•</div>
                )}
                <span className={` ${
                  req.check ? 'text-green-700' : 'text-black'
                }`}>
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