import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  password: yup.string().optional().defined(),
}).required();

type FormData = yup.InferType<typeof schema>;

const ProfilePage = () => {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setValue('name', response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        setError('Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setMessage(null);
    try {
      await axios.patch(
        `${API_URL}/users/profile`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Perfil atualizado com sucesso!');

      // Limpa a mensagem após 5 segundos
      setTimeout(() => setMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao atualizar perfil');

      // Limpa o erro após 5 segundos
      setTimeout(() => setError(null), 5000);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          id="name"
          fullWidth
          margin="normal"
          label="Nome"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          id="email"
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          disabled
        />

        <TextField
          id="password"
          fullWidth
          margin="normal"
          label="Nova Senha (opcional)"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="primary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Atualizando...' : 'Atualizar Perfil'}
        </Button>
      </form>
    </Container>
  );
};

export default ProfilePage;