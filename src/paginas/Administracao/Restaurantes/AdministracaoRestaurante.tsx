import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Link, AppBar, Container, Toolbar, Typography, Box, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { useNavigate } from 'react-router-dom';
import http from '../../../http';
import { Link as RouterLink } from "react-router-dom";

const AdministracaoRestaurantes = () => {
  const navigate = useNavigate();

  const handleEditar = (id: number) => {
    navigate(`/admin/restaurantes/${id}`);
  };

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const [nomeRestaurante, setNomeRestaurante] = useState<string>('');
 

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data));
  }, []);

  const handleDelete = (restauranteAoSerExcluido: IRestaurante)=> {
  http.delete(`restaurantes/${restauranteAoSerExcluido.id}/`)
      .then(()=>{
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id!== restauranteAoSerExcluido.id)
        setRestaurantes([...listaRestaurante])
      }
      )
  }

  function aoAlterarNomeRestaurante(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setNomeRestaurante(event.target.value);
    throw new Error('Function not implemented.');
  }

  function aoSubmeterForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault(); 
    
    http.post('restaurantes/', { nome: nomeRestaurante })
        .then(response => {
            console.log('Restaurante adicionado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao adicionar restaurante:', error);
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
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
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
                                Formulário de Restaurantes
                            </Typography>
                            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={nomeRestaurante}
                                    onChange={aoAlterarNomeRestaurante}
                                    id="standard-basic"
                                    label="Nome do Restaurante"
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
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditar(restaurante.id)}>Editar</Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color='error' onClick={()=>handleDelete(restaurante)}>Excluir</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default AdministracaoRestaurantes;
