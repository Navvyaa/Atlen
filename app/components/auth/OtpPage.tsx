"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ButtonComponent from '../ui/ButtonComponent';
import OtpInput from '../ui/OtpInput';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';

interface OtpPageProps {
  onVerify: (otp: string) => void;
  onResend: () => void;
  snackbarRef: React.RefObject<SnackbarRef | null>;
  isResendDisabled: boolean;
}

const OtpPage: React.FC<OtpPageProps> = ({ onVerify, onResend,snackbarRef }) => {
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);

  const handleResendOtp = () => {
    onResend();
    
  };

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
    if (otpError) {
      setOtpError(false);
    }
  };
  
  const handleVerifyOtp = () => {
    
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      onVerify(otp); 
    } else {
      setOtpError(true);
      snackbarRef.current?.showSnackbar('Hold on! We need your OTP to proceed.', 'error');
    }
  };
 

  return (
    <div className='flex flex-col items-center w-full '>
      <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
      <Box sx={{ mt: 2, mx: 2, width: '100%', textAlign: 'center', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p className='font-semibold mx-0 px-0 text-2xl text-center mb-4'>Enter the code</p>
        <p className='font-medium text-lg my-6'>Enter the OTP code we have sent to your email.</p>
        <OtpInput length={6} onChange={handleOtpChange} error={otpError} />
        <ButtonComponent onClick={handleVerifyOtp}  sx={{ mt: 3, width: '100%', py: 1.5, fontSize: '20px' }}>
          Verify OTP
        </ButtonComponent>
        <p className='text-neutral-900 my-4 text-lg font-medium'>Didn&apos;t receive the code? <button onClick={handleResendOtp} className='text-primary font-semibold'>Resend OTP</button></p>
      </Box>
    </div>
  );
};



export default OtpPage;