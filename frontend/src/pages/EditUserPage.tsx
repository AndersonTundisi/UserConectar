import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';

// 🔧 Schema Yup
const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  role: yup.string().required('Role é obrigatório'),
  password: yup.string().optional(), // campo opcional
});

// ✅ Tipo explícito
type FormData = {
  name: string;
  role: string;
  password?: string;
};

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any, // 🏆 Força o resolver sem erro de TS
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const user = response.data;
        setValue('name', user.name);
        setValue('role', user.role);
        setEmail(user.email);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    if (id) fetchUser();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await api.put(`/users/${id}`, data);
      alert('Usuário atualizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editar Usuário
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
          value={email}
          disabled
        />

        <TextField
          fullWidth
          margin="normal"
          label="Nova Senha (opcional)"
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
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Container>
  );
};

export default EditUserPage;