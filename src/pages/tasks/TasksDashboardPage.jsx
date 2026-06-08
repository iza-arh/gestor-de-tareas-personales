import CommonBarChart from "../../components/common/CommonBarChart";
import CommonPieChart from "../../components/common/CommonPieChart";
import MetricCard from "../../components/common/MetricCard";
import { TASK_STATUS } from "../../hooks/useTasks";
import { getStoredTasks } from "../../services/taskStorage";

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function TasksDashboardPage() {
  const tasks = getStoredTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.estado === TASK_STATUS.completed
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.estado === TASK_STATUS.inProgress
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.estado === TASK_STATUS.pending
  ).length;
  const tasksWithGoal = tasks.filter((task) => task.metaId).length;

  const statusData = [
    { name: "Completadas", value: completedTasks },
    { name: "En proceso", value: inProgressTasks },
    { name: "Pendientes", value: pendingTasks },
  ];

  const tasksByMonth = MONTH_NAMES.map((name, index) => ({
    name,
    value: tasks.filter((task) => {
      if (!task.fechaVencimiento) {
        return false;
      }

      const month = Number(task.fechaVencimiento.split("-")[1]);
      return month === index + 1;
    }).length,
  }));

  return (
    <section className="flex w-full max-w-6xl flex-col gap-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Dashboard
        </p>
        <h1 className="mt-1 text-3xl font-bold text-foreground">
          Métricas de tareas
        </h1>
        <p className="mt-2 text-default-600">
          Consulta el avance, distribución y vencimiento mensual de las tareas.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Total de tareas"
          subRecords={totalTasks}
          totalRecords={totalTasks}
          color="#FFFFFF"
        />
        <MetricCard
          label="Completadas"
          subRecords={completedTasks}
          totalRecords={totalTasks}
          color="#00C68D"
        />
        <MetricCard
          label="En proceso"
          subRecords={inProgressTasks}
          totalRecords={totalTasks}
          color="#0055DA"
        />
        <MetricCard
          label="Pendientes"
          subRecords={pendingTasks}
          totalRecords={totalTasks}
          color="#FFD400"
        />
        <MetricCard
          label="Asociadas a metas"
          subRecords={tasksWithGoal}
          totalRecords={totalTasks}
          color="#A78BFA"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-divider bg-content1 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Distribución por estado
          </h2>
          <CommonPieChart metasData={statusData} />
        </div>

        <div className="rounded-xl border border-divider bg-content1 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Tareas por mes de vencimiento
          </h2>
          <CommonBarChart metasData={tasksByMonth} />
        </div>
      </div>
    </section>
  );
}
