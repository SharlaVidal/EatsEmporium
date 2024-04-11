
import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import PaginaBaseAdmin from './paginas/Administracao/Restaurantes/PaginaBaseAdmin';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurante';
import FormAdmin from './paginas/Administracao/FormularioAdmin/FormularioAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministraçãoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      
      <Route path="/admin">
        <Route index element={<FormAdmin />} />

        <Route path="PaginaBaseAdmin" element={<PaginaBaseAdmin basePath="/admin" />} />
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;

