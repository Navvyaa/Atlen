"use client";
import React, { useState, useRef,useEffect } from 'react';
import { Box } from '@mui/material';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import SnackbarComponent, { SnackbarRef } from './SnackbarComponent';
import ModalComponent from './ModalComponent';
import { useRouter } from 'next/navigation';
import BackButton  from './BackButton';
import Link from 'next/link';
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  step: number;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // 1: Initial, 2: Email
  const snackbarRef = useRef<SnackbarRef>(null);
  const router = useRouter();
  useEffect(() => {
    if (open) {
      setStep(1);
      setEmailError(false) ;// Reset step to 1 when modal is opened
    }
  }, [open]);

  const handleEmailLoginClick = () => {
    setStep(2); // Move to email step
  };

  const  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleContinueWithEmail = () => {
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
    // Check if email is registered
    const isRegistered = checkIfEmailIsRegistered(email);
    if (!isRegistered) {
      router.push('/login'); 
      onClose();// Redirect to login form
    } else {
      router.push('/register');
      onClose(); // Redirect to registration form
    }
  };

  const checkIfEmailIsRegistered = (email: string) => {
    // Mock function to check if email is registered
    // Replace with actual API call
    return email === 'registered@example.com';
  };

  const handleGoogleLogin = () => {
    // Handle OAuth login with Google
    console.log('Google OAuth login');
    // Redirect to dashboard or handle login logic
    router.push('/dashboard');
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
            fontSize:"18px",mt: 0, mb: 2, p: 1, width: '100%', color: "#3d3d3d", backgroundColor: 'white', border: '1px solid gray', '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }} onClick={handleGoogleLogin}>
        
            <img src="./google-icon.svg" className='px-2' alt="" />
            Continue with Google
           
          </ButtonComponent>

          <ButtonComponent sx={{
             fontSize:"18px", mt: 0, mb: 6, p: 1, width: '100%', color: "#3d3d3d", backgroundColor: 'white', border: '1px solid gray', '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
            }} onClick={handleEmailLoginClick}>
              <div className='flex justify-center gap-3 mr-7 w-full'>
            <img src="./mail.svg" className='px-2' alt="" />
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
                <BackButton onBack={() => setStep(1) }/>
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
          <ButtonComponent onClick={handleContinueWithEmail} sx={{ mb: 7,mt:2, width: '100%', py: 1.5, fontSize: '20px' }}>
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