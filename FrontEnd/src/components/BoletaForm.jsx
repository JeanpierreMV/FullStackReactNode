import React, { useState, useEffect } from 'react';
import { obtenerMascotasCliente, obtenerAtencionesPendientes, generarBoleta } from '../services/api';
import { CalendarDays } from 'lucide-react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import '../styles/GenerarBoleta.css';

function BoletaForm() {
    const [dni, setDni] = useState('');
    const [clienteId, setClienteId] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const [atenciones, setAtenciones] = useState([]);
    const [mascotaId, setMascotaId] = useState(null);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDniChange = (e) => {
        const newDni = e.target.value.replace(/[^0-9]/g, ''); 
        setDni(newDni);
    };

    const buscarMascotas = async () => {
        const mascotasData = await obtenerMascotasCliente(dni);
        setMascotas(mascotasData);
        if (mascotasData.length > 0) {
            setClienteId(mascotasData[0].clienteId); 
        }
    };

    const buscarAtenciones = async () => {
        if (!clienteId || !mascotaId) return;

        const atencionesData = await obtenerAtencionesPendientes(mascotaId);
        setAtenciones(atencionesData);
        const nuevoTotal = atencionesData.reduce((acc, atencion) => acc + atencion.servicio.costo, 0);
        setTotal(nuevoTotal);
    };

    useEffect(() => {
        if (dni) {
            buscarMascotas();
        }
    }, [dni]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await buscarAtenciones(); // Cargar atenciones al hacer clic en "Solicitar"
        closeModal();
    };

    const handlePagar = async () => {
        try {
            await generarBoleta({ clienteId, mascotaId });
            setAtenciones([]);
            setTotal(0);
            await buscarAtenciones();
        } catch (error) {
            console.error('Error al generar la boleta: ', error);
        }
    };

    return (
        <div className="boleta-form-container">
            <div className="boleta-form-space-y-4">
                <div className="boleta-form-header">
                    <h1 className="text-2xl font-semibold">Boleta de Pago</h1>
                    <Button onClick={openModal} variant="contained" color="primary">Generar Boleta</Button>
                </div>

                <div className="boleta-form-alert">Tú tienes: ({atenciones.length} items)</div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="boleta-form-table">
                        <thead className="boleta-form-table-header">
                            <tr>
                                <th>Servicio Información</th>
                                <th>Descripción</th>
                                <th>Costo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atenciones.length > 0 ? (
                                atenciones.map((atencion) => (
                                    <tr key={atencion.id}>
                                        <td>{atencion.servicio.nombre}</td>
                                        <td>{atencion.servicio.descripcion}</td>
                                        <td>{atencion.servicio.costo.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="boleta-form-table-cell italic" colSpan={3}>No hay items</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Button className="inline-flex items-center gap-2 boleta-form-button" variant="outlined" color="primary">
                    <CalendarDays className="h-4 w-4" />
                    Registrar Cita
                </Button>
            </div>

            <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>Total a Pagar</Typography>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">Precio Total</label>
                            <div className="boleta-form-total">${total.toFixed(2)}</div>
                        </div>
                    </div>
                </CardContent>
                <Button
                    onClick={handlePagar}
                    variant="contained"
                    sx={{
                        backgroundColor: 'red',
                        width: '120px',
                        margin: '10px',
                    }}
                    startIcon={<ShoppingCart />}
                >
                    Pagar
                </Button>
            </Card>
            <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle>Generar Boleta de Pago</DialogTitle>
                <DialogContent sx={{ minWidth: 100, minHeight: 100 }}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <br />
                        <div>
                            <TextField
                                 label="DNI"
                                 type="text"
                                 value={dni}
                                 onChange={handleDniChange}
                                 fullWidth
                                 required
                                 inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </div>
                        <br />
                        <div>
                            <FormControl fullWidth required>
                                <InputLabel>Mascotas</InputLabel>
                                <Select
                                    value={mascotaId}
                                    onChange={(e) => setMascotaId(e.target.value)}
                                    label="Mascota"
                                >
                                    <MenuItem value="">Seleccione una mascota</MenuItem>
                                    {mascotas.map((mascota) => (
                                        <MenuItem key={mascota.id} value={mascota.id}>
                                            {mascota.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="secondary">Cerrar</Button>
                    <Button type="submit" onClick={handleSubmit} color="primary">Solicitar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BoletaForm;
