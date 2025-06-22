import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:3000/auth/register', { name, email, password });
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err: any) {
      console.error('Erro ao cadastrar:', err);
      setError(err.response?.data?.message || 'Erro ao cadastrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        disabled={loading}
        style={{ marginTop: '20px' }}
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </Container>
  );
};

export default RegisterPage;