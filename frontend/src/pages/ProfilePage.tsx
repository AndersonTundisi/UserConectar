import React from 'react';
import { Container, Typography, Paper, Button, Box, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_conectar.jpg';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4, borderRadius: 4, width: '100%', maxWidth: 500, textAlign: 'center',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img src={logo} alt="UserConectar" style={{ width: '240px', marginBottom: '10px' }} />
        </Box>

        <Avatar sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h5" gutterBottom>{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>Cargo: {user.role}</Typography>

        <Button
          variant="contained" color="secondary" onClick={logout}
          sx={{
            borderRadius: 8,
            background: 'linear-gradient(135deg, rgba(255,0,0,0.8), rgba(255,100,100,0.8))',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(255,0,0,1), rgba(255,100,100,1))',
            },
          }}
        >
          Sair
        </Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;