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
  [TASK_STATUS.pending]: "bg-[#f5dfbd] text-[#6f4b24]",
  [TASK_STATUS.inProgress]: "bg-[#ded7d0] text-[#4e403a]",
  [TASK_STATUS.completed]: "bg-[#f1c7c3] text-[#8b3434]",
};

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <article className="rounded-xl border border-[#dfd4cc] bg-[#fffaf6] p-5 shadow-[0_10px_28px_rgba(80,57,48,0.08)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-xl font-semibold text-[#211916]">{task.titulo}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.estado]}`}
            >
              {statusLabels[task.estado]}
            </span>
          </div>

          {task.descripcion && (
            <p className="mt-3 break-words text-sm text-[#5f4a42]">
              {task.descripcion}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-[#7b6259]">
            <span>Vence: {task.fechaVencimiento}</span>
            <span>Prioridad: {priorityLabels[task.prioridad]}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <select
            className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-3 py-2 text-sm outline-none transition focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
            onChange={(event) => onChangeStatus(task.id, event.target.value)}
            value={task.estado}
          >
            <option value={TASK_STATUS.pending}>Pendiente</option>
            <option value={TASK_STATUS.inProgress}>En proceso</option>
            <option value={TASK_STATUS.completed}>Completada</option>
          </select>

          <button
            className="rounded-lg border border-[#d8ccc3] px-4 py-2 text-sm font-semibold text-[#3d302b] transition hover:bg-[#f1e7df]"
            onClick={() => onEdit(task)}
            type="button"
          >
            Editar
          </button>

          <button
            className="rounded-lg bg-[#d95555] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#bf4444]"
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
