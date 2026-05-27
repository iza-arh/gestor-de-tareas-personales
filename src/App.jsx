import './App.css'
import Sidebar from './components/Sidebar';
import MetasForm from './components/MetasForm';
import TasksPage from './pages/TasksPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f5efe9] text-[#211916]">
        {/* El sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="p-6 pt-24 lg:ml-72 lg:px-12 lg:py-10">
          <Routes>
            {/* El path "/" suele ser la pantalla de inicio */}
            <Route path="/" element={<TasksPage />} />
            <Route path="/tareas" element={<TasksPage />} />
            <Route path="/metas-form-agregar-meta" element={<MetasForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
