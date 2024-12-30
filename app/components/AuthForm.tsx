"use client"
import React, { useRef, useState } from 'react';
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
// import { Router } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router=useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
        <BackButton />

        {mode === 'register' && (
          <>
          <div className='flex flex-row gap-5'>
            <InputComponent
              label="First Name"
              type="text"
              placeholder="First Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}

            />
            <InputComponent
              label="Last Name"
              type="text"
              placeholder="Last Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              sx={{ mb: 2,py:3}}
            />
            </div>
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
        {mode==='register'&& (
          <InputComponent
          label="Confirm Password"
          type="password"
          placeholder="Password"
          sx={{ mb: 2,py:3 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          // required
        />
        )}
        {mode === 'login' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
            <button
            onClick={() => router.push('/forgot-password')}
              className='text-black font-medium text-md cursor-pointer mb-4 '
            >
              Forgot password?
            </button>
          </Box>
        )}

        <ButtonComponent type="submit" sx={{ mb: 1, width: '100%', py: 1.5, fontSize: '20px', mt: mode === 'register' ? 3 : 0 }}>
          {mode === 'login' ? 'Sign In' : 'Join'}
        </ButtonComponent>
      </Box>
    </>
  );
};

export default AuthForm;