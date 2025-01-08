"use client";
import React, { useState, useEffect, useRef } from 'react';
import InputComponent from '../ui/InputComponent';
import { useRouter } from 'next/navigation';
import { useModal } from '../../context/ModalContext';
import ButtonComponent from '../ui/ButtonComponent';
import BackButton from '../ui/BackButton';
import OtpPage from './OtpPage';
import ModalComponent from '../ui/ModalComponent';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import { RootState } from '@/app/store/store';
import { forgotPassword, resetPassword, verifyOtp } from '@/app/features/auth/slices/authThunk';
import { AppDispatch } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPasswordForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialEmail = useSelector((state: RootState) => state.auth.email);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>(initialEmail || '');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [resetToken, setResetToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const snackbarRef = useRef<SnackbarRef>(null);
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  let countdownInterval: NodeJS.Timeout | null = null; // Use a global interval reference
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    openModal();
  }, [openModal]);

  const handleCloseModal = () => {
    closeModal();
    router.push('/');
  };

  const handleNextStep = async () => {
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
      setLoading(true);
      try {
        const response = await dispatch(forgotPassword({ email })).unwrap();
        
        snackbarRef.current?.showSnackbar(response.message, 'success');
        setTimeout(() => {
          setStep(2);
        }, 1000);
      } catch (error: any) {
        snackbarRef.current?.showSnackbar(error.response?.data?.message || 'An unknown error occurred', 'error');
      } finally {
        setLoading(false);
      }
    }

    else if (step === 2) {
      setStep(3);
    }

    else if (step === 3) {
      if (!newPassword.trim() || !confirmPassword.trim()) {
        setPasswordError(true);
        snackbarRef.current?.showSnackbar('Please enter the passwords to proceed', 'error');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError(true);
        snackbarRef.current?.showSnackbar('Looks like a mismatch. Double-check your passwords!', 'error');
        return;
      }
      setLoading(true);
      try {
        const response = await dispatch(resetPassword({ email, new_password: newPassword, confirm_password: confirmPassword, reset_token: resetToken })).unwrap();
     
        snackbarRef.current?.showSnackbar(response.message, 'success');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } catch (error: any) {
        snackbarRef.current?.showSnackbar(error.response?.data?.message || 'An unknown error occurred', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    try {
      if (email) {
        const response = await dispatch(verifyOtp({ email, otp, verification_type: 'password_reset' })).unwrap();
       
        snackbarRef.current?.showSnackbar("Email verified successfully!", 'success');
        setResetToken(response.data?.reset_token || '');
        setTimeout(() => {
        setStep(3);
        },1000);
      } else {
        snackbarRef.current?.showSnackbar('Email is required to verify OTP.', 'error');
      }
    } catch (error: any) {
      snackbarRef.current?.showSnackbar(error.response?.data?.message || 'An unknown error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleResendOtp = async () => {
    if (isResendDisabled) {
     
      snackbarRef.current?.showSnackbar(`Please wait ${remainingTime} seconds before requesting another OTP.`, 'warning');
      return; 
    }
    try {
      setIsResendDisabled(true);
      setRemainingTime(30);

      if (countdownInterval) clearInterval(countdownInterval); 
    countdownInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval!); 
          setIsResendDisabled(false); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

      await dispatch(forgotPassword({ email })).unwrap();
      snackbarRef.current?.showSnackbar("OTP resent successfully", 'success');
    } catch  {
      snackbarRef.current?.showSnackbar('An error occurred! Please try again', 'error');
    }
  };


  
  return (
    <div className={isModalOpen ? 'blur-background' : ''}>
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>
        {step === 1 ? <BackButton /> : step === 2 ? <BackButton onBack={() => setStep(1)} /> : null}

        <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />

        {step !== 2 && (
          <>
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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className='w-full '>
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
            <ButtonComponent onClick={handleNextStep} sx={{ my: 3, width: '100%', py: 1.5, fontSize: '20px' }} disabled={loading}>
            {loading ? 'Loading...' : step === 1 ? 'Send OTP' : 'Done'}
            </ButtonComponent>
        )}

        {step === 2 && (
          <>
            <OtpPage onVerify={handleVerifyOtp} onResend={handleResendOtp} snackbarRef={snackbarRef} isResendDisabled={isResendDisabled} />
          </>
        )}
      </ModalComponent>
    </div>
  );
};

export default ForgotPasswordForm;