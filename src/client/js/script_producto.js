document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.nombre}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.descripcion}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.marca}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.categoria}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.precio}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.stock_total}</td>
        `;
        productList.appendChild(productRow);
    });
}

document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const marcaID = parseInt(document.getElementById('marca').value);
    const categoriaID = parseInt(document.getElementById('categoria').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const stockTotal = parseInt(document.getElementById('stock_total').value);

    const product = { nombre, descripcion, marcaID, categoriaID, precio, stockTotal };

    // Verificar los datos antes de enviarlos
    console.log('Datos del producto:', product);

    try {
        const response = await fetch('https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/api/productos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del servidor:', errorData);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Producto agregado:', result);
        fetchProducts();  // Refresh the product list
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});