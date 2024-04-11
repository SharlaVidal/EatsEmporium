import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import estilos from './FormularioAdmin.module.scss';

const FormAdmin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (name === "admin" && password === "admin123") {
            navigate('/admin/PaginaBaseAdmin'); 
        } else {
            alert('Credenciais inválidas!');
        }
    }

    return (
        <div className={estilos.container}>
            <form className={estilos.form} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    className='input-admin'
                    type='text'
                    placeholder='Nome'
                    required
                    value={name}
                    onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setName(event.target.value)}
                />

                <input
                    className='input-admin'
                    type='password'
                    placeholder='Senha'
                    required
                    value={password}
                    onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPassword(event.target.value)}
                />

                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
}

export default FormAdmin;
