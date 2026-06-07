import MetasList from "../../components/metas/MetasList"
import { getMetas, deleteMeta } from "../../services/metasServices";
import React, { useState, useEffect } from "react";
import { toast, Button } from "@heroui/react";

export default function ListaDeMetasPage() {
    const [metas, setMetas] = useState([]);
    const [urgentCount, setUrgentCount] = useState(0);
    const [urgentGoals, setUrgentGoals] = useState([])
    const [showOnlyUrgent, setShowOnlyUrgent] = useState(false);
    const buttonToReturn = document.querySelector('.buttonToReturn');

    useEffect(() => {
        try {
            const storedMetas = getMetas();
            if (storedMetas) {
                setMetas(storedMetas);
            }
        } catch (error) {
            console.error("Falla al intentar cargas metas:", error);
        }
    }, []);

    useEffect(() => {
        if (metas.length === 0) return;

        const worker = new Worker('/deadlineWorker.js');

        worker.onmessage = function (e) {
            const { urgentCount, urgentItems } = e.data;
            setUrgentCount(urgentCount);
            setUrgentGoals(urgentItems)

            if (urgentCount > 0) {

                toast.warning("Tienes " + urgentCount + " metas que son urgentes de completar", {
                    actionProps: {
                        children: "Mostrar",
                        className: "bg-warning text-warning-foreground",
                        onPress: () => showUrgentGoals(),
                    }
                })

            }
        };


        worker.postMessage({ data: metas });

        return () => {
            worker.terminate();
        };
    }, [metas]); 

    function handleDelete(idMeta) {
        deleteMeta(idMeta)
        setMetas(getMetas())
    }

    const showUrgentGoals = () => {
        setShowOnlyUrgent(true);
        buttonToReturn.classList.remove('invisible')
    };

    const showAllGoals = () => {
        setShowOnlyUrgent(false);
        buttonToReturn.classList.add('invisible')
    };

    const goalsToDisplay = showOnlyUrgent ? urgentGoals : metas;

    return (
        <div className="flex flex-col items-center space-y-5">
            <MetasList
                metasData={goalsToDisplay}
                deleteMeta={handleDelete}
            ></MetasList>
            <Button className="invisible buttonToReturn"
            onClick={showAllGoals}>Regresar</Button>
        </div>
    )
}