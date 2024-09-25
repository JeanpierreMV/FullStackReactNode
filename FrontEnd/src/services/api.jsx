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

export const registrarBoleta = async (boletaData) => {
  try {
    const response = await api.post('/boletas/generar', boletaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al generar la boleta');
  }
};

