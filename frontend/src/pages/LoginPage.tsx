import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';
import logo from '../assets/logo_conectar.jpg';

// ✅ Schema de validação
const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
}).required();

type FormData = yup.InferType<typeof schema>;

const LoginPage = () => {
  const { login } = useAuth();
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await login(data.email, data.password);
      showMessage('Login realizado com sucesso!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showMessage('Email ou senha inválidos.', 'error');
    }
  };

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
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 500,
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img
            src={logo}
            alt="UserConectar"
            style={{ width: '220px', marginBottom: '10px' }}
          />
        </Box>

        <Typography variant="h4" gutterBottom>
          Bem-vindo ao UserConectar
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Faça login para continuar
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{
              mt: 2,
              borderRadius: 8,
              background:
                'linear-gradient(135deg, rgba(0,123,255,0.9), rgba(0,180,216,0.9))',
              boxShadow: '0 4px 20px rgba(0,123,255,0.5)',
              '&:hover': {
                background:
                  'linear-gradient(135deg, rgba(0,123,255,1), rgba(0,180,216,1))',
              },
            }}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;