import { IconButton, Tooltip } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter, usePathname } from 'next/navigation';

interface BackButtonProps {
  onBack?: () => void;
}

const routeBackMap: { [key: string]: string } = {
  // '/register': '/login',
  '/login': '/',
  '/forgot-password': '/login',
};

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {

  const router = useRouter();
  const currentPath = usePathname();
  const backRoute = routeBackMap[currentPath] || '/';
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } 
    else {
      router.push(backRoute);
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