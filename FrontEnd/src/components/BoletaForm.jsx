import React, { useState } from 'react';
import { obtenerMascotasCliente, obtenerAtencionesPendientes, generarBoleta } from '../services/api';

function BoletaForm() {
    const [dni, setDni] = useState('');
    const [clienteId, setClienteId] = useState(null); // Nuevo estado para clienteId
    const [mascotas, setMascotas] = useState([]);
    const [atenciones, setAtenciones] = useState([]);
    const [mascotaId, setMascotaId] = useState(null);
    const [total, setTotal] = useState(0);

    const buscarMascotas = async () => {
        const mascotasData = await obtenerMascotasCliente(dni);
        setMascotas(mascotasData);
        if (mascotasData.length > 0) {
            setClienteId(mascotasData[0].clienteId); // Asigna el clienteId desde el primer resultado
        }
    };

    const buscarAtencionesPendientes = async () => {
        const atencionesData = await obtenerAtencionesPendientes(mascotaId);
        setAtenciones(atencionesData);
        setTotal(atencionesData.reduce((acc, atencion) => acc + atencion.servicio.costo, 0));
    };

    const handlePagar = async () => {
        if (!clienteId || !mascotaId) {
            alert('Por favor, selecciona una mascota y verifica el cliente.');
            return;
        }
        console.log({ clienteId, mascotaId, atenciones }); // Verifica los datos enviados
        await generarBoleta({ clienteId, mascotaId, atenciones });
        alert('Boleta generada exitosamente');
        setDni('');
        setClienteId(null);
        setMascotas([]);
        setAtenciones([]);
        setTotal(0);
    };

    return (
        <div>
            <h2>Generar Boleta</h2>
            <input
                type="text"
                placeholder="DNI del cliente"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
            />
            <button onClick={buscarMascotas}>Buscar Mascotas</button>

            <select onChange={(e) => setMascotaId(e.target.value)}>
                <option value="">Selecciona Mascota</option>
                {mascotas.map((mascota) => (
                    <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
                ))}
            </select>
            <button onClick={buscarAtencionesPendientes}>Ver Atenciones Pendientes</button>

            <div>
                <h3>Carrito</h3>
                {atenciones.map((atencion) => (
                    <div key={atencion.id}>
                        {atencion.servicio.nombre} - ${atencion.servicio.costo}
                    </div>
                ))}
                <h4>Total: ${total}</h4>
                <button onClick={handlePagar}>Pagar</button>
            </div>
        </div>
    );
}

export default BoletaForm;
