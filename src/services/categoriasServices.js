const STORAGE_KEY = 'Manage_categorias';

// va buscar el texto en la morira y si existe lo hace un objeto JSON si no lo vuelve un arreglo vacio
export const getCategorias = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

// va traer el arreglo viejo, hace un push en el nuevo objeto y lo vuelve a guarda todo
export const createCategoria = (nuevaCategoria) => {
    try {
        const categorias = getCategorias();
        const categoriaAInsertar = {
            id: Date.now(),
            nombre: nuevaCategoria.nombre,
            descripcion: nuevaCategoria.descripcion
        };
        categorias.push(categoriaAInsertar);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias));
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

//Despues de traer el arreglo, solo fliltra dejanod los que no tenga es ID y guarda el arreglo
export const deleteCategoria = (id) => {
    try {
        const categorias = getCategorias();
        const categorias_1 = categorias.filter(cat => cat.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias_1));
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};

export const updateCategoria = (id, categoriaActualizada) => {
    try {
        const categorias = getCategorias();
        const index = categorias.findIndex(cat => cat.id === id);
        if (index !== -1) {
            categorias[index] = {
                id: id,
                nombre: categoriaActualizada.nombre,
                descripcion: categoriaActualizada.descripcion
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(categorias));
            return { success: true };
        }
        return { success: false, message: "Categoria no encontrada" };
    } catch (error) {
        return { success: false, message: "Error al actualizar la categoria" };
    }
};

    export const getTotalCategorias = () => {
        const categorias = getCategorias();
        return categorias.length;
    };

    export const getCategoriasPorEstado = (estado) => {
        const categorias = getCategorias();
        return categorias.filter(cat => cat.estado === estado).length;
    };
