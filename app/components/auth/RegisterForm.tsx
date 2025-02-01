"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, } from '@mui/material';
import ButtonComponent from '../ui/ButtonComponent';
// import BackButton from '../ui/BackButton';
import { logout } from '@/app/features/auth/slices/authSlice';
import InputComponent from '../ui/InputComponent';
import { useRouter } from 'next/navigation';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import OtpPage from './OtpPage';
import ModalComponent from '../ui/ModalComponent';
import Link from 'next/link';
import Image from 'next/image';
import LoginModal from './LoginModal';
import { RootState } from '@/app/store/store';
import { register ,verifyOtp} from '@/app/features/auth/slices/authThunk';
import { AppDispatch } from '@/app/store/store';
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Loading from '../ui/Loading';
import { useModal } from '@/app/context/ModalContext';

interface RegisterFormProps {
  // open: boolean;
  step: number;
  onClose?: () => void;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ step: initialStep,onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
   const {  openModal, closeModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.auth.email);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstError, setFirstError] = useState<boolean>(false);
  const [lastError, setLastError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<number>(initialStep); 
   const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();
  const snackbarRef = useRef<SnackbarRef>(null);
  let countdownInterval: NodeJS.Timeout | null = null; // Use a global interval reference
  
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  useEffect(() => {
    snackbarRef.current?.clearSnackbar();
  }, []);
 

const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(email==="null" || email===null){
      snackbarRef.current?.showSnackbar('Enter a email first', 'warning');
      setTimeout(() => {
      router.push('/');
      }, 2000);
      return;
    }
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
    setLoading(true);
     try {
            const response = await dispatch(register({
              email, password,
              confirm_password: confirmPassword,
              first_name: firstName,
              last_name: lastName
            })).unwrap();
        
            snackbarRef.current?.showSnackbar(response.message, 'success');
            setTimeout(() => {
                    setStep(2);
                  }, 1000);
          } catch (error: any) {
            snackbarRef.current?.showSnackbar(error.response.data.message || 'An unknown error occurred', 'error');
          } finally {
            setLoading(false);
          }
  };

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    try {
      if (email) {
        const response = await dispatch(verifyOtp({ email, otp, verification_type: 'registration' })).unwrap();
       
        snackbarRef.current?.showSnackbar(response.message, 'success');
   
        Cookies.set('accessToken', response.data?.access || '');
        Cookies.set('refreshToken', response.data?.refresh || '');
        <Loading open={false} title='Account Created Successfully' subtitle='You will be directed to the dashboard soon.'/>
        router.replace('/dashboard');
      } else {
        snackbarRef.current?.showSnackbar('Email is required to verify OTP.', 'error');
      }
    } catch (error: any) {
      snackbarRef.current?.showSnackbar(error.response.data.message || 'An unknown error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

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
  if(email==="null" || email===null){

    snackbarRef.current?.showSnackbar('Enter a email first', 'warning');
    setTimeout(() => {
    router.push('/');
    }, 2000);
    return;
  }
  
    await dispatch(register({
      email, password,
      confirm_password: confirmPassword,
      first_name: firstName,
      last_name: lastName
    })).unwrap();
    snackbarRef.current?.showSnackbar("OTP resent successfully", 'success');
  } catch (error: any) {
    snackbarRef.current?.showSnackbar('An error occurred! Please try again', 'error');
  } 
}

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose && onClose();
    dispatch(logout());
    router.push('/');
  };

  return (
    
    <div className={isModalOpen ? 'blur-background' : ''}>


      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} >
        {step === 1 && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
            <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
            {/* <BackButton onBack={() => { closeModal(); router.push('/'); }} /> */}
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
              {loading ? (
                                              <Image src="/small.gif" width={100} height={100} alt="Loading" />
                                            ) : (
                                              "Join")}
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