import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:1234/KoalaVet',  
});

export const registrarCliente = async (clienteData) => {
  try {
    const response = await api.post('/clientes/registrar', clienteData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar cliente');
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
    const response = await api.post('/empleados/login', credentials);
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
