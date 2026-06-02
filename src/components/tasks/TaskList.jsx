import TaskItem from "./TaskItem";

export default function TaskList({
  metasById,
  tasks,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-divider bg-content1 p-8 text-center text-default-500">
        No hay tareas para mostrar.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          metaTitle={metasById[task.metaId]?.titulo}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
          onEdit={onEdit}
          task={task}
        />
      ))}
    </div>
  );
}
