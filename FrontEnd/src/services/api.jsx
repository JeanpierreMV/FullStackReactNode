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

export const ActualizarCliente = async (id,clienteData) => {
  try {
    const response = await api.put(`/clientes/${id}`, clienteData);
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

export const atencionesget = async (atencionData) => {
  try {
      const response = await api.get('/atenciones', atencionData);
      return response.data;
  } catch (error) {
      throw new Error('Error al registrar atención');
  }
};

export const obtenerMascotas = async () => {
  const response = await api.get('/mascotas');
  return response.data;
};

export const obtenerMascotasPorDni = async (dni) => {
  try {
    const response = await api.get(`/mascotas/${dni}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    throw error; 
  }
};

export const obtenerVeterinarios = async () => {
  const response = await api.get('/veterinarios');
  return response.data;
};

export const obtenerServicios = async () => {
  const response = await api.get('/servicios');
  return response.data;
};

export const registrarBoleta = async (boletaData) => {
  try {
    const response = await api.post('/boletas/generar', boletaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al generar la boleta');
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


export const buscarCitas = async (id)=>{
  try {
    const response = await api.get(`/buscar/citas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al listar los cliente');
  }
};

export const obtenerMascotasCliente = async (dni) => {
  try {
  const response = await api.get(`/boleta/mascotas/${dni}`);
  return response.data;
} catch (error) {
  throw new Error('Error');
}
};

export const obtenerAtencionesPendientes = async (mascotaId) => {
  try {
  const response = await api.get(`/boleta/atenciones-pendientes/${mascotaId}`);
  return response.data;
} catch (error) {
  throw new Error('Error');
}
};

export const generarBoleta = async (data) => {
  try {
  const response = await api.post('/boleta/generar-boleta', data);
  return response.data;
} catch (error) {
  throw new Error('Error');
}
};





