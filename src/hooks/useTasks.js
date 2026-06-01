import { useEffect, useMemo, useState } from "react";
import { getStoredTasks, saveStoredTasks } from "../services/taskStorage";

export const TASK_STATUS = {
  pending: "pendiente",
  inProgress: "en-proceso",
  completed: "completada",
};

export const TASK_PRIORITIES = {
  low: "baja",
  medium: "media",
  high: "alta",
};

function createTaskId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 11);
}

export function useTasks() {
  const [tasks, setTasks] = useState(() => getStoredTasks());
  const [statusFilter, setStatusFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "todas" || task.estado === statusFilter;
      const matchesSearch =
        !normalizedSearch ||
        task.titulo.toLowerCase().includes(normalizedSearch) ||
        task.descripcion.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, searchTerm, statusFilter]);

  const createTask = (taskData) => {
    const now = new Date().toISOString();
    const newTask = {
      id: createTaskId(),
      titulo: taskData.titulo.trim(),
      descripcion: taskData.descripcion.trim(),
      fechaVencimiento: taskData.fechaVencimiento,
      estado: taskData.estado,
      prioridad: taskData.prioridad,
      metaId: taskData.metaId || "",
      creadaEn: now,
      actualizadaEn: now,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const updateTask = (taskId, taskData) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...taskData,
              titulo: taskData.titulo.trim(),
              descripcion: taskData.descripcion.trim(),
              actualizadaEn: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const updateTaskStatus = (taskId, estado) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, estado, actualizadaEn: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  return {
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
  };
}
