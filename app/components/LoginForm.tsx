"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Box, Divider, Modal } from '@mui/material';
import ButtonComponent from './ButtonComponent';
import { BackButton } from './BackButton';
import InputComponent from './InputComponent';
import SnackbarComponent, { SnackbarRef } from './SnackbarComponent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const snackbarRef = useRef<SnackbarRef>(null);
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      snackbarRef.current?.showSnackbar('Enter all fields', 'error');
      return;
    }
    if (!emailRegex.test(email)) {
      snackbarRef.current?.showSnackbar('Invalid Email', 'error');
      return;
    }
    if (!pwdRegex.test(password)) {
      snackbarRef.current?.showSnackbar('Invalid Password', 'error');
      return;
    }
    // Handle login logic
    console.log('Login');
    snackbarRef.current?.showSnackbar('Login successful', 'success');
    handleCloseModal();
  };

  return (
    <>
      
      <div className={isModalOpen ? 'blur-background' : ''}>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="login-modal"
        aria-describedby="Enter email and password to login"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 530,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 4,
            // px:2,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
          <BackButton />
          <div className='flex flex-col items-center mb-5'>
            <img src="./logo.svg" alt="logo" className='mb-6' />
            <div className='font-semibold mx-0 px-0 w-[100%] text-2xl text-center mb-2'>
              Plan. Explore. Travel.
            </div>
          </div>
          <InputComponent
            label="Email address"
            type="text"
            placeholder="Email"
            sx={{ mb: 2, py: 3 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <InputComponent
            label="Password"
            type="password"
            placeholder="Password"
            sx={{ mb: 2, py: 3 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Link href="/forgot-password">
              <button className='text-black font-medium text-md cursor-pointer mb-4'>
                Forgot password?
              </button>
            </Link>
          </Box>
          <ButtonComponent type="submit" sx={{ mb: 1, width: '100%', py: 1.5, fontSize: '20px' }}>
            Sign In
          </ButtonComponent>
          <Divider sx={{ mt: 2, color: '#3d3d3d', fontFamily: 'urbanist', fontSize: 'text-md', width: '94%' }}>Not a Member?</Divider>
          <p className='mt-1 text-md text-neutral-900 text-center'>
            <Link href="/register">
              <button className='underline font-semibold cursor-pointer'>Join</button>
            </Link> Trippin for effortless travel planning!
          </p>
          <p className="mt-8 w-full mb-0 text-md text-neutral-900 text-center font-regular">
            By proceeding, you agree to our Terms of Use and Privacy Policy.
          </p>
        </Box>
        </Box>
          </Modal>
        </div>

    </>
  );
};

export default LoginForm;
