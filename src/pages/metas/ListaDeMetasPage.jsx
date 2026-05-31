import MetasList from "../../components/metas/MetasList"
import { getMetas, deleteMeta } from "../../services/metasServices";
import { useState, useEffect } from "react";

export default function ListaDeMetasPage() {
    const [metas, setMetas] = useState([]);

    useEffect(() => {
        try {
            const storedMetas = getMetas();
            if (storedMetas) {
                setMetas(storedMetas);
            }
        } catch (error) {
            console.error("Falla al intentar cargas metas:", error);
        }
    }, []);

    function handleDelete(idMeta) {
        deleteMeta(idMeta)
        setMetas(getMetas())
    }

    return (
        <MetasList
            metasData={metas}
            deleteMeta={handleDelete}
        ></MetasList>
    )
}