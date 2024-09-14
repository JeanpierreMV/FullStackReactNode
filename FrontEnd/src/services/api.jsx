
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
