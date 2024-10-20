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
