"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import ButtonComponent from '../ui/ButtonComponent';
import InputComponent from '../ui/InputComponent';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import ModalComponent from '../ui/ModalComponent';
import { useRouter } from 'next/navigation';
import BackButton from '../ui/BackButton';
import Link from 'next/link';
import { checkEmail } from '../../api/apiClient';
import Image from 'next/image';
import { signIn } from "next-auth/react";
// import axios from 'axios';


interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  step: number;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
 

  const [email, setEmail] = useState<string>('');
   const [emailError, setEmailError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const snackbarRef = useRef<SnackbarRef>(null);
  const router = useRouter();
  useEffect(() => {
    if (open) {
      setStep(1);
      setEmailError(false);
    }
  }, [open]);

  const handleEmailLoginClick = () => {
    setStep(2); 
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleContinueWithEmail = async () => {
    if (!email) {
      setEmailError(true);
      snackbarRef.current?.showSnackbar('Please enter a Email', 'error');
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(true);
      snackbarRef.current?.showSnackbar('Invalid Email', 'error');
      return;
    }
    setEmailError(false);
    
    try {
      const data = await checkEmail(email);
      const { is_registered, is_verified } = data.data;

      if (!is_registered && !is_verified) {
        router.push(`/register?email=${encodeURIComponent(email)}`);
      }  else if (is_registered && is_verified) {
        router.push(`/login?email=${encodeURIComponent(email)}`);
      }
      onClose();
     
    } catch (error) {
      if (error instanceof Error) {
        snackbarRef.current?.showSnackbar(error.message, 'error');
      } else {
        snackbarRef.current?.showSnackbar('An unknown error occurred', 'error');
      }
    }
  };
// const [isLoading, setIsLoading] = useState<boolean>(false);

const handleGoogleSignIn = async () => {
  await signIn("google"); // Initiates Google OAuth flow
};

  if (!open) return null;
  return (
    <>
      {step === 1 && (
        <ModalComponent isOpen={open} onClose={onClose}>
          <Box sx={{ mt: 0, mx: 2, width: '100%' }}>

            <p className='font-semibold text-2xl text-center mb-16'>
              Sign In to unlock the best of Atlen
            </p>
            <ButtonComponent sx={{
              fontSize: "18px", mt: 0, mb: 2, p: 1, width: '100%', color: "#3d3d3d", backgroundColor: 'white', border: '1px solid gray', '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }} onClick={handleGoogleSignIn}>

              <Image src="./google-icon.svg" className='px-2' width={45} height={45} alt="" />
              Continue with Google

            </ButtonComponent>

            <ButtonComponent sx={{
              fontSize: "18px", mt: 0, mb: 6, p: 1, width: '100%', color: "#3d3d3d", backgroundColor: 'white', border: '1px solid gray', '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }} onClick={handleEmailLoginClick}>
              <div className='flex justify-center gap-3 mr-7 w-full'>
                <Image src="./mail.svg" width={40} height={40} className='px-2' alt="" />
                Continue with Mail
              </div>
            </ButtonComponent>

            <p className='text-neutral-900 text-[14px] text-center '>
              By proceeding, you agree to our <Link href=""><span className='underline font-semibold'>Terms of Use</span></Link> and <Link href=''><span className='underline font-semibold'> Privacy Policy</span></Link>.
            </p>
          </Box>
        </ModalComponent>
      )}
      {step === 2 && (
        <ModalComponent isOpen={open} onClose={onClose}>
          <BackButton onBack={() => setStep(1)} />
          <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
          <Box sx={{ mt: 2, mx: 2, width: '100%' }}>
            <p className='font-semibold text-2xl text-center mb-5'>
              Plan.Explore.Travel.
            </p>

            <InputComponent
              label="Email address"
              type="text"
              placeholder="Email"
              error={emailError}
              onInputChange={() => setEmailError(false)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <ButtonComponent onClick={handleContinueWithEmail} sx={{ mb: 7, mt: 2, width: '100%', py: 1.5, fontSize: '20px' }}>
              Continue
            </ButtonComponent>
            <p className='text-neutral-900 text-[14px] text-center '>
              By proceeding, you agree to our <Link href=""><span className='underline font-semibold'>Terms of Use</span></Link> and <Link href=''><span className='underline font-semibold'> Privacy Policy</span></Link>.
            </p>
          
          </Box>
        </ModalComponent>
      )}

    </>
  );
};

export default LoginModal;