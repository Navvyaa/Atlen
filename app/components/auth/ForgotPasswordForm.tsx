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
import { forgotPassword, resetPassword, verifyOtp } from '@/app/api/apiClient';
import axios from 'axios';

const ForgotPasswordForm: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState<number>(1);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const snackbarRef = useRef<SnackbarRef>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();
  
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
       try {
            const data = await forgotPassword({email});
            if (data.success) {
              snackbarRef.current?.showSnackbar(data.message, 'success');
              setTimeout(() => {
                setStep(2);
              }, 2000);
            } else {
              snackbarRef.current?.showSnackbar(data.message || 'Please try again.', 'error');
            }
          } catch (error) {
            
            if (axios.isAxiosError(error) && error.response) {
             
              const errorData = error.response.data;
             
              const errorMessage = errorData?.message || 'User not found. Please check your email and try again.';
              snackbarRef.current?.showSnackbar(errorMessage, 'error');
            } else {
              
              snackbarRef.current?.showSnackbar('Network Error.', 'error');
            }
          }
         
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
        snackbarRef.current?.showSnackbar('Looks like a mismatch. Double-check your passwords!', 'error');
        return;
      }
     
      try {
         
        const data = await resetPassword({
          email, new_password: newPassword, confirm_password: confirmPassword,
          reset_token: resetToken
        });
        if (data.success) {
          snackbarRef.current?.showSnackbar(data.message, 'success');
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          snackbarRef.current?.showSnackbar(data.message || 'Please try again.', 'error');
        }
      } catch (error) {
        
        if (axios.isAxiosError(error) && error.response) {
         
          const errorData = error.response.data;
         
          const errorMessage = errorData?.message || 'Password Reset failed. Please try again.';
          snackbarRef.current?.showSnackbar(errorMessage, 'error');
        } else {
          
          snackbarRef.current?.showSnackbar('Network Error.', 'error');
        }
      }
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    try {
      const data = await verifyOtp({ email, otp, verification_type: 'password_reset' });
      if (data.success) {
        setResetToken(data.data.reset_token);
        console.log(resetToken);
        snackbarRef.current?.showSnackbar(data.message, 'success');
        setTimeout(() => {
          setStep(3);
        }, 2000);
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
        await forgotPassword({ email});
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

            <OtpPage onVerify={handleVerifyOtp} onResend={handleResendOtp} snackbarRef={snackbarRef} isResendDisabled={isResendDisabled}/>
          </>
        )}
      </ModalComponent>
    </div>
  );
};

export default ForgotPasswordForm;