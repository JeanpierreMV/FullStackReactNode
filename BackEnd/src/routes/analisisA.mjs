import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para actualizar los resultados de una atención de análisis
router.put('/:analisisAtencionId', async (req, res) => {
    const { analisisAtencionId } = req.params;
    const { resultado, conclusiones, receta, observaciones } = req.body;

    try {
        const updatedAnalisisAtencion = await prisma.analisisAtencion.update({
            where: { id: parseInt(analisisAtencionId) },
            data: {
                resultado,
                conclusiones,
                receta,
                observaciones
            },
        });

        res.status(200).json(updatedAnalisisAtencion);
    } catch (error) {
        console.error('Error al actualizar los resultados de la atención de análisis:', error);
        res.status(500).json({ error: 'Error al actualizar los resultados de la atención de análisis' });
    }
});

export default router;
