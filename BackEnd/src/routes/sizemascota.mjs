import express from 'express';
import {PrismaClient} from '@prisma/client'

const router = express.Router();
const prisma = new PrismaClient();

router.post('/registrar', async (req, res) => {
    const { nombre } = req.body;
  
    try {
      const tamaño = await prisma.sizeMascota.create({
        data: { nombre },
      });
      res.status(201).json(tamaño);
    } catch (error) {
      res.status(400).json({ error: 'Error al registrar tamaño de mascota' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const tamaño = await prisma.sizeMascota.findMany();
      res.status(200).json(tamaño);
    } catch (error) {
      res.status(400).json({ error: 'Error al obtener tamaño de mascota' });
    }
  });
  
  export default router;