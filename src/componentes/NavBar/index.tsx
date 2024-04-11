import React from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './NavBar.module.scss';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToRestaurantes = () => {
    navigate('/restaurantes');
  };

  const handleNavigateToAdmin =() => {
    navigate('/Admin');
  }

  return (
    <nav className={estilos.NavBar}>
      <ul>
        <button className={estilos.botaoNav} onClick={handleNavigateToHome}>Home</button>
        <button className={estilos.botaoNav} onClick={handleNavigateToRestaurantes}>Restaurantes</button>
        <button className={estilos.botaoNav} onClick={handleNavigateToAdmin}>Admin</button>
      </ul>
    </nav>
  );
}

export default NavBar;
