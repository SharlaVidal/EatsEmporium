import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
  const navigate = useNavigate();
  const [pratos, setPratos] = useState<IPrato[]>([]);
  const [nomePrato, setNomePrato] = useState<string>('');

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => setPratos(resposta.data));
  }, []);

  const handleEditar = (id: number) => {
    navigate(`/admin/pratos/${id}`);
  };

  const handleDelete = (pratoAoSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoAoSerExcluido.id}/`)
      .then(() => {
        const listaPrato = pratos.filter(prato => prato.id !== pratoAoSerExcluido.id);
        setPratos([...listaPrato]);
      })
      .catch(error => {
        console.error('Erro ao excluir prato:', error);
      });
  };

  function aoAlterarNomePrato(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setNomePrato(event.target.value);
  }

  function aoSubmeterForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    
    if (nomePrato.trim() === '') {
      console.error('O nome do prato não pode estar vazio.');
      return; 
    }

    http.post('pratos/', { nome: nomePrato })
    .then(response => {
      const novoPrato = response.data; 
      setPratos([...pratos, novoPrato]); 
      setNomePrato(''); ;
      })
      .catch(error => {
        console.error('Erro ao enviar dados do prato:', error);
      });
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: 'white' }}>
                  Prato
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Prato
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
              <Typography component="h1" variant="h6">
                Formulário de Pratos
              </Typography>
              <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                  value={nomePrato}
                  onChange={aoAlterarNomePrato}
                  id="standard-basic"
                  label="Nome do Prato"
                  variant="standard"
                  fullWidth
                  required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map(prato => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditar(prato.id)}>Editar</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color='error' onClick={() => handleDelete(prato)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdministracaoPratos;
