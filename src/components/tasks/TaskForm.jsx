import { useState } from "react";
import { TASK_PRIORITIES, TASK_STATUS } from "../../hooks/useTasks";

const initialFormState = {
  titulo: "",
  descripcion: "",
  fechaVencimiento: "",
  estado: TASK_STATUS.pending,
  prioridad: TASK_PRIORITIES.medium,
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
  };
}

export default function TaskForm({ taskToEdit, onSubmit, onCancelEdit }) {
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
      className="rounded-xl border border-[#dfd4cc] bg-[#fffaf6] p-7 shadow-[0_10px_28px_rgba(80,57,48,0.08)]"
      onSubmit={handleSubmit}
    >
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-[#211916]">
          {taskToEdit ? "Editar tarea" : "Nueva tarea"}
        </h2>
        <p className="text-sm text-[#7b6259]">
          Registra titulo, descripcion, fecha, estado y prioridad.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-[#2f2521]">
          Titulo
          <input
            className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition placeholder:text-[#8c817b] focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
            maxLength={60}
            name="titulo"
            onChange={handleChange}
            placeholder="Estudiar React"
            value={formData.titulo}
          />
          {errors.titulo && (
            <span className="text-xs text-[#b44242]">{errors.titulo}</span>
          )}
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[#2f2521]">
          Fecha de vencimiento
          <input
            className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
            name="fechaVencimiento"
            onChange={handleChange}
            type="date"
            value={formData.fechaVencimiento}
          />
          {errors.fechaVencimiento && (
            <span className="text-xs text-[#b44242]">
              {errors.fechaVencimiento}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[#2f2521]">
          Estado
          <select
            className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
            name="estado"
            onChange={handleChange}
            value={formData.estado}
          >
            <option value={TASK_STATUS.pending}>Pendiente</option>
            <option value={TASK_STATUS.inProgress}>En proceso</option>
            <option value={TASK_STATUS.completed}>Completada</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[#2f2521]">
          Prioridad
          <select
            className="rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
            name="prioridad"
            onChange={handleChange}
            value={formData.prioridad}
          >
            <option value={TASK_PRIORITIES.low}>Baja</option>
            <option value={TASK_PRIORITIES.medium}>Media</option>
            <option value={TASK_PRIORITIES.high}>Alta</option>
          </select>
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-[#2f2521]">
        Descripcion
        <textarea
          className="min-h-32 resize-y rounded-lg border border-[#d8ccc3] bg-[#fdf8f3] px-4 py-3 outline-none transition placeholder:text-[#8c817b] focus:border-[#9b4f4f] focus:ring-2 focus:ring-[#d9aaa5]"
          maxLength={280}
          name="descripcion"
          onChange={handleChange}
          placeholder="Describe brevemente la tarea"
          value={formData.descripcion}
        />
        <span className="text-xs text-[#7b6259]">
          Caracteres: {formData.descripcion.length} / 280
        </span>
        {errors.descripcion && (
          <span className="text-xs text-[#b44242]">{errors.descripcion}</span>
        )}
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="rounded-lg bg-[#8f5d4c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7d4f41]"
          type="submit"
        >
          {taskToEdit ? "Guardar cambios" : "Agregar tarea"}
        </button>

        {taskToEdit && (
          <button
            className="rounded-lg border border-[#d8ccc3] px-5 py-3 text-sm font-semibold text-[#3d302b] transition hover:bg-[#f1e7df]"
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
