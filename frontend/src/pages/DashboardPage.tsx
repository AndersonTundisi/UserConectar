import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, CircularProgress, Alert, Button, Stack
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useSnackbar } from '../context/SnackbarContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const DashboardPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/users/${id}`);
        showMessage('Usuário excluído com sucesso!', 'success');
        fetchUsers();
      } catch (err) {
        showMessage('Erro ao excluir usuário.', 'error');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-user/${id}`);
  };

  const handleCreate = () => {
    navigate('/register');
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" gutterBottom>Carregando usuários...</Typography>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Lista de Usuários</Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Cadastrar Novo Usuário
        </Button>
      </Stack>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(user.id)}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                      Excluir
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default DashboardPage;
