import './App.css';
import Sidebar from './components/Sidebar';
import CrearMetaPage from './pages/metas/crearMetaPage';
import ListaDeMetasPage from './pages/metas/ListaDeMetasPage';
import CategoriasPage from './pages/categorias/CategoriaPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Sidebar />

          <main className="lg:pl-64 p-8 pt-20 lg:pt-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center">
              Bienvenidos
            </h1>

            <Routes>
              <Route
                path="/metas-form-agregar-meta"
                element={<CrearMetaPage />}
              />

              <Route
                path="/metas-list"
                element={<ListaDeMetasPage />}
              />

              <Route
                path="/categorias"
                element={<CategoriasPage />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
  );
}

export default App;