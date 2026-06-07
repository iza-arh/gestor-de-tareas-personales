import React from 'react';
// Asegúrate de que estas rutas sean las correctas en tu proyecto
import CategoriaForm from '../../components/categorias/CategoriaForm';
import { createCategoria } from '../../services/categoriasServices';
import { useNavigate } from 'react-router-dom';

export default function AgregarCategoriasPage() {
    const navigate = useNavigate();
    const handleGuardar = (datos) => {
        try {
            createCategoria(datos);
            alert("Categoria guardada con exito");
            navigate('/Lista-categorias');
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un error al guardar");
        }
    };

    return (
        <div className='w-full max-w-md p-6'>
            <h1 className='text-2x1 font-bold mb-6'>Agregar Nueva Categoria</h1>
            <CategoriaForm onGuardar={handleGuardar} />
        </div>
    
    );
}