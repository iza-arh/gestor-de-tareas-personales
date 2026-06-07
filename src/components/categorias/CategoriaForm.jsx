import React, { useState, useEffect } from "react";
import { Input, Button, TextArea } from "@heroui/react";

export default function CategoriaForm({ onGuardar, categoriaInicial = null }) {
    // Lógica: Tu objeto "Categoria" tiene exactamente dos atributos.
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: ""
    });

    useEffect(() => {
        if (categoriaInicial) {
            setFormData(categoriaInicial);
        } else {
            setFormData({ nombre: "", descripcion: "" });
        }
    }, [categoriaInicial]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí pasas el objeto "Categoria" completo
        onGuardar(formData);
        setFormData({ nombre: "", descripcion: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-content1 rounded-xl shadow-sm border border-divider w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">{categoriaInicial ? "Editar Categoria" : "Nueva Categoria"}</h2>

            <p className="text-xl">Ingrese el nombre de la categoria</p>
            {/* Atributo 1: Nombre */}
            <Input
                label="Nombre"
                placeholder="Nombre de la categoría"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
            />

            <p className="text-xl">Descripcion</p>
            {/* Atributo 2: Descripcion (Tratado igual que el nombre) */}
            <TextArea
                label="Descripcion"
                placeholder=""
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                required
            />

            <Button type="submit" color="primary" className="w-full">
                {categoriaInicial ? "Actualizar Categoria" : "Crear Categoria"}
            </Button>
        </form>
    );
}