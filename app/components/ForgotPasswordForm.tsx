"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import InputComponent from './InputComponent';
import { useRouter } from 'next/navigation';
import { useModal } from '../context/ModalContext';
import ButtonComponent from './ButtonComponent';
import BackButton from './BackButton';
import OtpPage from './OtpPage';
import ModalComponent from './ModalComponent';
import SnackbarComponent, { SnackbarRef } from './SnackbarComponent';


const ForgotPasswordForm: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState<number>(1);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const snackbarRef = useRef<SnackbarRef>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();

  useEffect(() => {
    openModal();
  }, []);

  const handleCloseModal = () => {
   
      closeModal();
      router.push('/');
    
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!email) {
        setEmailError(true);
        snackbarRef.current?.showSnackbar('Enter a valid Email', 'error');
        return;
      }
      if (!emailRegex.test(email)) {
        setEmailError(true);
        snackbarRef.current?.showSnackbar('Invalid Email', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // if(!otp){
      //   snackbarRef.current?.showSnackbar('Hold on! We need your OTP to proceed.', 'error');
      //   return;
      // }
      setStep(3);
    } else if (step === 3) {
      if (!newPassword.trim() || !confirmPassword.trim()) {
        setPasswordError(true);
        snackbarRef.current?.showSnackbar('Please enter the passwords to proceed', 'error');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError(true);
        snackbarRef.current?.showSnackbar('Passwords do not match', 'error');
        return;
      }
      snackbarRef.current?.showSnackbar('Password reset successfully', 'success');
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }
  }

  const handleVerifyOtp = (otp: string) => {
    console.log('OTP Verified:', otp);
    setStep(3);
  };

  const handleResendOtp = () => {
    console.log('Resend OTP');
    // snackbarRef.current?.showSnackbar('OTP resent ! Check Your Inbox', 'warning');

  };

  return (
    <div className={isModalOpen ? 'blur-background' : ''}>
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>

        {step === 1 ? <BackButton /> : step === 2 ? <BackButton onBack={() => setStep(1)} /> : null}

        <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />

        {step != 2 && (<>
          <p className='font-semibold mx-0 px-0 text-2xl text-center mb-4'>
            {step === 1 && 'Forgot Your Password?'}
            {step === 3 && 'Reset Password'}
          </p>
        </>
        )}
        {step === 1 && (
          <>
            <p className='text-center mt-3 mb-8 font-medium text-md w-full text-black'>No problem, traveler! Provide your email, and we’ll send an OTP to reset your password instantly.</p>
            <div className='w-full'>
              <InputComponent
                label="Email address"
                type="text"
                error={emailError}
                onInputChange={() => setEmailError(false)}
                sx={{ mb: 2, py: 3, width: '100%' }}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>

            <div className='w-full '>
            {/* <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} /> */}
              <InputComponent
                label="New Password"
                type="password"
                error={passwordError}
                onInputChange={() => setPasswordError(false)}
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputComponent
                label="Confirm Password"
                type="password"
                error={passwordError}
                onInputChange={() => setPasswordError(false)}
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}

              />
            </div>
          </>
        )}

        {step !== 2 && (
          <ButtonComponent onClick={handleNextStep} sx={{ my: 3, width: '100%', py: 1.5, fontSize: '20px' }}>
            {step === 1 && 'Send OTP'}
            {step === 3 && 'Done'}
          </ButtonComponent>
        )}

        {step === 2 && (
          <>

            <OtpPage onVerify={handleVerifyOtp} onResend={handleResendOtp} />
          </>
        )}
      </ModalComponent>
    </div>
  );
};

export default ForgotPasswordForm;