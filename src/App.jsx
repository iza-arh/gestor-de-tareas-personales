import './App.css'
import Sidebar from './components/Sidebar';
import CrearMetaPage from './pages/metas/crearMetaPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaDeMetasPage from './pages/metas/ListaDeMetasPage';
import EditarMetasPage from './pages/metas/EditarMetasPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        {/* El sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="lg:pl-64 p-8 pt-20 lg:pt-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center">Bienvenidos</h1>
          <Routes>
            {/* El path "/" suele ser la pantalla de inicio */}
            <Route path="/metas-form-agregar-meta" element={<CrearMetaPage />} />
            <Route path="/metas-list" element={<ListaDeMetasPage />} />
            <Route path="/editar-meta/:id" element={<EditarMetasPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
