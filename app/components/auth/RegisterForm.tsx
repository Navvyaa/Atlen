"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, } from '@mui/material';
import ButtonComponent from '../ui/ButtonComponent';
import BackButton from '../ui/BackButton';
import InputComponent from '../ui/InputComponent';
import { useRouter } from 'next/navigation';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import OtpPage from './OtpPage';
import ModalComponent from '../ui/ModalComponent';
import Link from 'next/link';
import LoginModal from './LoginModal';
import { registerUser, verifyOtp } from '../../api/apiClient';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
interface RegisterFormProps {
  
  step: number;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ step: initialStep }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
 
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstError, setFirstError] = useState<boolean>(false);
  const [lastError, setLastError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<number>(initialStep); 
  


  const router = useRouter();
  const snackbarRef = useRef<SnackbarRef>(null);

  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  useEffect(() => {
    snackbarRef.current?.clearSnackbar();
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password.trim() || !firstName.trim() || !lastName.trim() || !confirmPassword.trim()) {
      if (!firstName.trim()) {
        setFirstError(true);
      }
      if (!lastName.trim()) {
        setLastError(true);
      }
      if (!password) {
        setPassError(true);
      }
      if (!confirmPassword) {
        setConfirmError(true);
      }
      snackbarRef.current?.showSnackbar('Enter all fields.', 'error');
      return;
    }

    if (!pwdRegex.test(password)) {
      setPassError(true);
      snackbarRef.current?.showSnackbar('Invalid Password', 'error');
      return;
    }
    if (password !== confirmPassword) {
      setPassError(true);
      setConfirmError(true);
      snackbarRef.current?.showSnackbar('Passwords do not match.', 'error');
      return;
    }
    try {

      const data = await registerUser({ email, password, confirm_password: confirmPassword, first_name: firstName, last_name: lastName });

      if (data.success) {
        snackbarRef.current?.showSnackbar(data.message, 'success');
        setTimeout(() => {
          setStep(2);
        }, 1000);
       
      } else {
        snackbarRef.current?.showSnackbar(data.message || 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {

      if (axios.isAxiosError(error) && error.response) {

        const errorData = error.response.data;

        const errorMessage = errorData?.message || 'Failed to register. Please check your credentials and try again.';
        snackbarRef.current?.showSnackbar(errorMessage, 'error');
      } else {

        snackbarRef.current?.showSnackbar('Failed to register.', 'error');
      }
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const data = await verifyOtp({ email, otp, verification_type: 'registration' });
      if (data.success) {
        
        Cookies.set('refreshToken', data.data.refresh, { secure: true });
        Cookies.set('accessToken', data.data.access , { secure: true });
        snackbarRef.current?.showSnackbar(data.message, 'success');
        router.replace('/dashboard');
      } else {
        snackbarRef.current?.showSnackbar(data.message, 'error');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Failed to verify OTP. Please try again.';
        snackbarRef.current?.showSnackbar(errorMessage, 'error');
      } else {
        snackbarRef.current?.showSnackbar('Failed to verify OTP. Please try again.', 'error');
      }
    }
  };
const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
const handleResendOtp = async () => {
  if (isResendDisabled) {
    snackbarRef.current?.showSnackbar('Please wait 30 seconds before requesting another OTP.', 'warning');
    return;
  }

  try {
    await registerUser({ email, password, confirm_password: confirmPassword, first_name: firstName, last_name: lastName });
    snackbarRef.current?.showSnackbar('OTP resent successfully', 'warning');
    setIsResendDisabled(true);
    setTimeout(() => {
      setIsResendDisabled(false);
    }, 30000); 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || 'Failed to verify OTP. Please try again.';
      snackbarRef.current?.showSnackbar(errorMessage, 'error');
      }
      else{
      snackbarRef.current?.showSnackbar('Failed to resend OTP. Please try again.', 'error');
    }
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <div className={isModalOpen ? 'blur-background' : ''}>


      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} >
        {step === 1 && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
            <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
            <BackButton onBack={() => router.push('/')} />
            <LoginModal step={2} open={false} onClose={function (): void {
              throw new Error('Function not implemented.');
            }} />
            <div className='font-semibold mx-0 px-0 w-[100%] text-2xl text-center mb-6'>
              Plan. Explore. Travel.
            </div>

            <div className='flex flex-row gap-5'>
              <InputComponent
                label="First Name"
                type="text"
                placeholder="First Name"
                error={firstError}
                onInputChange={() => setFirstError(false)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}

              />
              <InputComponent
                label="Last Name"
                type="text"
                placeholder="Last Name"
                error={lastError}
                onInputChange={() => setLastError(false)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              />
            </div>
            <InputComponent
              label="Password"
              type="password"
              placeholder="Password"
              error={passError}
              onInputChange={() => setPassError(false)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}

            />
            <InputComponent
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              error={confirmError}
              onInputChange={() => setConfirmError(false)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}

            />
            <ButtonComponent type="submit" sx={{ mb: 1, width: '100%', py: 1.5, fontSize: '20px', mt: 3 }}>
              Join
            </ButtonComponent>

            <p className='text-neutral-900 text-[14px] text-center mt-8'>
              By proceeding, you agree to our <Link href=""><span className='underline font-semibold'>Terms of Use</span></Link> and <Link href=''><span className='underline font-semibold'> Privacy Policy</span></Link>.
            </p>
          </Box>
        )}
        {step === 2 && (
          <OtpPage onVerify={handleVerifyOtp} onResend={handleResendOtp} snackbarRef={snackbarRef} isResendDisabled={isResendDisabled}/>
        )}
      </ModalComponent>
    </div >

  );
};

export default RegisterForm;