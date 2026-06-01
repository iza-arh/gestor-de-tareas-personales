import MetricCard from "../../components/common/MetricCard"
import { returnTotalDeMetas } from "../../services/metasServices"
import { returnCantidadDeSubMetas } from "../../services/metasServices";
import CommonPieChart from "../../components/common/CommonPieChart";
import CommonBarChart from "../../components/common/CommonBarChart";
import { returnMetasPorMes } from "../../services/metasServices";
import { getStoredTasks } from "../../services/taskStorage";
import { TASK_STATUS } from "../../hooks/useTasks";

export default function MetasDashboardPage() {
    const totalDeMetas = returnTotalDeMetas();
    const metasFinalizadas = returnCantidadDeSubMetas("finalizada")
    const metasPendientes = returnCantidadDeSubMetas("pendiente")
    const metasEnProceso = returnCantidadDeSubMetas("en-proceso")
    const tasks = getStoredTasks();
    const totalDeTareas = tasks.length;
    const tareasFinalizadas = tasks.filter(task => task.estado === TASK_STATUS.completed).length;
    const tareasPendientes = tasks.filter(task => task.estado === TASK_STATUS.pending).length;
    const tareasEnProceso = tasks.filter(task => task.estado === TASK_STATUS.inProgress).length;
    const tareasConMeta = tasks.filter(task => task.metaId).length;

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

    const tareasData = [
        { name: 'Completadas', value: tareasFinalizadas },
        { name: 'En proceso', value: tareasEnProceso },
        { name: 'Pendientes', value: tareasPendientes },
    ];

    return (
        <div className="w-full space-y-8 flex flex-col items-center">
            <section className="w-full space-y-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dashboard</p>
                    <h1 className="text-3xl font-bold text-foreground">Metas y tareas</h1>
                    <p className="text-default-600">Resumen sincronizado del avance de metas y tareas asociadas.</p>
                </div>
            </section>

            <div className="flex flex-wrap justify-center gap-4">
                <MetricCard label={"Metas Finalizadas"} totalRecords={totalDeMetas}
                    subRecords={metasFinalizadas} color={"#00C68D"} className="mr-3"></MetricCard>
                <MetricCard label={"Metas En proceso"} totalRecords={totalDeMetas}
                    subRecords={metasEnProceso} color={"#0055DA"}></MetricCard>
                <MetricCard label={"Metas pendientes"} totalRecords={totalDeMetas}
                    subRecords={metasPendientes} color={"#FFD400"}></MetricCard>
                <MetricCard label={"Tareas completadas"} totalRecords={totalDeTareas}
                    subRecords={tareasFinalizadas} color={"#00C68D"}></MetricCard>
                <MetricCard label={"Tareas con meta"} totalRecords={totalDeTareas}
                    subRecords={tareasConMeta} color={"#0055DA"}></MetricCard>
            </div>

            <CommonPieChart metasData={data}></CommonPieChart>
            <CommonPieChart metasData={tareasData}></CommonPieChart>
            <CommonBarChart metasData={numeroDeMetasPorMes}></CommonBarChart>
        </div>
    )
}
