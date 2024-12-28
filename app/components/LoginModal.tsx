import React from 'react';
import { Box, Modal } from '@mui/material';
import ButtonComponent from './ButtonComponent';
import { useRouter } from 'next/navigation';
interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const router = useRouter();

    const handleEmailLoginClick = () => {
      router.push('/login');
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
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
                <img src="./Ellipse.svg" alt="logo" className=' my-2 mb-6 ' />
                <p className='font-semibold text-2xl text-center mb-12'>
                    Sign In to unlock the best of Trippin
                    {/* </Typography> */}
                </p>

                <ButtonComponent sx={{
                    mt: 1, mb: 2, p: 1, width: '100%', backgroundColor: 'white', border: '1px solid gray', color: '#3d3d3d', '&:hover': {
                        backgroundColor: '#f0f0f0', 
                    },
                }} onClick={() => console.log('Sign in with Google')}>
                    <img src="./google-icon.svg" className='px-2 ml-5 ' alt="" />
                    Continue with Google
                </ButtonComponent>

                <ButtonComponent sx={{
                    mt: 1, mb: 6, p: 1, width: '100%', color: "#3d3d3d", backgroundColor: 'white', border: '1px solid gray', '&:hover': {
                        backgroundColor: '#f0f0f0', 
                    },
                }} onClick={handleEmailLoginClick}>
                    <img src="./mail.svg" className='px-2' alt="" />
                    Continue with mail
                </ButtonComponent>

                <p className='text-neutral-900 text-sm text-center'>
                    By proceeding, you agree to our <a href=""><span className='underline'>Terms of Use</span></a> and <a href=''><span className='underline'> Privacy Policy</span></a>.
                    </p>
            </Box>
        </Modal>
    );
};

export default LoginModal;