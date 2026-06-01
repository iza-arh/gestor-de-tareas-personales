import MetasForm from "../../components/metas/MetasForm"
import { saveMetas } from "../../services/metasServices";

export default function crearMetaPage() {

    const handleCreateMeta = (formData) => {
       saveMetas(formData);
    };

    return (
        <>
            <MetasForm
                formTitle="Crear Nueva Meta"
                onSubmitAction={handleCreateMeta}>
            </MetasForm>
        </>
    )
}