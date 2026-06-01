import MetricCard from "../../components/common/MetricCard"
import { returnTotalDeMetas } from "../../services/metasServices"
import { returnCantidadDeSubMetas } from "../../services/metasServices";
import CommonPieChart from "../../components/common/CommonPieChart";
import CommonBarChart from "../../components/common/CommonBarChart";
import { returnMetasPorMes } from "../../services/metasServices";

export default function MetasDashboardPage() {
    const totalDeMetas = returnTotalDeMetas();
    const metasFinalizadas = returnCantidadDeSubMetas("finalizada")
    const metasPendientes = returnCantidadDeSubMetas("pendiente")
    const metasEnProceso = returnCantidadDeSubMetas("en-proceso")

    const data = [
        { name: 'Finalizadas', value: metasFinalizadas },
        { name: 'En progreso', value: metasEnProceso },
        { name: 'Pendientes', value: metasPendientes },
    ];

    const numeroDeMetasPorMes = [
        { name: 'Enero', value: returnMetasPorMes("01") },
        { name: 'Febrero', value: returnMetasPorMes("02") },
        { name: 'Marzo', value: returnMetasPorMes("03") },
        { name: 'Abril', value: returnMetasPorMes("04") },
        { name: 'Mayo', value: returnMetasPorMes("05") },
        { name: 'Junio', value: returnMetasPorMes("06") },
        { name: 'Julio', value: returnMetasPorMes("07") },
        { name: 'Agosto', value: returnMetasPorMes("08") },
        { name: 'Septiembre', value: returnMetasPorMes("09") },
        { name: 'Octubre', value: returnMetasPorMes("10") },
        { name: 'Noviembre', value: returnMetasPorMes("11") },
        { name: 'Diciembre', value: returnMetasPorMes("12") },
    ];

    return (
        <div className="w-4/5 space-y-4 flex flex-col items-center">
            <div className="flex space-x-4">
                <MetricCard label={"Metas Finalizadas"} totalRecords={totalDeMetas}
                    subRecords={metasFinalizadas} color={"#00C68D"} className="mr-3"></MetricCard>
                <MetricCard label={"Metas En proceso"} totalRecords={totalDeMetas}
                    subRecords={metasEnProceso} color={"#0055DA"}></MetricCard>
                <MetricCard label={"Metas pendientes"} totalRecords={totalDeMetas}
                    subRecords={metasPendientes} color={"#FFD400"}></MetricCard>
            </div>

            <CommonPieChart metasData={data}></CommonPieChart>
            <CommonBarChart metasData={numeroDeMetasPorMes}></CommonBarChart>
        </div>
    )
}