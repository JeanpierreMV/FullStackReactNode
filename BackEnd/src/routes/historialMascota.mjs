import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para obtener el historial de atenciones de una mascota
router.get('/:mascotaId', async (req, res) => {
    const { mascotaId } = req.params;
  
    try {
      const atenciones = await prisma.atencion.findMany({
        where: { mascotaId: parseInt(mascotaId) },
        include: {
          veterinario: true,
          servicio: true
        }
      });
      res.json(atenciones);
    } catch (error) {
      console.error('Error al obtener el historial de la mascota:', error);
      res.status(500).json({ error: 'Error al obtener el historial' });
    }
  });
  
  export default router;