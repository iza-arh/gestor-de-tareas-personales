import './App.css'
import Sidebar from './components/Sidebar';

function App() {
  return (
      <div className="min-h-screen bg-background text-foreground">
        {/* El sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="lg:pl-64 p-8 pt-20 lg:pt-8">
        <h1 className="text-3xl font-bold text-center">Bienvenidos</h1>
        </main>
      </div>
  )
}

export default App
