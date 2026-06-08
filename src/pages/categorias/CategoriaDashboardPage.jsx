import React, { useState, useEffect} from "react";
import MetricCard from "../../components/common/MetricCard";
import CommonPieChart from "../../components/common/CommonPieChart";
import { getCategorias } from "../../services/categoriasServices";

export default function CategoriaDashboardPage() {
    const [total, setTotal] = useState(0);
    const [dataCategorias, setDataCategorias] = useState([]);

    useEffect(() => {
        const todas = getCategorias();
        setTotal(todas.length);

        const sesionCategorias = sessionStorage.getItem('sesionCategoriasVista');
        
        if (!sesionCategorias) {
            console.log("Primera vez visitando el Dashboard de Categorías en esta sesión.");
            sessionStorage.setItem('sesionCategoriasVista', 'true');
        }
        const worker = new Worker('/categoriaWorker.js');
        worker.postMessage({ data: todas });

        worker.onmessage = (e) => {
            setDataCategorias(e.data);
        };
        return () => worker.terminate();
    }, []);

    return (
        <div className="w-full space-y-8 p-8">
            <section className="w-full space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Dashboard</p>
                <h1 className="text-3xl font-bold">Resumen de Categorías</h1>
                <p className="text-default-600">Visualiza el estado y el volumen de tus registros.</p>
            </section>

            <div className="flex flex-wrap justify-start gap-4">
                <MetricCard
                    label="Total Categorías"
                    totalRecords={total}
                    subRecords={total}
                    color="#0055DA"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-content1 p-4 rounded-xl shadow-sm border border-divider">
                    <h2 className="text-lg font-semibold mb-4">Distribución por Categoría</h2>
                    <CommonPieChart metasData={dataCategorias} />
                </div>
            </div>
        </div>
    );
}