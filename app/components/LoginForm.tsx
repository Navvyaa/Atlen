"use client";
import React, { useState } from 'react';
import { Box, Modal, Divider } from '@mui/material';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  mode: 'login' | 'register';
}

const LoginForm: React.FC<LoginFormProps> = ({ mode }) => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <div className={isModalOpen ? 'blur-background' : ''}>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="login-modal"
        aria-describedby="Enter email and password to login"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 530,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 4,
            // px:2,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="./logo.svg" alt="" className='mb-8' />

          <div className='font-semibold mx-0 px-0 text-3xl text-center mb-2'>
            {mode === 'login' ? (<p>Plan. Explore. Travel.</p>) : (<p>Ready to Explore? Join Trippin Today</p>)}
          </div>
          <AuthForm mode={mode} />
          {mode === 'login' ? (
            <>
              <Divider sx={{ mt: 2, color: '#3d3d3d', fontFamily: 'urbanist', fontSize: 'text-md', width: '94%' }}>Not a Member?</Divider>
              <p className='mt-1 text-md text-neutral-900 text-center'>
                <button onClick={() => router.push('/register')} className='underline font-semibold'>Join</button> Trippin for effortless travel planning!
              </p>
            </>
          ) : (
            <>
              <Divider sx={{ mt: 2, color: '#3d3d3d', fontFamily: 'urbanist', fontSize: 'text-md', width: '94%' }}>Already a Member?</Divider>
              <p className='mt-1 text-md text-neutral-900 text-center'>
                <button onClick={() => router.push('/login')} className='underline font-semibold'>Login</button> using your Trippin account.
              </p>
            </>
          )}
          <p className="mt-8 w-full mb-0 text-md text-neutral-900 text-center font-regular">
            By proceeding, you agree to our Terms of Use and Privacy Policy.
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginForm;