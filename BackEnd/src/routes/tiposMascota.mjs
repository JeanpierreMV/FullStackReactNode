// backend/src/routes/tiposMascota.mjs
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para registrar un nuevo tipo de mascota
router.post('/registrar', async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevoTipoMascota = await prisma.tipoMascota.create({
      data: { nombre },
    });
    res.status(201).json(nuevoTipoMascota);
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar tipo de mascota' });
  }
});

// Obtener todos los tipos de mascota
router.get('/', async (req, res) => {
  try {
    const tiposMascota = await prisma.tipoMascota.findMany();
    res.status(200).json(tiposMascota);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener tipos de mascota' });
  }
});

export default router;
