import { useState, useEffect, useRef } from "react";
import { TASK_STATUS } from "../../hooks/useTasks";

const statusLabels = {
  [TASK_STATUS.pending]: "Pendiente",
  [TASK_STATUS.inProgress]: "En proceso",
  [TASK_STATUS.completed]: "Completada",
};

const priorityLabels = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};

const statusStyles = {
  [TASK_STATUS.pending]: "bg-warning/20 text-warning-700",
  [TASK_STATUS.inProgress]: "bg-primary/15 text-primary",
  [TASK_STATUS.completed]: "bg-success/20 text-success-700",
};

function WeatherMap({ lat, lon, ubicacion }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const L = window.L;
    if (!L) return;

    const map = L.map(mapContainerRef.current).setView([lat, lon], 9);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OpenStreetMap"
    }).addTo(map);

    const apiKey1 = "d145a0603afa048d0d626baeaa07e908d145a0603afa048d0d626baeaa07e908";
    const apiKey2 = "d145a0603afa048d0d626baeaa07e908";
    const keyToUse = apiKey1.length > 32 ? apiKey1.substring(0, 32) : apiKey1;

    L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${keyToUse}`).addTo(map);
    L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${keyToUse}`).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup(ubicacion).openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lon, ubicacion]);

  return (
    <div 
      ref={mapContainerRef} 
      className="mt-3 h-48 w-full rounded-lg border border-divider overflow-hidden" 
      style={{ minHeight: "192px", position: "relative", zIndex: 1 }}
    />
  );
}

function TaskWeather({ ubicacion, fechaVencimiento }) {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ubicacion) return;

    setCargando(true);
    setError(false);

    const apiKey1 = "d145a0603afa048d0d626baeaa07e908d145a0603afa048d0d626baeaa07e908";
    const apiKey2 = "d145a0603afa048d0d626baeaa07e908";

    const obtenerPronostico = async () => {
      try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(ubicacion)}&appid=${apiKey1}&units=metric`);
        if (!res.ok) {
          res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(ubicacion)}&appid=${apiKey2}&units=metric`);
        }
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        
        const pronosticosDia = data.list.filter((item) =>
          item.dt_txt.startsWith(fechaVencimiento)
        );

        let vaALlover = false;
        let temp = "";
        let desc = "";

        if (pronosticosDia.length > 0) {
          const llovizna = pronosticosDia.find((item) => {
            const id = item.weather?.[0]?.id;
            return id && (String(id).startsWith("2") || String(id).startsWith("3") || String(id).startsWith("5"));
          });
          if (llovizna) {
            vaALlover = true;
          }
          temp = pronosticosDia[0].main.temp;
          desc = pronosticosDia[0].weather?.[0]?.description || "";
        } else {
          const lloviznaGeneral = data.list.some((item) => {
            const id = item.weather?.[0]?.id;
            return id && (String(id).startsWith("2") || String(id).startsWith("3") || String(id).startsWith("5"));
          });
          if (lloviznaGeneral) {
            vaALlover = true;
          }
          if (data.list.length > 0) {
            temp = data.list[0].main.temp;
            desc = data.list[0].weather?.[0]?.description || "";
          }
        }

        setClima({
          temp,
          desc,
          vaALlover,
          rangoFuera: pronosticosDia.length === 0,
          lat: data.city?.coord?.lat,
          lon: data.city?.coord?.lon,
        });
      } catch (err) {
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    obtenerPronostico();
  }, [ubicacion, fechaVencimiento]);

  if (cargando) {
    return (
      <div className="mt-2 text-xs text-default-500">
        Cargando pronostico del clima...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 text-xs text-danger">
        No se pudo obtener el pronostico del clima
      </div>
    );
  }

  if (!clima) return null;

  return (
    <div className="mt-3 rounded-lg bg-default-100 p-3 text-xs text-default-700">
      <div className="font-semibold text-default-900">
        Clima en {ubicacion}: {clima.temp ? `${clima.temp} grados` : ""} - {clima.desc}
      </div>
      {clima.vaALlover ? (
        <div className="mt-1 font-bold text-danger">
          Alerta: Se pronostica lluvia para esta ubicacion
        </div>
      ) : (
        <div className="mt-1 text-success font-medium">
          No se pronostica lluvia para esta ubicacion
        </div>
      )}
      {clima.rangoFuera && (
        <div className="mt-1 text-default-400 text-[10px]">
          Nota: La fecha de la tarea esta fuera del rango de 5 dias. Se muestra clima proximo disponible.
        </div>
      )}
      {clima.lat && clima.lon && (
        <WeatherMap lat={clima.lat} lon={clima.lon} ubicacion={ubicacion} />
      )}
    </div>
  );
}

export default function TaskItem({
  categoryName,
  metaTitle,
  task,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <article className="rounded-xl border border-divider bg-content1 p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-xl font-semibold text-foreground">{task.titulo}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.estado]}`}
            >
              {statusLabels[task.estado]}
            </span>
          </div>

          {task.descripcion && (
            <p className="mt-3 break-words text-sm text-default-600">
              {task.descripcion}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-default-500">
            <span>Vence: {task.fechaVencimiento}</span>
            <span>Prioridad: {priorityLabels[task.prioridad]}</span>
            <span>Meta: {metaTitle || "Sin meta asociada"}</span>
            <span>Categoria: {categoryName || "Sin categoria asociada"}</span>
            {task.ubicacion && (
              <span>Ubicacion: {task.ubicacion} {task.esAfuera ? "(Afuera)" : "(Adentro)"}</span>
            )}
          </div>

          {task.esAfuera && task.ubicacion && (
            <TaskWeather ubicacion={task.ubicacion} fechaVencimiento={task.fechaVencimiento} />
          )}
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <select
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            onChange={(event) => onChangeStatus(task.id, event.target.value)}
            value={task.estado}
          >
            <option value={TASK_STATUS.pending}>Pendiente</option>
            <option value={TASK_STATUS.inProgress}>En proceso</option>
            <option value={TASK_STATUS.completed}>Completada</option>
          </select>

          <button
            className="rounded-lg border border-divider px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-default-100"
            onClick={() => onEdit(task)}
            type="button"
          >
            Editar
          </button>

          <button
            className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-danger-foreground transition hover:opacity-90"
            onClick={() => onDelete(task.id)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
