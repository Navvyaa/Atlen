"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
// import ButtonComponent from '../ui/ButtonComponent';
// import InputComponent from '../ui/InputComponent';
// import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import ModalComponent from '../ui/ModalComponent';
// import { useRouter } from 'next/navigation';

interface CreateTripProps {
    open: boolean;
    onClose: () => void;
    // step: number;
  }

  const CreateTrip: React.FC<CreateTripProps> = ({ open, onClose }) => {
    const [tripName, setTripName] = useState<string>('');
    const [destination,setDestination] = useState<string>('');
    const [start,setStart] = useState<string>('');
    const [end,setEnd] = useState<string>('');

    return (
      <ModalComponent isOpen={open} onClose={onClose}>
        {/* Your component content here */}
       <Box sx={{ mt: 2, mx: 2, width: '100%' }}>
            trip
        </Box>
      </ModalComponent>
    );
  }