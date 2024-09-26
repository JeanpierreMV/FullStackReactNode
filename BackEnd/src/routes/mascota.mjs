import express from 'express'
import {PrismaClient} from '@prisma/client'

const router  = express.Router();
const prisma = new PrismaClient();


// POST /mascotas - Registrar una nueva mascota
router.post('/mascotas', async (req, res) => {
    try {
      const { codigo, nombre, genero, raza, edad, peso, tipoMascota } = req.body;
  
      
      const cliente = await prisma.cliente.findUnique({
        where: { dni: codigo },  
      });
  
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      
      const nuevaMascota = await prisma.mascota.create({
        data: {
          nombre,
          genero,
          raza,
          edad,
          peso,
          tipoMascota,
          clienteId: cliente.id,  
        },
      });
  
      return res.status(201).json(nuevaMascota);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error registrando la mascota' });
    }
  });
  
  export default router;