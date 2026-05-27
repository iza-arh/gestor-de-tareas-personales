import './App.css'
import Sidebar from './components/Sidebar';
import MetasForm from './components/MetasForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
            <Route path="/metas-form-agregar-meta" element={<MetasForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
