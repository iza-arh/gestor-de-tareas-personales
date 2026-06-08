self.onmessage = function (e) {
    const { data } = e.data;
    
    const detalladas = data.filter(c => c.descripcion && c.descripcion.length > 20).length;
    const breves = data.filter(c => c.descripcion && c.descripcion.length <= 20).length;

    const pieData = [
        { name: 'Bien documentadas (>20 chars)', value: detalladas },
        { name: 'Breves (<=20 chars)', value: breves }
    ];

    self.postMessage(pieData); 
};