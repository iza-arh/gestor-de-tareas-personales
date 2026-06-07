self.onmessage = function (e) {
    const { data } = e.data;
    const now = new Date();

    const urgentItems = data.filter((item) => {
        if (item.estado === "finalizada") return false;

        const dueDate = new Date(item.fechaDeFinalizacion);
        const timeDiff = dueDate - now;
        const twentyFourHours = 24 * 60 * 60 * 1000;

        return timeDiff <= twentyFourHours;
    });

    self.postMessage({
        urgentCount: urgentItems.length,
        urgentItems: urgentItems,
    });
};