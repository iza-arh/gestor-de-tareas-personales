import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button
} from "@heroui/react";

import { deleteMeta, getMetas } from "../../services/metasServices";
import { useNavigate } from 'react-router-dom';


export default function MetasList({ metasData = [], deleteMeta }) {

    const navigate = useNavigate();

    const navegateToEditarMetasPage = (id) => {
        navigate(`/editar-meta/${id}`);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl text-center font-bold mb-4">Metas</h2>
            <div className="overflow-x-auto rounded-lg border border-default-200">
                <table className="w-full text-sm">
                    <thead className="bg-default-100 text-default-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Titulo</th>
                            <th className="px-4 py-3 text-left">Descripcion</th>
                            <th className="px-4 py-3 text-left">Estado</th>
                            <th className="px-4 py-3 text-left">Inicio</th>
                            <th className="px-4 py-3 text-left">Finalizacion</th>
                            <th className="px-4 py-3 text-center">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metasData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-default-400">
                                    No se ha ingresado ninguna meta.
                                </td>
                            </tr>
                        ) : (
                            metasData.map((item) => (
                                <tr key={item.id} className="border-t border-default-200 hover:bg-default-50 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs text-default-400">{item.id}</td>
                                    <td className="px-4 py-3 font-semibold">{item.titulo}</td>
                                    <td className="px-4 py-3">{item.descripcion ?? "—"}</td>
                                    <td className="px-4 py-3">{item.estado}</td>
                                    <td className="px-4 py-3">{item.fechaDeInicio}</td>
                                    <td className="px-4 py-3">{item.fechaDeFinalizacion}</td>
                                    <td className="px-4 py-3">
                                        <Button variant="danger" className="py-3 mr-2" onClick={() => deleteMeta(item.id)}>Eliminar</Button>
                                        <Button onClick={() => navegateToEditarMetasPage(item.id)}>Editar</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}