import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMeta } from "../../services/metasServices"
import MetasForm from "../../components/metas/MetasForm"

export default function EditarMetasPage() {
    const { id } = useParams();
    let metaToEdit = getMeta(id)

    const handleEditarMeta = () => {
    };

    return (
        <MetasForm
            formTitle="Editar Meta"
            onSubmitAction={handleEditarMeta}
            initialData={metaToEdit}
        ></MetasForm>
    )
}