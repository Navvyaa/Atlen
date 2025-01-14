"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ButtonComponent from '../ui/ButtonComponent';
import InputComponent from '../ui/InputComponent';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import ModalComponent from '../ui/ModalComponent';
import { useRouter } from 'next/navigation';
import BackButton from '../ui/BackButton';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Loading from '../ui/Loading';
import { checkEmail } from '@/app/features/auth/slices/authThunk';
import { AppDispatch } from '@/app/store/store';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { sendGoogleOAuthTokenToBackend } from '../../features/auth/slices/authThunk';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  step: number;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

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
  const [loading, setLoading] = useState<boolean>(false);
  const handleContinueWithEmail = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError(true);
      snackbarRef.current?.showSnackbar('Please enter a Email', 'error');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError(true);
      snackbarRef.current?.showSnackbar('Invalid Email', 'error');
      return;
    }
    setEmailError(false);
    setEmail(trimmedEmail);
    setLoading(true);
    try {
      const response = await dispatch(checkEmail({ email:trimmedEmail })).unwrap();
      // if(error.message ==='ERR_INTERNET_DISCONNECTED'){
      //   snackbarRef.current?.showSnackbar('Please check your internet connection', 'error');
      //   return;
      // }

      if (!response.data.is_registered) {
        router.push(`/register`);
      } else if (response.data.is_registered && response.data.is_verified) {
        router.push(`/login`);
      }
      onClose();
    } catch (error: any) {
      if (error.code === 'ERR_INTERNET_DISCONNECTED' || error.message?.includes('network')) {
        snackbarRef.current?.showSnackbar('Please check your internet connection', 'error');
      }
      else {
        snackbarRef.current?.showSnackbar(error.message || 'An unknown error occurred', 'error');
      }
    } finally {
      setLoading(false);
    }
  };
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  //handling google login
  const handleGoogleLogin = useGoogleLogin({
    // onSuccess: (tokenResponse) => handleGoogleSuccess(tokenResponse),
    onSuccess: (tokenResponse) => {
      setIsGoogleLoading(true); // Set loading when returning from Google
      handleGoogleSuccess(tokenResponse);
    },
    flow: 'implicit',
    onError: () => {
      setIsGoogleLoading(false);
      console.error('Login Failed');
    },
    // onError: () => console.error('Login Failed'),

  });
  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.access_token; // Google OAuth token
    if (!token) {
      snackbarRef.current?.showSnackbar('Google authentication failed! ', 'error');
      return;
    }

    try {
      // Send the token to the backend
      const response = await dispatch(sendGoogleOAuthTokenToBackend(token)).unwrap();

      if (response?.access_token) {
        Cookies.set("accessToken", response?.access_token);
        Cookies.set("refreshToken", response?.refresh_token);
        router.push('/dashboard');
      } else {
        router.push('/');
      }
      snackbarRef.current?.showSnackbar('Login Successful', 'success');
    } catch (error: any) {
      if (error.code === 'ERR_INTERNET_DISCONNECTED' || error.message?.includes('network')) {
        snackbarRef.current?.showSnackbar('Please check your internet connection', 'error');
      }
      else {
        console.error('Google Login Error:', error.message);
        snackbarRef.current?.showSnackbar(error.message || 'An error occurred during Google Login', 'error');
      }
    }
  };

  if (!open) return null;
  return (
    <>
      <ModalComponent isOpen={open} onClose={onClose}>
        {step === 1 && (
          isGoogleLoading ? (
            <>
              
              <Loading open={false} title='Account Created Successfully' subtitle='You will be directed to the dashboard soon.'/>
              

              {/* <CircularProgress size={70} /> */}
            </>) : (
            <>
              <Box sx={{ mt: 0, mx: 2, width: '100%' }}>

                <p className='font-semibold text-2xl text-center mb-16'>
                  Sign In to unlock the best of Atlen
                </p>
                {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}> */}
                  <ButtonComponent sx={{
                    fontSize: "18px", mt: 0, mb: 2, p: 1, width: '100%', color: "#3d3d3d", backgroundColor: 'white', border: '1px solid gray', '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }} onClick={() => handleGoogleLogin()}>


                    <Image src="./google-icon.svg" className='px-2' width={45} height={45} alt="" />
                    Continue with Google
                    {/* <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              />  */}


                  </ButtonComponent>
                {/* </GoogleOAuthProvider> */}
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

            </>)
        )}
        {step === 2 && (
          <>

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
                {loading ? (
                  <Image src="/small.gif" width={100} height={100} alt="Loading" />
                ) : (
                  "Continue"
                )}
              </ButtonComponent>
              <p className='text-neutral-900 text-[14px] text-center '>
                By proceeding, you agree to our <Link href=""><span className='underline font-semibold'>Terms of Use</span></Link> and <Link href=''><span className='underline font-semibold'> Privacy Policy</span></Link>.
              </p>

            </Box>
          </>
        )}
      </ModalComponent>

    </>
  );
};

export default LoginModal;