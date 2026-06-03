import './App.css';
import Sidebar from './components/Sidebar';
import TasksPage from './pages/TasksPage';
import CrearMetaPage from './pages/metas/CrearMetaPage';
import ListaDeMetasPage from './pages/metas/ListaDeMetasPage';
import AgregarCategoriasPage from './pages/categorias/AgregarCategoriaPage';
import ListaCategoriaPage from './pages/categorias/ListaCategoriasPage';
import EditarMetasPage from './pages/metas/EditarMetasPage';
import MetasDashboardPage from './pages/metas/MetasDashboardPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Sidebar />

        <main className="p-6 pt-24 lg:ml-72 lg:px-12 lg:py-10 flex justify-center">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/tareas" element={<TasksPage />} />
            <Route path="/metas-form-agregar-meta" element={<CrearMetaPage />} />
            <Route path="/metas-list" element={<ListaDeMetasPage />} />
            <Route path="/Agregar-Categorias" element={<AgregarCategoriasPage />} />
            <Route path="/Lista-Categorias" element={<ListaCategoriaPage />} />
            <Route path="/editar-meta/:id" element={<EditarMetasPage />} />
            <Route path="/metricas-de-metas" element={<MetasDashboardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
