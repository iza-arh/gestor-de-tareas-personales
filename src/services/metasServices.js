const STORAGE_KEY_METAS = "metasData"

export function saveMetas(meta) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY_METAS)) || [];

    let newEntry = {
        id: Math.random().toString(36).substring(2, 11),
        ...meta
    };

    existingData.push(newEntry);

    localStorage.setItem(STORAGE_KEY_METAS, JSON.stringify(existingData));
}

export function getMetas() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_METAS)) || []
}


export function deleteMeta(idMeta) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY_METAS)) || [];

    const newData = existingData.filter(meta => meta.id !== idMeta);

    localStorage.setItem(STORAGE_KEY_METAS, JSON.stringify(newData));
}

export function getMeta(idMeta) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY_METAS)) || [];

    return existingData.find(meta => meta.id === idMeta);
}

export function editMeta(idMeta, updatedMeta){
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY_METAS)) || [];

    const newData = existingData.map(meta =>
        meta.id === idMeta ? { ...meta, ...updatedMeta } : meta
    );

    localStorage.setItem(STORAGE_KEY_METAS, JSON.stringify(newData));
}