"use client";
import React from 'react';
import { Modal, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ModalComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ children, isOpen, onClose }) => {
  const router = useRouter();

  const handleBackdropClick = () => {
    onClose();
    router.push('/'); // Redirect to home page
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleBackdropClick}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: "460px",
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24,
          paddingX:"20px",
          paddingY:"40px",
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="./logo.svg" alt="logo" className=' mb-4 ' />
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;