import { TASK_STATUS } from "../../hooks/useTasks";

export default function TaskFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#dfd4cc] bg-[#fffaf6] p-5 shadow-[0_10px_28px_rgba(80,57,48,0.08)] md:flex-row md:items-end">
      <label className="flex flex-1 flex-col gap-2 text-sm font-semibold text-[#2f2521]">
        Buscar tarea
        <input
          className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition placeholder:text-[#8c817b] focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por titulo o descripcion"
          value={searchTerm}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-[#2f2521] md:w-64">
        Filtrar por estado
        <select
          className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
          onChange={(event) => onStatusFilterChange(event.target.value)}
          value={statusFilter}
        >
          <option value="todas">Todas</option>
          <option value={TASK_STATUS.pending}>Pendientes</option>
          <option value={TASK_STATUS.inProgress}>En proceso</option>
          <option value={TASK_STATUS.completed}>Completadas</option>
        </select>
      </label>
    </div>
  );
}
