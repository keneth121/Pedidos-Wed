// Importa el cliente de Supabase
import supabase from './supabaseClient';

// Función para agregar un nuevo pedido
const agregarPedido = async (producto, cantidad, precio) => {
    const { data, error } = await supabase
        .from('pedidos') // Asegúrate de que la tabla "pedidos" esté creada en Supabase
        .insert([
            { 
                producto, 
                cantidad, 
                precio, 
                estado: 'pendiente', 
                fecha: new Date() 
            }
        ]);

    if (error) {
        console.error('Error al agregar pedido:', error);
    } else {
        console.log('Pedido agregado:', data);
    }
};

// Función para obtener los pedidos
const obtenerPedidos = async () => {
    const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('fecha', { ascending: false });  // Ordena por fecha

    if (error) {
        console.error('Error al obtener pedidos:', error);
    } else {
        console.log('Pedidos:', data);
        mostrarPedidos(data);  // Mostrar pedidos en la vista
    }
};

// Función para mostrar los pedidos en el HTML
const mostrarPedidos = (pedidos) => {
    const listaPedidos = document.getElementById('listaPedidos');
    listaPedidos.innerHTML = ''; // Limpiar lista actual

    pedidos.forEach(pedido => {
        const divPedido = document.createElement('div');
        divPedido.classList.add('pedido', pedido.estado);
        divPedido.innerHTML = `
            <div class="info-pedido">
                <h3>${pedido.producto}</h3>
                <p>Cantidad: ${pedido.cantidad}</p>
                <p>Precio: $${pedido.precio}</p>
            </div>
            <div class="acciones-pedido">
                <button class="btn-completar" onclick="actualizarEstado('${pedido.id}', 'completado')">Completar</button>
                <button class="btn-cancelar" onclick="actualizarEstado('${pedido.id}', 'cancelado')">Cancelar</button>
            </div>
        `;
        listaPedidos.appendChild(divPedido);
    });
};

// Función para actualizar el estado del pedido
const actualizarEstado = async (id, estado) => {
    const { data, error } = await supabase
        .from('pedidos')
        .update({ estado })
        .eq('id', id);

    if (error) {
        console.error('Error al actualizar estado:', error);
    } else {
        console.log('Estado actualizado:', data);
        obtenerPedidos();  // Actualiza la lista de pedidos
    }
};

// Manejar el envío del formulario
const formulario = document.getElementById('ventaForm');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const producto = formulario.producto.value.trim();
    const cantidad = parseInt(formulario.cantidad.value);
    const precio = parseFloat(formulario.precio.value);

    agregarPedido(producto, cantidad, precio);
    formulario.reset();
    formulario.producto.focus();
});

// Al cargar la página, obtenemos los pedidos
window.onload = obtenerPedidos;
