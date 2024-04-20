import React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { signIn } from '../utils/auth';

const FullPageBackground = styled('div')({
  backgroundImage: 'url(\'pwn7.jpg\')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SignInButton = styled(ButtonBase)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  backgroundColor: 'transparent',
  border: '10px solid transparent',
  transition: theme.transitions.create(['border-color', 'transform']),
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: theme.palette.common.white,
    transform: 'scale(1.02)',
  },
  marginTop: theme.spacing(10),
}));

function Signin() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn();
    router.push('/');
  };

  return (
    <FullPageBackground>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <SignInButton onClick={handleSignIn}>
          Sign In
        </SignInButton>
      </Box>
    </FullPageBackground>
  );
}

export default Signin;
