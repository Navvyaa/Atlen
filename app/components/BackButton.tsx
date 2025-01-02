import { IconButton, Tooltip } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter, usePathname } from 'next/navigation';


const routeBackMap: { [key: string]: string } = {
  '/register': '/login',
  '/login': '/',
  '/forgot-password': '/login',
};



export const BackButton = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const backRoute = routeBackMap[currentPath] || '/';

  return (
    <Tooltip title="Back">
      <IconButton 
        onClick={() => router.push(backRoute)}
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