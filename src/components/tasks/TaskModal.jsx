import TaskForm from "./TaskForm";

export default function TaskModal({
  categorias,
  isOpen,
  metas,
  onClose,
  onSubmit,
  taskToEdit,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-background p-4 shadow-2xl">
        <div className="mb-3 flex justify-end">
          <button
            aria-label="Cerrar formulario"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-default-100 text-xl font-semibold text-default-600 transition hover:bg-default-200"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <TaskForm
          key={taskToEdit?.id || "new-task"}
          categorias={categorias}
          metas={metas}
          onCancelEdit={onClose}
          onSubmit={onSubmit}
          taskToEdit={taskToEdit}
        />
      </div>
    </div>
  );
}
