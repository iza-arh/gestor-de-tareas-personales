import { useMemo, useState } from "react";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import TaskModal from "../components/tasks/TaskModal";
import { useTasks } from "../hooks/useTasks";
import { getMetas } from "../services/metasServices";
import { getCategorias } from "../services/categoriasServices";
import { Button } from "@heroui/react";

export default function TasksPage() {
  const {
    tasks,
    filteredTasks,
    statusFilter,
    searchTerm,
    setStatusFilter,
    setSearchTerm,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const metas = useMemo(() => getMetas(), []);
  const categorias = useMemo(() => getCategorias(), []);
  const metasById = useMemo(
    () =>
      metas.reduce((accumulator, meta) => {
        accumulator[meta.id] = meta;
        return accumulator;
      }, {}),
    [metas]
  );
  const categoriasById = useMemo(
    () =>
      categorias.reduce((accumulator, categoria) => {
        accumulator[categoria.id] = categoria;
        return accumulator;
      }, {}),
    [categorias]
  );

  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(false);
  };

  const handleSubmit = (taskData) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
      closeTaskModal();
      return;
    }

    createTask(taskData);
    closeTaskModal();
  };

  return (
    <section className="flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Universidad de El Salvador
          </p>
          <h1 className="mt-1 text-4xl font-bold text-foreground">Tareas</h1>
        </div>

        <Button
          color="primary"
          className="px-5 py-3 font-semibold shadow-sm"
          onClick={openCreateModal}
          type="button"
        >
          Nueva tarea
        </Button>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        categorias={categorias}
        metas={metas}
        onClose={closeTaskModal}
        onSubmit={handleSubmit}
        taskToEdit={taskToEdit}
      />

      <div className="grid gap-8">
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-divider bg-content1 p-5 shadow-sm">
            <p className="text-sm font-medium text-default-500">Total de tareas</p>
            <p className="text-4xl font-bold text-foreground">{tasks.length}</p>
          </div>

          <TaskFilters
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />

          <TaskList
            categoriasById={categoriasById}
            metasById={metasById}
            onChangeStatus={updateTaskStatus}
            onDelete={deleteTask}
            onEdit={openEditModal}
            tasks={filteredTasks}
          />
        </div>
      </div>
    </section>
  );
}
