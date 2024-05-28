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

async function convertCurrency(amount, from, to) {
    const apiKey = 'c397d62cba0ad9f0f29d4e53';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.conversion_result.toFixed(2); // Limitar a dos decimales
    } catch (error) {
        console.error('There was a problem with the currency conversion:', error);
        return null;
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(async (product) => {
        const usdPrice = await convertCurrency(product.precio, 'CLP', 'USD');
        const nacionalPrice = formatPriceWithThousandSeparator(product.precio);
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.nombre}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.descripcion}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.marca}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.categoria}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">$${nacionalPrice} CLP</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500" id="precio-usd-${product.id}">$${usdPrice} USD</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${product.stock_total}</td>
        `;
        productList.appendChild(productRow);
    });
}

function formatPriceWithThousandSeparator(price) {
    return Math.floor(price).toLocaleString('es-CL');
}

document.getElementById('add-product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const marca = parseInt(document.getElementById('marca').value);
    const categoria = parseInt(document.getElementById('categoria').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const stock_total = parseInt(document.getElementById('stock_total').value);
    const product = { nombre, descripcion, marca, categoria, precio, stock_total };

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
        fetchProducts(); // Refresh the product list
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});