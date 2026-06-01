import React, { useState, useEffect } from 'react';
// Asegúrate de que estas rutas sean las correctas en tu proyecto
import CategoriaForm from '../../components/categorias/CategoriaForm';
import CategoriaList from '../../components/categorias/CategoriaList';
import { getCategorias } from '../../services/categoriasServices';

export default function CategoriasPage() {

    const [categorias, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar categorias:", error);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const handleCategoriaCreada = (nuevaCategoria) => {
        setCategorias([...categorias, nuevaCategoria])
    };

    return (
        <div className='flex flex-col items-center gap-6 w-full p-6'>
            <h1 className='text-3xl font-bold'>Categorías</h1>

            {/* Pasamos cargarCategorias para que el formulario actualice la lista al guardar */}
            <CategoriaForm onCategoriaCreada={handleCategoriaCreada} />

            <div className='mt-8'>
                <h2 className='text-xl font-bold'>Categorias Creadas</h2>
                <ul>
                    {categorias.map((cat, index) => (
                        <li key={index} className='p-2 border-b'>
                            <strong>{cat.nombre}</strong>: {cat.descripcion}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Pasamos las categorías y la función para recargar después de eliminar */}
            <CategoriaList
                categorias={categorias}
                onCategoriaEliminada={cargarCategorias}
            />
        </div>
    );
}