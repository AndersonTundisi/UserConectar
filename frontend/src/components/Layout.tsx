import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo_conectar.jpg';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            UserConecta
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Meu Perfil
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <main style={{ padding: '20px' }}>{children}</main>
    </>
  );
};

export default Layout;