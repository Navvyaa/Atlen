import { IconButton, Tooltip } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  return (
    <Tooltip title="Back">
      <IconButton 
        onClick={() => router.back()}
        sx={{ 
          position: 'absolute',
          left: 16,
          top: 16,
          color: 'text.secondary'
        }}
      >
        {/* <ArrowBackIcon /> */}
        <ChevronLeftIcon />
      </IconButton>
    </Tooltip>
  );
};