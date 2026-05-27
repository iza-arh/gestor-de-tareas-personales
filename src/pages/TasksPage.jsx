import { useState } from "react";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { useTasks } from "../hooks/useTasks";

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

  const handleSubmit = (taskData) => {
    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
      setTaskToEdit(null);
      return;
    }

    createTask(taskData);
  };

  return (
    <section className="flex w-full max-w-6xl flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#9b4f4f]">
          Universidad de El Salvador
        </p>
        <h1 className="mt-1 text-4xl font-bold text-[#211916]">Tareas</h1>
        <p className="mt-3 max-w-3xl text-lg text-[#5f4a42]">
          Aplicacion en React para crear, consultar, actualizar y eliminar
          tareas con persistencia en localStorage.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(320px,440px)_1fr]">
        <TaskForm
          key={taskToEdit?.id || "new-task"}
          onCancelEdit={() => setTaskToEdit(null)}
          onSubmit={handleSubmit}
          taskToEdit={taskToEdit}
        />

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-[#dfd4cc] bg-[#fffaf6] p-5 shadow-[0_10px_28px_rgba(80,57,48,0.08)]">
            <p className="text-sm font-medium text-[#7b6259]">Total de tareas</p>
            <p className="text-4xl font-bold text-[#211916]">{tasks.length}</p>
          </div>

          <TaskFilters
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />

          <TaskList
            onChangeStatus={updateTaskStatus}
            onDelete={deleteTask}
            onEdit={setTaskToEdit}
            tasks={filteredTasks}
          />
        </div>
      </div>
    </section>
  );
}
