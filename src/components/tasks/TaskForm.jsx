import { useState } from "react";
import { TASK_PRIORITIES, TASK_STATUS } from "../../hooks/useTasks";

const initialFormState = {
  titulo: "",
  descripcion: "",
  fechaVencimiento: "",
  estado: TASK_STATUS.pending,
  prioridad: TASK_PRIORITIES.medium,
  metaId: "",
};

function getInitialFormState(taskToEdit) {
  if (!taskToEdit) {
    return initialFormState;
  }

  return {
    titulo: taskToEdit.titulo,
    descripcion: taskToEdit.descripcion,
    fechaVencimiento: taskToEdit.fechaVencimiento,
    estado: taskToEdit.estado,
    prioridad: taskToEdit.prioridad,
    metaId: taskToEdit.metaId || "",
  };
}

export default function TaskForm({ metas = [], taskToEdit, onSubmit, onCancelEdit }) {
  const [formData, setFormData] = useState(() =>
    getInitialFormState(taskToEdit)
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const today = new Date().toISOString().slice(0, 10);

    if (!formData.titulo.trim()) {
      nextErrors.titulo = "El titulo es obligatorio.";
    } else if (formData.titulo.trim().length < 3) {
      nextErrors.titulo = "El titulo debe tener al menos 3 caracteres.";
    }

    if (formData.descripcion.length > 280) {
      nextErrors.descripcion = "La descripcion no puede superar 280 caracteres.";
    }

    if (!formData.fechaVencimiento) {
      nextErrors.fechaVencimiento = "La fecha de vencimiento es obligatoria.";
    } else if (formData.fechaVencimiento < today) {
      nextErrors.fechaVencimiento = "La fecha no puede ser anterior a hoy.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setFormData(initialFormState);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setErrors({});
    onCancelEdit();
  };

  return (
    <form
      className="rounded-xl border border-divider bg-content1 p-7 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">
          {taskToEdit ? "Editar tarea" : "Nueva tarea"}
        </h2>
        <p className="text-sm text-default-500">
          Registra titulo, descripcion, fecha, estado, prioridad y meta relacionada.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Titulo
          <input
            className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
            maxLength={60}
            name="titulo"
            onChange={handleChange}
            placeholder="Estudiar React"
            value={formData.titulo}
          />
          {errors.titulo && (
            <span className="text-xs text-danger">{errors.titulo}</span>
          )}
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Fecha de vencimiento
          <input
            className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            name="fechaVencimiento"
            onChange={handleChange}
            type="date"
            value={formData.fechaVencimiento}
          />
          {errors.fechaVencimiento && (
            <span className="text-xs text-danger">
              {errors.fechaVencimiento}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Estado
          <select
            className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            name="estado"
            onChange={handleChange}
            value={formData.estado}
          >
            <option value={TASK_STATUS.pending}>Pendiente</option>
            <option value={TASK_STATUS.inProgress}>En proceso</option>
            <option value={TASK_STATUS.completed}>Completada</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Prioridad
          <select
            className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            name="prioridad"
            onChange={handleChange}
            value={formData.prioridad}
          >
            <option value={TASK_PRIORITIES.low}>Baja</option>
            <option value={TASK_PRIORITIES.medium}>Media</option>
            <option value={TASK_PRIORITIES.high}>Alta</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground md:col-span-2">
          Meta relacionada
          <select
            className="rounded-lg border border-divider bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            name="metaId"
            onChange={handleChange}
            value={formData.metaId}
          >
            <option value="">Sin meta asociada</option>
            {metas.map((meta) => (
              <option key={meta.id} value={meta.id}>
                {meta.titulo}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-foreground">
        Descripcion
        <textarea
          className="min-h-32 resize-y rounded-lg border border-divider bg-background px-4 py-3 outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
          maxLength={280}
          name="descripcion"
          onChange={handleChange}
          placeholder="Describe brevemente la tarea"
          value={formData.descripcion}
        />
        <span className="text-xs text-default-500">
          Caracteres: {formData.descripcion.length} / 280
        </span>
        {errors.descripcion && (
          <span className="text-xs text-danger">{errors.descripcion}</span>
        )}
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          type="submit"
        >
          {taskToEdit ? "Guardar cambios" : "Agregar tarea"}
        </button>

        {taskToEdit && (
          <button
            className="rounded-lg border border-divider px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-default-100"
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
