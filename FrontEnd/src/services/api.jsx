import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1234/KoalaVet', 
  headers: {
    'Content-Type': 'application/json'
  } 
});


const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const registrarCliente = async (clienteData) => {
  try {
    const response = await api.post('/clientes/registrar', clienteData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar cliente');
  }
};

export const listaClientes = async (clienteData) => {
  try {
    const response = await api.get('/clientes', clienteData);
    return response.data;
  } catch (error) {
    throw new Error('Error al listar los cliente');
  }
};

export const registrarTipoMascota = async (tipoMascotaData) => {
  try {
    const response = await api.post('/tipos-mascota/registrar', tipoMascotaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar tipo de mascota');
  }
};

export const registrarMascota = async (mascotaData) => {
  try {
    const response = await api.post('/mascotas/registrar', mascotaData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    throw new Error('Error al registrar la mascota');
  }
};

export const listarMascota = async (mascotaData) => {
  try {
    const response = await api.get('/mascotas', mascotaData);
    return response.data;
  } catch (error) {
    console.error('Error al listar las mascota:', error);
    throw new Error('Error al listar las mascota:');
  }
};

export const actualizarMascota = async (id, mascotaData) => {
  try {
    const response = await api.put(`/mascotas/${id}`, mascotaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    throw new Error('Error al actualizar la mascota');
  }
};

export const eliminarMascota = async (id) => {
  try {
    const response = await api.delete(`/mascotas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    throw new Error('Error al eliminar la mascota');
  }
};


export const registrarEmpleado = async (empleadoData) => {
  try {
    const response = await api.post('/empleados/registrar', {
      ...empleadoData,
      rol: parseInt(empleadoData.rol, 10) 
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar empleado');
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

export const obtenerTiposMascota = async () => {
  try {
    const response = await api.get('/tipos-mascota');
    return response.data; // Asegúrate de devolver los datos aquí
  } catch (error) {
    console.log('Error al obtener tipos de mascota:', error);
    throw new Error('Error al obtener tipos de mascota');
  }
};

export const obtenerTamañoMascota = async () => {
  try {
    const response = await api.get('/size-mascota');
    return response.data; 
  } catch (error) {
    console.log('Error al obtener tamaño de mascota:', error);
    throw new Error('Error al obtener tamaño de mascota');
  }
};

export const obtenerClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data; // Asegúrate de devolver los datos aquí
  } catch (error) {
    console.log('Error al obtener clientes:', error);
    throw new Error('Error al obtener clientes');
  }
};

export const registrarAtencion = async (atencionData) => {
  try {
      const response = await api.post('/atenciones', atencionData);
      return response.data;
  } catch (error) {
      throw new Error('Error al registrar atención');
  }
};

export const obtenerMascotas = async () => {
  const response = await api.get('/mascotas');
  return response.data;
};

export const obtenerVeterinarios = async () => {
  const response = await api.get('/veterinarios');
  return response.data;
};

export const obtenerServicios = async () => {
  const response = await api.get('/servicios');
  return response.data;
};

/*export const registrarBoleta = async (boletaData) => {
  try {
    const response = await api.post('/boletas/generar', boletaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al generar la boleta');
  }
};*/

export const registrarBoleta = async (boletaData) => {
  try {
    const response = await api.post('/boletas/generar', boletaData);
    if (response.status === 200) {
      return response.data; // Retornamos los datos si la respuesta es exitosa
    } else {
      throw new Error('Error inesperado al generar la boleta'); // En caso de que no sea 200 OK
    }
  } catch (error) {
    // Manejo de error más detallado con mensajes específicos
    if (error.response) {
      // Si el servidor responde con un estado fuera del rango 2xx
      throw new Error(`Error del servidor: ${error.response.data.message || 'Error al generar la boleta'}`);
    } else if (error.request) {
      // Si no se recibe respuesta del servidor
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Otro tipo de errores
      throw new Error('Error al generar la boleta');
    }
  }
};

export const obtenerAtenciones = async (mascotaId) => {
  try {
    const response = await api.get(`/atenciones/${mascotaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener atenciones:', error);
    throw new Error('Error al obtener atenciones');
  }
};

export const obtenerDetallesAtencion = async (atencionId) => {
  try {
      const response = await api.get(`/atenciones/detalles/${atencionId}`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener detalles de la atención:', error);
      throw new Error('Error al obtener detalles de la atención');
  }
};

export const obtenerFacturacionDelDia = async () => {
  try {
    const response = await api.get('/boletas/facturacion-dia');
    return response.data;
  } catch (error) {
    console.error('Error al obtener facturación del día:', error);
    throw new Error('Error al obtener facturación del día');
  }
};

// Función para obtener los detalles de una boleta específica
export const obtenerDetalleBoleta = async (id) => {
  try {
    const response = await api.get(`/boletas/detalle/${id}`); // Usar `api` en lugar de `axios` directo
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la boleta:', error);
    throw error;
  }
};

export const consultarServicio = async (tamaño, especie) => {
  try {
    const response = await api.get(`/consultar/servicios`, {
      params: { tamaño, especie }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    throw error;
  }
};

export const buscarServicioPorNombre = async (nombre, tamaño, especie) => {
  try {
    const params = { nombre };
    if (tamaño) params.tamaño = tamaño;
    if (especie) params.especie = especie;

    const response = await api.get(`/consultar/servicios/buscar`, { params });
    return response.data;
  } catch (error) {
    console.error('Error al buscar el servicio:', error);
    throw error;
  }
};

export const obtenerClientePorCodigo = async (codigo) => {
  try {
    const response = await api.get(`/cliente/${codigo}`);
    return response.data;
  } catch (error) {
    throw new Error('Cliente no encontrado');
  }
};

export const obtenerAnalisis = async () => {
  try {
    const response = await api.get(`/analisis`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener análisis:', error);
    throw error;
  }
};

export const obtenerHistorialMascota = async (mascotaId) => {
  try {
    const response = await api.get(`/historial-mascota/${mascotaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el historial de la mascota:', error);
// Fetch mascotas por dueño (DNI o nombre)
export const obtenerMascotasPorDueno = async (dueno) => {
  try {
    const response = await api.get(`/mascotas?dueno=${dueno}`);
    return response.data.map(mascota => ({
      id: mascota.id, // ID de la mascota para usarlo luego en la búsqueda del historial
      nombreMascota: mascota.nombreMascota,
      raza: mascota.raza,
      edad: mascota.edad
    }));
  } catch (error) {
    throw new Error('Error al obtener las mascotas del dueño');
  }
};

// Fetch historial de la mascota seleccionada por su ID
export const obtenerHistorialMascota = async (mascotaId) => {
  try {
    const response = await api.get(`/historial-mascota/${mascotaId}`);
    return response.data.map(historial => ({
      fecha: historial.fecha,
      descripcion: historial.descripcion,
      veterinario: historial.veterinario
    }));
  } catch (error) {
    throw new Error('Error al obtener el historial de la mascota');
  }
};

// api.jsx
export const obtenerMascotasPorDNI = async (dni) => {
  try {
    const response = await api.get(`/mascotas/${dni}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las mascotas por DNI');
  }
};

// Función para obtener la última atención de una mascota por nombre
export const obtenerUltimaAtencionMascota = async (nombreMascota) => {
  try {
    const response = await axios.get(`/api/atenciones/ultima?nombreMascota=${nombreMascota}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la última atención de la mascota:', error);
    throw error;
  }
};

// Función para obtener el listado de atenciones
export const obtenerListadoAtenciones = async () => {
  try {
    const response = await api.get('/atenciones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el listado de atenciones:', error);
    throw new Error('Error al obtener el listado de atenciones');
  }
};

// Función para actualizar resultados de la atención de análisis
export const actualizarResultadosAnalisisAtencion = async (analisisAtencionId, data) => {
  try {
      const response = await api.put(`/analisis-atencion/${analisisAtencionId}`, data);
      return response.data; // Devuelve los datos actualizados
  } catch (error) {
      console.error('Error al actualizar resultados de la atención de análisis:', error);
      throw new Error('Error al actualizar resultados de la atención de análisis');
  }
};

/*
// Método para registrar una nueva boleta
export const registrarBoleta = async (boletaData) => {
  try {
    const response = await api.post('/boletas/generar', boletaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al generar la boleta');
  }
};

// Método para obtener detalles de una boleta específica
export const obtenerDetalleBoleta = async (id) => {
  try {
    const response = await api.get(`/boletas/detalle/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la boleta:', error);
// Función para obtener los detalles completos de una atención específica por su ID
export const obtenerDetalleAtencion = async (atencionId) => {
  try {
    const response = await axios.get(`/api/atenciones/detalle/${atencionId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de la atención:', error);
    throw error;
  }
};

// Método para obtener todas las boletas
export const obtenerBoletas = async () => {
  try {
    const response = await api.get('/boletas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener boletas:', error);
    throw new Error('Error al obtener boletas');
  }
};

// Método para obtener la facturación del día
export const obtenerFacturacionDelDia = async () => {
  try {
    const response = await api.get('/boletas/facturacion-dia');
    return response.data;
  } catch (error) {
    console.error('Error al obtener facturación del día:', error);
    throw new Error('Error al obtener facturación del día');
  }
};
*/




// Nueva función para integrar la funcionalidad de "VerHistorialMascota"
export const verHistorialMascota = async (mascotaId) => {
  try {
    const response = await api.get(`/historial-mascota/ver/${mascotaId}`);
    return response.data.map(historial => ({
      fecha: historial.fecha,
      descripcion: historial.descripcion,
      veterinario: historial.veterinario,
      servicio: historial.servicio,  // Incluye el servicio realizado
      costo: historial.costo         // Incluye el costo de la atención
    }));
  } catch (error) {
    console.error('Error al obtener el historial completo de la mascota:', error);
    throw new Error('Error al obtener el historial completo de la mascota');
  }
};

export const mostrarListadoAtencion = async (mascotaId) => {
  try {
    const response = await obtenerListadoAtencionPorMascota(mascotaId); // Obtiene el listado de atenciones por mascota
    return response;
  } catch (error) {
    console.error('Error al mostrar el listado de atenciones:', error);
    throw new Error('Error al mostrar el listado de atenciones');
  }
};
