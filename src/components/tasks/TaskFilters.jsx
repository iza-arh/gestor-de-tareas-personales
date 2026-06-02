import { TASK_STATUS } from "../../hooks/useTasks";

export default function TaskFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-divider bg-content1 p-5 shadow-sm md:flex-row md:items-end">
      <label className="flex flex-1 flex-col gap-2 text-sm font-semibold text-foreground">
        Buscar tarea
        <input
          className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por titulo o descripcion"
          value={searchTerm}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold text-foreground md:w-64">
        Filtrar por estado
        <select
          className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
