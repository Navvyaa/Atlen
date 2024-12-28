import { NextPage } from "next";
import Link from "next/link";
import AuthForm from "@/app/components/AuthForm";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const Login: NextPage = () => {

    return (
        <div className="flex items-center">
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    p: 3,
                    borderRadius: '16px',
                    position: 'relative'
                }}
            >
                    {/* Close Button */}
                    <Link href="/" passHref>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Link>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    Log In
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <Typography variant="body2">
                            Don't have an account?
                        </Typography>
                        <Link href="/register">
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                        >
                            Sign up
                        </Typography>
                    </Link>
                </Box>
            </Typography>
            <AuthForm />
        </Paper>   
        </div >
    );
}

export default Login;