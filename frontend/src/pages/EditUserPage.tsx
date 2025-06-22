import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ✅ Schema Yup
const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  password: yup.string().optional().defined(),
  role: yup.string().required('Role é obrigatório'),
}).required();

type FormData = yup.InferType<typeof schema>;

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
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setValue('name', userData.name);
        setValue('role', userData.role);
        setEmail(userData.email);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    };

    fetchUser();
  }, [id, token, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.put(
        `http://localhost:3000/users/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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