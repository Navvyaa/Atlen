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
import { registerUser } from '../../api/apiClient';
import { useSearchParams } from 'next/navigation';
interface RegisterFormProps {
  // email: string;
  step: number;
}

const RegisterForm: React.FC<RegisterFormProps> = ({  step: initialStep }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const searchParams = useSearchParams();
const email = searchParams.get('email') || '';
  console.log('email', email);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstError, setFirstError] = useState<boolean>(false);
  const [lastError, setLastError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<number>(initialStep); // 1: Form, 2: OTP Verification
  // const [otp, setOtp] = useState<string>('');

  const router = useRouter();
  const snackbarRef = useRef<SnackbarRef>(null);

  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  useEffect(() => {
    // openModal();
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
    // Handle registration logic
    try {
      const data = await registerUser({ email, password, confirm_password: confirmPassword, first_name: firstName, last_name: lastName });
      snackbarRef.current?.showSnackbar(data.message, 'success');
      setStep(2); // Move to OTP verification step
    } catch (error) {
      snackbarRef.current?.showSnackbar((error as Error).message, 'error');
    }
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
          <OtpPage onVerify={handleVerifyOtp} onResend={handleResendOtp} />
        )}
      </ModalComponent>
    </div >

  );
};

export default RegisterForm;