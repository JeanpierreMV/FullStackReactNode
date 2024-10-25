import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para obtener la lista de análisis
router.get('/', async (req, res) => {
    try {
      const analisis = await prisma.analisis.findMany({
        include: {
          tipoMascota: true,
          sizeMascota: true
        }
      });
      res.json(analisis);
    } catch (error) {
      console.error('Error al obtener análisis:', error);
      res.status(500).json({ error: 'Error al obtener análisis' });
    }
  });


  
  export default router;