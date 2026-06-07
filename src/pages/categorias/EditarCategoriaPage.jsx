import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategorias, updateCategoria } from "../../services/categoriasServices";
import CategoriaForm from "../../components/categorias/CategoriaForm";

export default function EditarCategoriaPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoriaActual, setCategoriaActual] = useState(null);

    useEffect(() => {
        const todas = getCategorias();
        const encontrada = todas.find(c => c.id === parseInt(id));
        setCategoriaActual(encontrada);
    }, [id]);

    const handleGuardar = (datos) => {
        updateCategoria(parseInt(id), datos);
        alert("Categoria actualizada con exito");
        navigate('/Lista-categorias');
    };

    return (
        <div className="flex justify-center p-6">
            {categoriaActual ? (
                <CategoriaForm onGuardar={handleGuardar} categoriaInicial={categoriaActual} />
            ) : (
                <p>Cargando categoria...</p>
            )}
        </div>
    );
}