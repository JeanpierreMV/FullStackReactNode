import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Registrar nueva atención
router.post('/', async (req, res) => {
    const { dniDuenio, nombreMascota, veterinarioId, servicioId, fechaCita } = req.body;

    try {
        // Buscar al cliente por su DNI
        const cliente = await prisma.cliente.findUnique({
            where: {
                dni: dniDuenio,
            },
        });

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Obtener la mascota por su nombre y clienteId
        const mascota = await prisma.mascota.findFirst({
            where: {
                nombre: nombreMascota,
                clienteId: cliente.id,
            },
        });

        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada para este dueño' });
        }

        // Crear la atención
        const atencion = await prisma.atencion.create({
            data: {
                clienteId: cliente.id,
                mascotaId: mascota.id,
                veterinarioId: parseInt(veterinarioId),
                servicioId: parseInt(servicioId),
                fechaCita: new Date(fechaCita),
                consideraciones: 'Pendiente', 
                descripcion: '' 
            },
        });

        res.status(201).json(atencion);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar atención' });
    }
});

// Obtener todas las atenciones
router.get('/', async (req, res) => {
    try {
        const atenciones = await prisma.atencion.findMany({
            include: {
                cliente: {
                    select: {
                        dni: true,
                        nombre: true,
                    },
                },
                mascota: {
                    select: {
                        nombre: true,
                    },
                },
            },
        });

        // Obtener veterinarios basándonos en el rol
        const veterinarios = await prisma.cliente.findMany({
            where: {
                rolId: 1, // Rol del veterinario
            },
            select: {
                id: true,
                nombre: true,
            },
        });

        // Crear un mapa para acceder rápidamente a los nombres de los veterinarios
        const veterinarioMap = {};
        veterinarios.forEach(veterinario => {
            veterinarioMap[veterinario.id] = veterinario.nombre;
        });

        // Formatear los datos
        const resultados = atenciones.map(atencion => {
            const fechaCita = new Date(atencion.fechaCita);
            const fecha = fechaCita.toISOString().split('T')[0]; // Formato 'yy-mm-dd'
            const hora = fechaCita.toTimeString().split(' ')[0]; // Extrae la hora en formato 'HH:MM:SS'

            return {
                dni: atencion.cliente.dni,
                nombreDuenio: atencion.cliente.nombre,
                nombreMascota: atencion.mascota.nombre,
                nombreVeterinario: veterinarioMap[atencion.veterinarioId] || 'Desconocido',
                fechaCita: `${fecha} ${hora}`, // Combina fecha y hora
                consideraciones: atencion.consideraciones,
            };
        });

        res.status(200).json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener atenciones' });
    }
});

// Método GET para buscar atenciones por mascota
router.get('/:mascotaId', async (req, res) => {
    const { mascotaId } = req.params;

    try {
        const atenciones = await prisma.atencion.findMany({
            where: { mascotaId: parseInt(mascotaId) },
            include: {
                cliente: true,
                mascota: true,
                servicio: true,
            },
        });
        if (atenciones.length > 0) {
            res.status(200).json(atenciones);
        } else {
            res.status(404).json({ message: 'No se encontraron atenciones para esta mascota' });
        }
    } catch (error) {
        console.error('Error al buscar atenciones:', error);
        res.status(500).json({ error: 'Error al buscar atenciones' });
    }
});

router.get('/cliente/:clienteId', async (req, res) => {
    const { clienteId } = req.params;

    try {
        const atenciones = await prisma.atencion.findMany({
            where: { clienteId: parseInt(clienteId) },
            include: {
                cliente: true,
                mascota: true,
                servicio: true,
            },
        });
        if (atenciones.length > 0) {
            res.status(200).json(atenciones);
        } else {
            res.status(404).json({ message: 'No se encontraron atenciones para esta mascota' });
        }
    } catch (error) {
        console.error('Error al buscar atenciones:', error);
        res.status(500).json({ error: 'Error al buscar atenciones' });
    }
});


/// Método GET para obtener los detalles de una atención específica por ID
router.get('/detalles/:atencionId', async (req, res) => {
    const { atencionId } = req.params; // Obtenemos el id de la atención

    try {
        const atencion = await prisma.atencion.findUnique({
            where: { id: parseInt(atencionId) },  // Usamos el id
            include: {
                servicio: {
                    select: {
                        nombre: true,
                        descripcion: true,
                        costo: true,
                    },
                },
                mascota: {
                    select: {
                        especie: {  // TipoMascota
                            select: { nombre: true },
                        },
                        size: {  // SizeMascota
                            select: { nombre: true },
                        },
                    },
                },
            },
        });

        if (atencion) {
            // Formatear la respuesta con los datos solicitados
            const detallesAtencion = {
                nombreServicio: atencion.servicio.nombre,
                descripcion: atencion.servicio.descripcion,
                especie: atencion.mascota.especie.nombre,
                tamaño: atencion.mascota.size.nombre,
                costo: atencion.servicio.costo,
            };
            res.status(200).json(detallesAtencion);
        } else {
            res.status(404).json({ message: 'Atención no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener los detalles de la atención:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de la atención' });
    }
});




export default router;
