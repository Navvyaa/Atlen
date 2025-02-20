"use client"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Tooltip } from '@mui/material';
// import { SxProps, Theme } from '@mui/material';


interface BackButtonProps {
  onBack?: () => void;
  // sx?: SxProps<Theme>;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <Tooltip title="Back">
      <IconButton 
        onClick={handleBackClick}
        sx={{ 
          position: 'absolute',
          left: 16,
          top: 16,
          color: 'text.secondary'
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;