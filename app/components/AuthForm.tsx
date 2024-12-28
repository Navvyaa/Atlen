"use client"
import React, { useState } from 'react';
import { 
  Box,
  Button,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import InputComponent from './InputComponent';

// interface AuthFormProps {
//   onClose?: () => void;
// }

const AuthForm: React.FC= () => {
  const [email,setEmail]=useState<string>("");
  const [password, setPassword] = useState<string>("");

  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 ,mx:2}}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <Image 
              src="/google-icon.svg" 
              alt="Google" 
              width={20} 
              height={20}
            />
          }
          sx={{ mb:2 ,py:1 , borderRadius: '32px' }}
        >
          Log in with Google
        </Button>

        <Divider sx={{ my: 2, color: 'gray' }}>OR</Divider>

        <InputComponent
          label="Your email"
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />

        <InputComponent
          label="Your password"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer',mt:1 }}
          >
            Forgot password?
          </Typography>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            mb: 2,
            borderRadius: '40px',
            // borderRadius: '8px',
            py: 1,
            backgroundColor: 'blue-600',
            opacity: (!email || !password )? 0.8 : 1,
            '&:hover': {
              backgroundColor: 'blue-700'
            }
          }}
          disabled={!email || !password}
        >
          Log in
        </Button>

        
      </Box>
      </>
  );
};

export default AuthForm;