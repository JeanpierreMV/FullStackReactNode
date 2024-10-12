import React, { useState, useEffect } from 'react';
import { obtenerDetallesAtencion } from '../services/api'; // Importa la función de la API
import { useParams } from 'react-router-dom';

const VerDetallesAtencion = () => {
    const { atencionId } = useParams();  // Obtener el ID de la atención desde la URL
    const [atencion, setAtencion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetallesAtencion = async () => {
            try {
                const data = await obtenerDetallesAtencion(atencionId);
                setAtencion(data);
            } catch (err) {
                setError('Error al obtener los detalles de la atención');
                console.error(err);
            }
        };

        fetchDetallesAtencion();
    }, [atencionId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!atencion) {
        return <div>Cargando detalles de la atención...</div>;
    }

    return (
        <div>
            <h1>Detalles de la Atención</h1>
            <p><strong>Dueño:</strong> {atencion.cliente.nombre}</p>
            <p><strong>Nombre Mascota:</strong> {atencion.mascota.nombre}</p>
            <p><strong>Edad:</strong> {atencion.mascota.edad}</p>
            <p><strong>Especie:</strong> {atencion.mascota.raza}</p>
            <p><strong>Sexo:</strong> {atencion.mascota.genero}</p>
            <p><strong>Raza:</strong> {atencion.mascota.raza}</p>
            <p><strong>Peso:</strong> {atencion.mascota.peso}</p>
            <p><strong>Servicio:</strong> {atencion.servicio.nombre}</p>
            {/* <p><strong>Fecha de Cita:</strong> {new Date(atencion.fechaCita).toLocaleDateString()}</p> */}
            <p><strong>Descripción:</strong> {atencion.descripcion}</p>
            <p><strong>Consideraciones:</strong> {atencion.consideraciones}</p>
        </div>
    );
};

export default VerDetallesAtencion;
