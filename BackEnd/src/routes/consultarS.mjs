import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/agregar', async (req, res) => {
    try {
      const { nombre, descripcion, costo, consideraciones } = req.body;
  
     
      if (!nombre || !descripcion || !consideraciones || typeof costo !== 'number') {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
  
      const newServicio = await prisma.servicio.create({
        data: {
          nombre,
          descripcion,
          costo,
          consideraciones,
        },
      });
  
      res.status(201).json(newServicio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el servicio' });
    }
  });
  

  export default router;