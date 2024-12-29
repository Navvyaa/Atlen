"use client"
import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  Modal,
  IconButton
} from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import ButtonComponent from './ButtonComponent';
import { BackButton } from './BackButton';
import Image from 'next/image';
import InputComponent from './InputComponent';

// interface AuthFormProps {
//   onClose?: () => void;
// }
interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <>
      {/* <Modal

    > */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
        <BackButton />

        {/* <Divider sx={{ my: 2, color: 'gray' }}>OR</Divider> */}
        {mode === 'register' && (
          <>
            <InputComponent
              label="First Name"
              type="text"
              placeholder="First Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              required
            />
            <InputComponent
              label="Last Name"
              type="text"
              placeholder="Last Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              required
            />
          </>
        )}
        <InputComponent
          label="Email address"
          type="text"
          placeholder="Email"
          sx={{ mb: 2,py:3}}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          // required
        />

        <InputComponent
          label="Password"
          type="password"
          placeholder="Password"
          sx={{ mb: 2,py:3 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          // required
        />
        {mode === 'login' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
            <button
              className='text-black font-medium text-sm cursor-pointer mb-4 '
            >
              Forgot password?
            </button>
          </Box>
        )}

        <ButtonComponent type="submit" sx={{ mb: 1 ,width: '100%',py:1.5, fontSize: '20px' }}>
          {mode === 'login' ? 'Sign In' : 'Join'}
        </ButtonComponent>
        {/* {mode === 'login' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Typography
              variant="body2"
              color="#000000"
              sx={{ cursor: 'pointer', mt: 1 }}
            >
              Don't have an account? Register
            </Typography>
          </Box>
        )} */}


      </Box>
      {/* </Modal> */}
    </>
  );
};

export default AuthForm;