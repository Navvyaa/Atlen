"use client";
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ButtonComponent from './ButtonComponent';
import OtpInput from './OtpInput';
import { BackButton } from './BackButton';

interface OtpPageProps {
  onVerify: (otp: string) => void;
  onResend: () => void;
}

const OtpPage: React.FC<OtpPageProps> = ({ onVerify, onResend }) => {
  const [otp, setOtp] = useState<string>('');

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onVerify(otp);
    } else {
      // Handle invalid OTP case
      console.log('Invalid OTP');
    }
  };

  return (
    <div className='flex flex-col items-center w-full '>
      <BackButton />
        <img src="./logo.svg" alt="logo" className='my-4 text-center' />
    <Box sx={{ mt: 2, mx: 2, width: '100%', textAlign: 'center',flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
      <p className='font-semibold mx-0 px-0 text-2xl text-center mb-4'>Enter the code</p>
      <p  className='font-medium text-lg my-6'>Enter the OTP code we have sent to your email.</p>
      <OtpInput length={6} onChange={setOtp} />
      <ButtonComponent onClick={handleVerifyOtp} sx={{ mt: 3, width: '100%', py: 1.5, fontSize: '20px' }}>
        Verify OTP
      </ButtonComponent>
      <p className='text-neutral-900 my-4 text-lg font-medium'>Didn't receive the code? <button onClick={onResend} className='text-primary font-semibold'>Resend OTP</button></p>
    </Box>
    </div>
  );
};

export default OtpPage;