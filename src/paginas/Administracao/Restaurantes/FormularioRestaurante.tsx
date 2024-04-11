import { Button, TextField, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";


const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get(`/restaurantes/${parametros.id}`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
                .catch(error => console.error("Erro ao carregar restaurante:", error));
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoAlterarNomeRestaurante = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNomeRestaurante(evento.target.value);
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('Atualizado com sucesso!');
            })
            .catch(error => console.error("Erro ao atualizar restaurante:", error));
        } else {
            http.post('/restaurantes/', {
                nome: nomeRestaurante
            })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!');
            })
            .catch(error => console.error("Erro ao cadastrar restaurante:", error));
        }
    };

    return (
        <>
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

        </>
    );
};

export default FormularioRestaurante;
