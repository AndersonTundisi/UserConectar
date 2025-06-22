import React from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ✅ Validação com Yup
const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  role: yup.string().required('Role é obrigatório'),
}).required();

type FormData = yup.InferType<typeof schema>;

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post(
        'http://localhost:3000/users',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Usuário cadastrado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      alert(error.response?.data?.message || 'Erro ao criar usuário.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Criar Novo Usuário
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

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

        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          {...register('role')}
          error={!!errors.role}
          helperText={errors.role?.message}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Criar Usuário'}
        </Button>
      </form>
    </Container>
  );
};

export default CreateUserPage;