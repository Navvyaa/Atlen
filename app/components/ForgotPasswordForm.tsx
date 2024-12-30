"use client";
import React, { useState, useEffect } from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import InputComponent from './InputComponent';
import { useRouter } from 'next/navigation';
import { useModal } from '../context/ModalContext';
import ButtonComponent from './ButtonComponent';
import { BackButton } from './BackButton';
import OtpInput from './OtpInput';

const ForgotPasswordForm: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState<number>(1); 
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    openModal(); 
  }, [openModal]);

  const handleCloseModal = () => {
    closeModal();
    router.push('/'); 
  };

  const handleNextStep = () => {
    if (step === 1 && email) {

      setStep(2);
    } else if (step === 2 && otp) {

      setStep(3);
    } else if (step === 3 && newPassword === confirmPassword) {

      alert('Password reset successfully');
      handleCloseModal();
    }
  };

  return (
    <div className={isModalOpen ? 'blur-background' : ''}>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="forgot-password-modal-title"
        aria-describedby="forgot-password-modal-description"
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
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BackButton />
          <img src="./logo.svg" alt="" className='mb-8' />
          <p className='font-semibold mx-0 px-0 text-2xl text-center mb-4'>
            {step === 1 && 'Forgot Your Password?'}
            {step === 2 && 'Enter the Code'}
            {step === 3 && 'Reset Password'}
          </p>
          {step === 1 && (
            <>
              <p className='text-center mt-3 mb-8 font-medium text-lg w-full text-black'>No problem, traveler! Provide your email, and we’ll send an OTP to reset your password instantly.</p>
              <div className='w-full'>
                <InputComponent
                  label="Email address"
                  type="text"
                  sx={{ mb: 2, py: 3, width: '100%' }}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className='text-center mt-3 mb-8 font-medium text-lg w-full text-black'>Enter the OTP code we have sent to your email.</p>
              <OtpInput length={6} onChange={setOtp} />
            </>
          )}
          {step === 3 && (
            <>
              <div className='w-full mt-5'>
                <InputComponent
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <InputComponent
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
            <ButtonComponent 
            type="submit" 
            onClick={handleNextStep} 
            sx={{ my: 3, width: '100%', py: 1.5, fontSize: '20px', ...(step === 3 && { my: 5 }) }}
            >
            {step === 1 && 'Send OTP'}
            {step === 2 && 'Verify'}
            {step === 3 && 'Done'}
            </ButtonComponent>
          {step === 2 && (
            <p className='text-neutral-900 text-lg font-medium'>Didn't Recieve the code ? <button className='text-primary font-semibold'>Resend OTP</button></p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPasswordForm;