import { useEffect, useState } from "react";
import { deleteCategoria, getCategorias } from "../../services/categoriasServices";
import CategoriaList from "../../components/categorias/CategoriaList";



export default function ListaCategoriaPage() {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const data = await getCategorias();
            setCategorias(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleEliminar = async (id) => {
        await deleteCategoria(id);

        cargarDatos();
    };

    if (cargando) return <p className="text-center">Cargando categorias...</p>;

    return (
        <div className="w-full max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">Mis Categorias</h1>
            <CategoriaList
                categorias={categorias}
                onCategoriaEliminada={() => cargarDatos()}/>
        </div>
    );
}