import MetricCard from "../../components/common/MetricCard"
import { returnTotalDeMetas } from "../../services/metasServices"
import { returnCantidadDeSubMetas } from "../../services/metasServices";

export default function MetasDashboardPage() {
    const totalDeMetas = returnTotalDeMetas();
    const metasFinalizadas = returnCantidadDeSubMetas("finalizada")
    const metasPendientes = returnCantidadDeSubMetas("pendiente")
    const metasEnProceso = returnCantidadDeSubMetas("en proceso")

    return (
        <div className="w-4/5">
            <div className="flex space-x-4 justify-self-center">
                <MetricCard label={"Metas Finalizadas"} totalRecords={totalDeMetas}
                    subRecords={metasFinalizadas} color={"#00C68D"} className="mr-3"></MetricCard>
                <MetricCard label={"Metas En proceso"} totalRecords={totalDeMetas}
                    subRecords={metasEnProceso} color={"#0055DA"}></MetricCard>
                <MetricCard label={"Metas pendientes"} totalRecords={totalDeMetas}
                    subRecords={metasPendientes} color={"#FFD400"}></MetricCard>
            </div>
        </div>
    )
}