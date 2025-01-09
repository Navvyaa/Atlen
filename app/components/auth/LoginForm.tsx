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
import { RootState } from '@/app/store/store';
import { login } from '@/app/features/auth/slices/authThunk';
import { AppDispatch } from '@/app/store/store';
import { useDispatch,useSelector } from 'react-redux';
import Cookies from 'js-cookie';
interface LoginFormProps {
  email:string
}

const LoginForm: React.FC <LoginFormProps>= () => {
  const dispatch = useDispatch<AppDispatch>();
 
  const email = useSelector((state: RootState) => state.auth.email);
  // const email = searchParams.get('email') || '';
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const snackbarRef = useRef<SnackbarRef>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
 
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };
 
  const handleSubmit  = async (event: React.FormEvent) => {
    setError(false);
    event.preventDefault();
    if(email==="null" || email===null){
   
      snackbarRef.current?.showSnackbar('Enter a email first', 'warning');
      setTimeout(() => {
      router.push('/');
      }, 2000);
      return;
    }

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

  setLoading(true);
    try {
        const response = await dispatch(login({ email,password })).unwrap();
      
        Cookies.set('accessToken', response.data.access);
        Cookies.set('refreshToken', response.data.refresh);
        snackbarRef.current?.showSnackbar(response.message, 'success');
        router.replace('/dashboard');
      } catch (error: any) {
        snackbarRef.current?.showSnackbar(error.response.data.message || 'An unknown error occurred', 'error');
      } finally {
        setLoading(false);
      }
  };

  return (
    <>

      <div className={isModalOpen  ? 'blur-background' : ''}>
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
              {loading?"Loading...":"Continue"}
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
