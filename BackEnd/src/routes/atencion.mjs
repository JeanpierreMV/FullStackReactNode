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

export default router;
