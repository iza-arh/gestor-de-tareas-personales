import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMeta } from "../../services/metasServices"
import MetasForm from "../../components/metas/MetasForm"

export default function EditarMetasPage({ idMeta }) {

    let metaToEdit = getMeta(idMeta)

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