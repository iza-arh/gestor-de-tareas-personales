import React from "react";
import { deleteCategoria } from "../../services/categoriasServices";
import { useNavigate } from "react-router-dom";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@heroui/react';


export default function CategoriaList({ categorias, onCategoriaEliminada }) {
    const navigate = useNavigate();

    const handlerEliminar = (id) => {

        if (confirm("¿Borrar esta categoria?")) {
            deleteCategoria(id);
            onCategoriaEliminada();
        }
    };

    if (!categorias || !Array.isArray(categorias)) {
        return <p>Cargando...</p>
    }

    if (categorias.length === 0) {
        return <p>No hay categorias disponibles.</p>
    }

    return (
        <div className="w-full max-w-3xl mt-4">
            <Table
                key={categorias.length}
                className="w-full"
            >
                <Table.Content aria-label="Tabla de categorias">
                    <TableHeader>
                        <TableColumn>NOMBRE</TableColumn>
                        <TableColumn>DESCRIPCION</TableColumn>
                        <TableColumn>ACCIONES</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {categorias.map((item) => (
                            <TableRow key={item.id ?? item.nombre}>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.descripcion}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            color="danger"
                                            onClick={() => handlerEliminar(item.id)}
                                        >Eliminar</Button>
                                        <Button
                                            size="sm"
                                            color="primary"
                                            onClick={() => navigate(`/editar-categoria/${item.id}`)}
                                        >Editar</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table.Content>
            </Table>
        </div>
    );

}