import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";

export default function MapaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d145a0603afa048d0d626baeaa07e908&units=metric`
      );
      if (!res.ok) {
        throw new Error("No se pudo obtener el clima");
      }
      const data = await res.json();
      setWeatherData(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    if (!city) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d145a0603afa048d0d626baeaa07e908&units=metric`
      );
      if (!res.ok) {
        throw new Error("Ciudad no encontrada");
      }
      const data = await res.json();
      setWeatherData(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.L) return;

    if (!mapRef.current) {
      const map = window.L.map("map-container").setView([13.69, -89.21], 8);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "OpenStreetMap"
      }).addTo(map);

      const marker = window.L.marker([13.69, -89.21]).addTo(map);

      mapRef.current = map;
      markerRef.current = marker;

      fetchWeatherByCoords(13.69, -89.21).then((data) => {
        if (data && data.name) {
          marker.bindPopup(`<b>${data.name}</b><br>${data.main.temp} C`).openPopup();
        }
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 10);
            marker.setLatLng([latitude, longitude]);
            const data = await fetchWeatherByCoords(latitude, longitude);
            if (data && data.name) {
              marker.bindPopup(`<b>${data.name}</b><br>${data.main.temp} C`).openPopup();
            }
          },
          () => {
            setError("No se pudo obtener la ubicacion del dispositivo");
          }
        );
      }

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        const data = await fetchWeatherByCoords(lat, lng);
        if (data && data.name) {
          marker.bindPopup(`<b>${data.name}</b><br>${data.main.temp} C`).openPopup();
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await fetchWeatherByCity(searchQuery);
    if (data && data.coord) {
      const { lat, lon } = data.coord;
      if (mapRef.current && markerRef.current) {
        mapRef.current.setView([lat, lon], 10);
        markerRef.current.setLatLng([lat, lon]);
        markerRef.current.bindPopup(`<b>${data.name}</b><br>${data.main.temp} C`).openPopup();
      }
    }
  };

  return (
    <section className="flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Universidad de El Salvador
          </p>
          <h1 className="mt-1 text-4xl font-bold text-foreground">Mapa</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar ciudad"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-divider bg-content1 text-foreground focus:outline-none"
          />
          <Button type="submit" color="primary">
            Buscar
          </Button>
        </form>

        {error && (
          <div className="p-4 bg-danger-50 text-danger rounded-xl border border-danger-200">
            {error}
          </div>
        )}

        {loading && (
          <div className="p-4 bg-default-50 text-default-600 rounded-xl">
            Cargando
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div
              id="map-container"
              className="h-[500px] w-full rounded-xl border border-divider shadow-sm z-10"
            />
          </div>
          <div>
            {weatherData ? (
              <div className="rounded-xl border border-divider bg-content1 p-6 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Ubicacion: {weatherData.name}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-default-50 rounded-lg">
                      <p className="text-xs text-default-500 uppercase font-semibold">
                        Temperatura
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {weatherData.main.temp} C
                      </p>
                    </div>
                    <div className="p-4 bg-default-50 rounded-lg">
                      <p className="text-xs text-default-500 uppercase font-semibold">
                        Sensacion Termica
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {weatherData.main.feels_like} C
                      </p>
                    </div>
                    <div className="p-4 bg-default-50 rounded-lg">
                      <p className="text-xs text-default-500 uppercase font-semibold">
                        Humedad
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {weatherData.main.humidity}%
                      </p>
                    </div>
                    <div className="p-4 bg-default-50 rounded-lg">
                      <p className="text-xs text-default-500 uppercase font-semibold">
                        Viento
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {weatherData.wind.speed} m/s
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-divider bg-content1 p-6 shadow-sm h-full flex items-center justify-center text-center text-default-500">
                Selecciona una ubicacion en el mapa o busca una ciudad
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
