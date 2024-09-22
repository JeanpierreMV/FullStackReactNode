import React, { useState, useEffect } from 'react';
import AtencionForm from '../components/AtencionForm';
import useForm from '../hooks/useForm';
import { registrarAtencion } from '../services/api';
import { obtenerClientes, obtenerMascotas, obtenerVeterinarios, obtenerServicios } from '../services/api'; // Importar funciones para obtener datos

const RegisterAtencion = () => {
    const initialState = {
        clienteId: '',
        mascotaId: '',
        veterinarioId: '',
        servicioId: '',
        fechaCita: '',
        consideraciones: '',
        descripcion: '',
    };

    const { formData, handleChange } = useForm(initialState);
    const [clientes, setClientes] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const [clientesData, mascotasData, veterinariosData, serviciosData] = await Promise.all([
                obtenerClientes(),
                obtenerMascotas(),
                obtenerVeterinarios(),
                obtenerServicios(),
            ]);

            setClientes(clientesData);
            setMascotas(mascotasData);
            setVeterinarios(veterinariosData);
            setServicios(serviciosData);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registrarAtencion(formData);
            setSuccess(true);
            setError(null);
        } catch (error) {
            setError('Error al registrar atención');
            setSuccess(false);
        }
    };

    return (
        <div>
            <h1>Registrar Atención</h1>
            {success && <p>Atención registrada exitosamente</p>}
            {error && <p>{error}</p>}
            <AtencionForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                clientes={clientes}
                mascotas={mascotas}
                veterinarios={veterinarios}
                servicios={servicios}
            />
        </div>
    );
};

export default RegisterAtencion;
