"use client";
import React, { useState } from 'react';
import { Box, Modal,Divider } from '@mui/material';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';


const LoginForm: React.FC = () => {
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
            maxWidth: 510,
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
            <img src="./Ellipse.svg" alt=""  className='mb-8'/>
            <p className='font-semibold text-2xl text-center mb-2'>
            Plan. Explore. Travel.
            </p>
          <AuthForm mode="login"/>
            <Divider sx={{ mt: 2, color: '#3d3d3d', fontFamily: 'urbanist', fontSize: '14px', width: '94%' }}>Not a Member ?</Divider>
            <p className='mt-1  text-sm text-neutral-900 text-center'> <a href="" className='underline font-semibold'>Join</a>  Trippin for effortless travel planning!</p>
            <p className="mt-8 w-full mb-2 text-sm text-neutral-900 text-center font-regular">By proceeding, you agree to our Terms of Use and Privacy Policy.</p>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginForm;