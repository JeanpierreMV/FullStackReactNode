import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { clienteId, mascotaId, veterinarioId, servicioId, fechaCita, consideraciones, descripcion } = req.body;

    try {
        const atencion = await prisma.atencion.create({
            data: {
                clienteId: parseInt(clienteId),  // Convierte a entero
                mascotaId: parseInt(mascotaId),  // Convierte a entero
                veterinarioId: parseInt(veterinarioId),  // Convierte a entero
                servicioId: parseInt(servicioId),  // Convierte a entero
                fechaCita: new Date(fechaCita),  // Asegúrate de que esté en formato Date
                consideraciones,
                descripcion,
            },
        });
        res.status(201).json(atencion);
    } catch (error) {
        console.error(error); // Imprime el error para más información
        res.status(400).json({ error: 'Error al registrar atención' });
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
                veterinario: true,
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




router.get('/detalles/:atencionId', async (req, res) => {
    const { atencionId } = req.params;

    try {
        const atencion = await prisma.atencion.findUnique({
            where: { id: parseInt(atencionId) },
            include: {
                cliente: true,
                mascota: true,
                veterinario: true,
                servicio: true,
            },
        });

        if (atencion) {
            res.status(200).json(atencion);
        } else {
            res.status(404).json({ message: 'Atención no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener los detalles de la atención:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de la atención' });
    }
});


// NUEVO: Método GET para obtener el listado de todas las atenciones
router.get('/', async (req, res) => {
    try {
        const atenciones = await prisma.atencion.findMany({
            include: {
                cliente: true,
                mascota: true,
                veterinario: true,
                servicio: true,
            },
        });
        res.status(200).json(atenciones);
    } catch (error) {
        console.error('Error al obtener el listado de atenciones:', error);
        res.status(500).json({ error: 'Error al obtener el listado de atenciones' });
    }
});







export default router;
