"use client";
import React from 'react';
import { Modal, Box } from '@mui/material';
import { useModal } from '../context/ModalContext';
import { useRouter } from 'next/navigation';
interface ModalComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ children ,isOpen,onClose}) => {
  const { isModalOpen, closeModal } = useModal();
  const router = useRouter();
  const handleBackdropClick = () => {
    onClose();
    // router.push('/'); // Redirect to home page
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleBackdropClick}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    //   BackdropProps={{
    //     onClick: closeModal,
    //   }}
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
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;