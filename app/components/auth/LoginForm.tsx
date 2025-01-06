"use client";
import React, { useRef, useState } from 'react';
import { Box,  } from '@mui/material';
import ButtonComponent from '../ui/ButtonComponent';
import BackButton from '../ui/BackButton';
import InputComponent from '../ui/InputComponent';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ModalComponent from '../ui/ModalComponent';
import { useSearchParams } from 'next/navigation';
import {LoginUser } from '../../api/apiClient';
import Cookies from 'js-cookie';
import axios from 'axios';
interface LoginFormProps {
  email:string
}

const LoginForm: React.FC <LoginFormProps>= () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const snackbarRef = useRef<SnackbarRef>(null);
  const router = useRouter();

  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  const handleSubmit  = async (event: React.FormEvent) => {
    setError(false);
    event.preventDefault();
    if (!password) {
      setError(true);
      snackbarRef.current?.showSnackbar('Enter the password', 'error');
      
      return;
    }
    if (!pwdRegex.test(password)) {
      setError(true);
      snackbarRef.current?.showSnackbar('Invalid Password', 'error');
     
      return;
    }
    try {
      
      const data = await LoginUser({ email, password });

      if (data.success) {
        snackbarRef.current?.showSnackbar(data.message, 'success');
        Cookies.set('accessToken', data.data.access);
        Cookies.set('refreshToken', data.data.refresh);  
        setTimeout(() => {
          router.replace('/dashboard');
        }, 2000);
      } else {
        snackbarRef.current?.showSnackbar(data.message || 'Login failed. Please try again.', 'error');
      }
    } catch (error) {
      
      if (axios.isAxiosError(error) && error.response) {
       
        const errorData = error.response.data;
       
        const errorMessage = errorData?.message || 'Failed to login. Please check your credentials and try again.';
        snackbarRef.current?.showSnackbar(errorMessage, 'error');
      } else {
        
        snackbarRef.current?.showSnackbar('Failed to login.', 'error');
      }
      }
  };

  return (
    <>

      <div className={isModalOpen ? 'blur-background' : ''}>
        <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal}>

          <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mx: 2, width: '100%' }}>
            <BackButton />
            <div className='flex flex-col items-center mb-5'>
              
              <div className='font-semibold mx-0 px-0 w-[100%] text-2xl text-center mb-2'>
                Login with Password
              </div>
            </div>
            <InputComponent
              label="Password"
              type="password"
              placeholder="Password"
              error={error}
              onInputChange={() => setError(false)} 
              
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Link href="/forgot-password">
                <button type='button' className='text-black font-medium text-md cursor-pointer mb-4'>
                  Forgot password?
                </button>
              </Link>
            </Box>
            <ButtonComponent onClick={handleSubmit} type="submit" sx={{ mb: 7, mt: 2, width: '100%', py: 1.5, fontSize: '20px' }}>
              Continue
            </ButtonComponent>

            <p className='text-neutral-900 text-[14px] text-center '>
              By proceeding, you agree to our <Link href=""><span className='underline font-semibold'>Terms of Use</span></Link> and <Link href=''><span className='underline font-semibold'> Privacy Policy</span></Link>.
            </p>
          </Box>
        </ModalComponent>
      </div>

    </>
  );
};

export default LoginForm;
