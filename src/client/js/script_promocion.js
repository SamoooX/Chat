document.addEventListener('DOMContentLoaded', () => {
    fetchPromociones();
});

// Función para obtener todas las promociones
async function fetchPromociones() {
    try {
        const response = await fetch('https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/promocion');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const promociones = await response.json();
        displayPromociones(promociones);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para mostrar las promociones en la tabla
function displayPromociones(promociones) {
    const promocionList = document.getElementById('promocion-list');
    promocionList.innerHTML = '';
    promociones.forEach(promocion => {
        const promocionRow = document.createElement('tr');
        promocionRow.innerHTML = `
            <td class="px-4 py-2">${promocion.promocion_id}</td>
            <td class="px-4 py-2">${promocion.producto_id}</td>
            <td class="px-4 py-2">${promocion.fecha_inicio}</td>
            <td class="px-4 py-2">${promocion.fecha_fin}</td>
            <td class="px-4 py-2">
                <button onclick="editPromocion(${promocion.promocion_id})" class="bg-yellow-500 text-white px-3 py-1 rounded-md">Editar</button>
                <button onclick="deletePromocion(${promocion.promocion_id})" class="bg-red-500 text-white px-3 py-1 rounded-md">Eliminar</button>
            </td>
        `;
        promocionList.appendChild(promocionRow);
    });
}

// Función para agregar una nueva promoción
document.getElementById('add-promocion-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const productoId = parseInt(document.getElementById('producto_id').value);
    const fechaInicio = document.getElementById('fecha_inicio').value;
    const fechaFin = document.getElementById('fecha_fin').value;

    const promocion = {
        producto_id: productoId,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    };

    try {
        const response = await fetch('https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/promocion/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(promocion)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Promoción agregada:', result);
        fetchPromociones();  // Actualizar la lista de promociones
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

async function editPromocion(promocionId) {
    try {
        const response = await fetch(`https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/promocion`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const promociones = await response.json();
        
        // Verificar si la respuesta tiene los campos necesarios
        const promocion = promociones.find(p => p.promocion_id === promocionId);
        if (!promocion) {
            console.error('No se encontró la promoción');
            return;
        }

        const productoId = promocion.producto_id;
        const fechaInicio = new Date(promocion.fecha_inicio).toISOString().split('T')[0];
        const fechaFin = new Date(promocion.fecha_fin).toISOString().split('T')[0];

        // Llenar los campos del formulario con los datos de la promoción a editar
        document.getElementById('producto_id').value = productoId;
        document.getElementById('fecha_inicio').value = fechaInicio;
        document.getElementById('fecha_fin').value = fechaFin;

        // Actualizar el botón para guardar cambios
        const addButton = document.getElementById('add-promocion-button');
        addButton.textContent = 'Actualizar Promoción';
        addButton.dataset.promocionId = promocionId;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para actualizar una promoción existente
async function updatePromocion(promocionId) {
    const productoId = parseInt(document.getElementById('producto_id').value);
    const fechaInicio = document.getElementById('fecha_inicio').value;
    const fechaFin = document.getElementById('fecha_fin').value;

    const promocion = {
        producto_id: productoId,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
    };

    try {
        const response = await fetch(`https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/promocion/actualizar/${promocionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(promocion)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Promoción actualizada:', result);
        resetForm();
        fetchPromociones();  // Actualizar la lista de promociones
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para resetear el formulario y cambiar el botón de actualizar por el de agregar
function resetForm() {
    document.getElementById('producto_id').value = '';
    document.getElementById('fecha_inicio').value = '';
    document.getElementById('fecha_fin').value = '';

    const addButton = document.getElementById('add-promocion-button');
    addButton.textContent = 'Agregar Promoción';
    delete addButton.dataset.promocionId;
}

// Función para eliminar una promoción
async function deletePromocion(promocionId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta promoción?')) {
        try {
            const response = await fetch(`https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/promocion/eliminar/${promocionId}`, { 
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error del servidor:', errorData);
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Promoción eliminada:', result);
            fetchPromociones();  // Actualizar la lista de promociones
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}

