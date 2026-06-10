import { TASK_STATUS } from "../../hooks/useTasks";

const statusLabels = {
  [TASK_STATUS.pending]: "Pendiente",
  [TASK_STATUS.inProgress]: "En proceso",
  [TASK_STATUS.completed]: "Completada",
};

const priorityLabels = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};

const statusStyles = {
  [TASK_STATUS.pending]: "bg-warning/20 text-warning-700",
  [TASK_STATUS.inProgress]: "bg-primary/15 text-primary",
  [TASK_STATUS.completed]: "bg-success/20 text-success-700",
};

export default function TaskItem({
  categoryName,
  metaTitle,
  task,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <article className="rounded-xl border border-divider bg-content1 p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-xl font-semibold text-foreground">{task.titulo}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.estado]}`}
            >
              {statusLabels[task.estado]}
            </span>
          </div>

          {task.descripcion && (
            <p className="mt-3 break-words text-sm text-default-600">
              {task.descripcion}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-default-500">
            <span>Vence: {task.fechaVencimiento}</span>
            <span>Prioridad: {priorityLabels[task.prioridad]}</span>
            <span>Meta: {metaTitle || "Sin meta asociada"}</span>
            <span>Categoría: {categoryName || "Sin categoría asociada"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <select
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            onChange={(event) => onChangeStatus(task.id, event.target.value)}
            value={task.estado}
          >
            <option value={TASK_STATUS.pending}>Pendiente</option>
            <option value={TASK_STATUS.inProgress}>En proceso</option>
            <option value={TASK_STATUS.completed}>Completada</option>
          </select>

          <button
            className="rounded-lg border border-divider px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-default-100"
            onClick={() => onEdit(task)}
            type="button"
          >
            Editar
          </button>

          <button
            className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-danger-foreground transition hover:opacity-90"
            onClick={() => onDelete(task.id)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
