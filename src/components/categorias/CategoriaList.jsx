import React from "react";
import { deleteCategoria } from "../../services/categoriasServices";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@heroui/react';


export default function CategoriaList({ categorias, onCategoriaEliminada }) {

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
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onClick={() => handlerEliminar(item.id)}
                                    >Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table.Content>
            </Table>
        </div>
    );

}