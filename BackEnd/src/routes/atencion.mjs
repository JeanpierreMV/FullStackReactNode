import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { dniDuenio, nombreMascota, veterinarioId, servicioId, fechaCita } = req.body;

    try {
       
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

         // Imprimir los valores para depuración
      

        // Crear la atención con los IDs obtenidos
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
                // Obtiene el nombre del veterinario usando el veterinarioId que es un clienteId
                nombreVeterinario: veterinarioMap[atencion.veterinarioId] || 'Desconocido', // Usa veterinarioId aquí
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
