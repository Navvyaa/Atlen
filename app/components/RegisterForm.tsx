"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Modal, Typography } from '@mui/material';
import ButtonComponent from './ButtonComponent';
import { BackButton } from './BackButton';
import InputComponent from './InputComponent';
import { useRouter } from 'next/navigation';
import SnackbarComponent, { SnackbarRef } from './SnackbarComponent';
import OtpPage from './OtpPage';


const RegisterForm: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 1: Form, 2: OTP Verification
  // const [otp, setOtp] = useState<string>('');

  const router = useRouter();
  const snackbarRef = useRef<SnackbarRef>(null);
  // const { openModal } = useModal();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  useEffect(() => {
    // openModal();
    snackbarRef.current?.clearSnackbar();
  }, []);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      snackbarRef.current?.showSnackbar('Enter all fields.', 'error');
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
    if(password !== confirmPassword){
      snackbarRef.current?.showSnackbar('Passwords do not match.', 'error');
      return;
    }
    // Handle registration logic
    console.log('Register');
    snackbarRef.current?.showSnackbar('Registration successful. Please verify your email.', 'success');
    setStep(2); // Move to OTP verification step
  };

  const handleVerifyOtp = (otp: string) => {
    // Handle OTP verification logic
    console.log('OTP Verified:', otp);
    snackbarRef.current?.showSnackbar('Email verified successfully', 'success');
    router.push('/'); // Redirect to home page or login page
  };

  const handleResendOtp = () => {
    // Handle resend OTP logic
    console.log('Resend OTP');
    snackbarRef.current?.showSnackbar('OTP resent successfully', 'info');
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/'); // Redirect to home page
  };

  return (
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
            // maxHeight: 700,
            // overflowY: 'scroll',
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            px: 4,
            py:0,
            // px:2,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
      <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
      {step === 1 && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
          <BackButton />
          <div className='flex flex-col items-center mb-2'>
        <img src="./logo.svg" alt="logo"  className='mb-6'/>
        <div className='font-semibold mx-0 px-0 w-[100%] text-2xl text-center mb-2'>
           Ready to Explore? Join Trippin Today
          </div>
          </div>
          <div className='flex flex-row gap-5'>
            <InputComponent
              label="First Name"
              type="text"
              placeholder="First Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              sx={{ borderColor: !firstName ? 'red' : undefined }}
            />
            <InputComponent
              label="Last Name"
              type="text"
              placeholder="Last Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              sx={{ mb: 2, py: 3 }}
            />
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
            mode="register"
          />
          <InputComponent
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            sx={{ mb: 2, py: 3 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            mode="register"
          />
          <ButtonComponent type="submit" sx={{ mb: 1, width: '100%', py: 1.5, fontSize: '20px', mt: 3 }}>
            Join
          </ButtonComponent>
          <Divider sx={{ mt: 2, color: '#3d3d3d', fontFamily: 'urbanist', fontSize: 'text-md', width: '94%' }}>Already a Member?</Divider>
              <p className='mt-1 text-md text-neutral-900 text-center'>
                <button onClick={() => router.push('/login')} className='underline font-semibold'>Login</button> using your Trippin account.
              </p>
              <p className="mt-5 w-full mb-2 text-md text-neutral-900 text-center font-regular">
            By proceeding, you agree to our Terms of Use and Privacy Policy.
          </p>
        </Box>
      )}
      {step === 2 && (
        <OtpPage onVerify={handleVerifyOtp} onResend={handleResendOtp} />
      )}
      </Box>
      </Modal>

    </div>

  );
};

export default RegisterForm;