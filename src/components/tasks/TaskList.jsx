import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#d8ccc3] bg-[#fffaf6] p-8 text-center text-[#7b6259]">
        No hay tareas para mostrar.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
          onEdit={onEdit}
          task={task}
        />
      ))}
    </div>
  );
}
